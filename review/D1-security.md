# D1 安全审计 审查报告

## TL;DR

系统采用 OAuth2 无状态 Token（UUID 格式，存储于 Redis）认证，非 JWT 签名。发现 **4项 P0 立即修**、**6项 P1 本周修**、**4项 P2 计划修**、**3项 P3 监控**。最严重问题：device 模块 `/**` 全开放鉴权绕过、CORS 凭证全域放行、SQL 注入 3 处、源码/配置泄露 30+ 密钥。整体安全成熟度偏低，建议优先修 P0。

**风险等级: P0**

---

## 详细发现

### F1. 认证 Token 生命周期

#### F1.1 Token 非 JWT 签名，无法自验 (P1)
- **位置**: `DEVICE/iot-system/iot-system-biz/src/main/java/com/basiclab/iot/system/service/oauth2/OAuth2TokenServiceImpl.java:191-197`
- **现状**: Token 使用 `IdUtil.fastSimpleUUID()` 生成，是无签名的纯随机字符串，每次请求需查 Redis/DB。
- **风险**: 无法自验证过期/合法性，强依赖 Redis 可用性；Token 泄露后无法通过签名识别伪造。
- **建议**: 改用 JWT（HS256 或 RS256）自包含 Token，Redis 仅用于黑名单/吊销。

#### F1.2 BCrypt 强度仅 4 轮 (P0)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/config/SecurityProperties.java:50`
- **现状**: `passwordEncoderLength = 4`，BCrypt 复杂度 2^4=16 次迭代。
- **风险**: 极弱，GPU 暴力破解可在秒级完成。行业最低标准 10 轮（1024 次），推荐 12+ 轮。
- **建议**: 立即改为 `passwordEncoderLength = 12`，并强制已存在用户下次登录时重新哈希。

#### F1.3 Mock 登录可绕过认证 (P0)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/filter/TokenAuthenticationFilter.java:126-138`
- **现状**: 若 `iot.security.mock-enable=true`，发送 `Authorization: Bearer test1` 即可伪装为 userId=1 登录。默认 `mockSecret = "test"`（SecurityProperties.java:40），`mockEnable` 默认 false。
- **风险**: 若生产/测试环境误开，任何人均可管理员登录。
- **建议**: 在所有 profile 中显式设置 `iot.security.mock-enable=false`；生产环境可考虑完全移除 mockLoginUser 代码（Maven profile 排除）。

#### F1.4 Token 可从 URL 参数传递 (P2)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/config/SecurityProperties.java:28`; `TokenAuthenticationFilter.java:62-63`
- **现状**: 支持通过 URL query parameter `?token=xxx` 传 Token。背景是为 WebSocket 场景预留。
- **风险**: Token 出现在 URL 中易被日志、Referer、浏览器历史记录泄露。
- **建议**: 仅对 WebSocket 路径启用 token 参数；其他路径禁用，仅允许 Authorization Header。

#### F1.5 LoginUser 可从 HTTP Header 伪造 (P1)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/filter/TokenAuthenticationFilter.java:141-153`
- **现状**: `buildLoginUserByHeader()` 读取 `login-user` HTTP Header，URL 解码后直接反序列化为 LoginUser 对象。
- **风险**: 若请求绕过 Gateway 直连后端服务，可伪造任意 LoginUser。Gateway 的 TokenAuthenticationFilter 会 `SecurityFrameworkUtils.removeLoginUser(exchange)` 剥离该头，但无签名/加密保护。
- **建议**: Gateway 层对 login-user Header 做 HMAC 签名，后端验证签名；或使用内部 RPC Token 替代 Header 透传。

#### F1.6 JWT 密码存于上下文 / 密钥硬编码 (GB28181) (P2)
- **位置**: `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/java/com/genersoft/iot/vmp/conf/security/JwtUtils.java:55`; `JwtAuthenticationFilter.java:107`
- **现状**: RSA 签名 KeyID 硬编码为固定 UUID；认证通过后用户哈希密码写入 SecurityContext。
- **风险**: KeyID 泄露；密码即使哈希也不应存储在安全上下文中（可被日志/序列化泄露）。
- **建议**: KeyID 移至配置项；密码字段从 LoginUser/JwtUser 中移除。

---

### F2. 鉴权绕过

#### F2.1 Device 模块全端点公开 (P0)
- **位置**: `DEVICE/iot-device/iot-device-biz/src/main/java/com/basiclab/iot/device/framework/security/config/SecurityConfiguration.java:32`
- **现状**: `.antMatchers("/**").permitAll()` — device 模块所有接口无需认证即可访问。
- **风险**: 任何可达该服务的请求可访问全量 API，包括设备管理、数据查询等。
- **建议**: 移除 `/**` permitAll，改为具体路径授权 + `@PreAuthorize` 注解保护。

#### F2.2 鉴权注解体系分散 (P2)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/annotations/PreAuthorize.java`
- **现状**: 自定义 `@PreAuthorize` 注解，非 Spring Security 原生 `@PreAuthorize`。各模块 SecurityConfiguration 均定义 AuthorizeRequestsCustomizer Bean，但实际鉴权依赖粒度不统一。
- **风险**: 鉴权逻辑分散，新增接口可能忘记加权限注解。
- **建议**: 统一使用 Spring Security `@PreAuthorize("hasAuthority('...')")` 或自定义注解 + AOP；在 AuthorizeRequestsCustomizer 中改为默认拒绝 (`.anyRequest().authenticated()`)。

#### F2.3 GB28181 接口认证可关闭 (P1)
- **位置**: `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/java/com/genersoft/iot/vmp/conf/security/JwtAuthenticationFilter.java:53-58`
- **现状**: 当 `interfaceAuthentication` 配置为 false 时，创建无凭据的匿名认证 Token，所有请求均通过。
- **风险**: 生产环境误配为 false 会导致所有 GB28181 API 无鉴权。
- **建议**: 移除 interfaceAuthentication 开关或默认为 true。

---

### F3. SQL 注入

#### F3.1 StreamProxyProvider 字符串拼接注入 (P0)
- **位置**: `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/java/com/genersoft/iot/vmp/streamProxy/dao/provider/StreamProxyProvider.java:22, 30-31, 34-63`
- **现状**: 多处使用 `String.format()` 和 `StringBuilder.append()` 直接拼接用户参数到 SQL：
  - Line 22: `" WHERE st.id = " + params.get("id")`
  - Line 30-31: `String.format(" WHERE st.app='%s' AND st.stream='%s'", ...)`
  - Line 34-63: `sqlBuild.append(" st.app LIKE '%").append(params.get("query")).append("%'")` 等
- **风险**: 经典 SQL 注入，攻击者可通过 app/stream/query/id/mediaServerId 参数注入恶意 SQL。
- **建议**: 改为 MyBatis XML Mapper + `#{}` 参数化查询；该 Provider 类建议重写为标准 Mapper 接口。

#### F3.2 TDengine Mapper XML 使用 ${} 参数展开 (P1)
- **位置**: 
  - `DEVICE/iot-tdengine/iot-tdengine-biz/src/main/resources/mapper/TdEngineMapper.xml`（37 处 `${}`）
  - `DEVICE/iot-sink/iot-sink-biz/src/main/resources/mapper/TdEngineMapper.xml`（7 处 `${}`）
- **现状**: TDengine 建表 DDL（`${item.fieldName}`、`${item.dataType}`）使用 `${}` 尚可理解（DDL 不支持参数绑定）。但 INSERT 语句中 `${item.fieldValue}`（如 TdEngineMapper.xml:62, 66, 70 等）直接拼接值，且 LIMIT/OFFSET 使用 `${pageSize}` 和 `${(pageNum - 1) * pageSize}`。
- **风险**: 尽管代码注释称 "TDEngine 引擎每次只执行一条 SQL，可有效防止 SQL 注入"，但单条 SQL 执行不防注入（例如构造特殊的 fieldValue 改变 SQL 语义）。该接口虽为内部使用，但防御深度不足。
- **建议**: INSERT 的 fieldValue 改为 `#{}` 参数化；LIMIT/OFFSET 改用 MyBatis 参数绑定；DDL 的 `${}` 做白名单校验 fieldName/dataType。

#### F3.3 SM4/AES 加密工具使用 ECB 模式 (P3)
- **位置**: `DEVICE/iot-common/iot-common-base/src/main/java/com/basiclab/iot/common/utils/AesUtils.java:91`
- **现状**: 使用 `AES/ECB/PKCS5Padding`，ECB 模式不隐藏数据模式。
- **风险**: 相同明文产生相同密文，可能泄露业务数据规律。
- **建议**: 改用 `AES/GCM/NoPadding` 或至少 `AES/CBC/PKCS5Padding`（需加 IV）。

---

### F4. XSS

#### F4.1 v-html 渲染 LLM 输出 (P2)
- **位置**: 
  - `WEB/src/views/train/components/AiModelTool/index.vue:203, 234`
  - `WEB/src/views/train/components/LLMManage/VisionInferenceModal.vue:79`
- **现状**: 使用 `v-html` 渲染 LLM 返回的 Markdown 转为 HTML 的内容。已使用 `DOMPurify.sanitize()` 做清洗。
- **风险**: DOMPurify 可能存在绕过漏洞（历史上确有）；LLM 输出内容可被攻击者通过 Prompt Injection 间接控制。
- **建议**: 考虑使用专门的 Markdown 渲染 Vue 组件（如 `vue-markdown`）替代 v-html；保持 DOMPurify 版本最新。

#### F4.2 登录错误信息原样展示 (P3)
- **位置**: `WEB/src/views/base/login/LoginForm.vue:112`
- **现状**: `createErrorModal({ content: (error as unknown as Error).message })` — 服务端错误原文弹窗展示。
- **风险**: 服务端异常信息可能泄露内部架构、数据库表名、堆栈等信息。
- **建议**: 前端做错误消息脱敏，通用错误提示 "登录失败，请重试"；详细错误仅输出到 console（dev 模式）。

#### F4.3 登录 Token URL 反射 (P3)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/filter/TokenAuthenticationFilter.java:62-63`
- **现状**: Token 可从 URL query parameter 读取（同 F1.4）。
- **风险**: 若登录后重定向 URL 包含 Token，可能被 Referer 泄露到第三方站点。
- **建议**: 同 F1.4。

---

### F5. CSRF / CORS

#### F5.1 CORS 全域放行 + 允许凭证 (P0)
- **位置**:
  - Nginx: `WEB/conf/nginx.conf:31-34, 112-115`
  - GB28181: `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/java/com/genersoft/iot/vmp/conf/security/WebSecurityConfig.java:128-149`
- **现状**: 
  - Nginx `map $http_origin $cors_origin { default *; "~^https?://.*" $http_origin; }` — 反射任意 Origin 或返回 `*`；所有 API Location 设置 `Access-Control-Allow-Credentials: true`。
  - GB28181 Spring Security: `corsConfiguration.addAllowedOriginPattern(CorsConfiguration.ALL)` + `setAllowCredentials(true)` + `setAllowedHeaders(Arrays.asList("*"))`。
- **风险**: 任何恶意网站均可发起带凭证（Cookie/Token）的跨域请求。虽主模块使用无状态 Token（需手动设置 Authorization Header），但 GB28181 模块+凭证开放尤为危险。
- **建议**: 
  1. Nginx: 移除 `default *`，将 `$cors_origin` 限制为白名单域名；如非必选，移除 `Access-Control-Allow-Credentials: true`。
  2. GB28181: 改为仅允许已知前端域名，禁止 `*` 和 `CorsConfiguration.ALL`。
  3. 如仅为同源使用，移除全局 CORS 配置。

#### F5.2 CSRF 保护已全局关闭 (P2)
- **位置**: `DEVICE/iot-common/iot-common-security/src/main/java/com/basiclab/iot/common/config/YudaoWebSecurityConfigurerAdapter.java:117`, `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/java/com/genersoft/iot/vmp/conf/security/WebSecurityConfig.java:110`
- **现状**: `csrf(AbstractHttpConfigurer::disable)` — 基于 "不使用 Session" 的前提关闭 CSRF 保护。
- **风险**: 结合 CORS 全局开放（F5.1），若 Token 通过 Cookie 传递或浏览器自动附带，存在 CSRF 风险。当前用 Authorization Header 传递 Token 缓解了部分风险，但防御深度不足。
- **建议**: 配合 CORS 收紧，可维持 CSRF disable；但必须确保所有 API 仅接受 Authorization Header 认证，不接受 Cookie。

---

### F6. 依赖漏洞

#### F6.1 Spring Boot 2.7.18 已 EOL (P1)
- **位置**: `DEVICE/iot-parent/pom.xml:29`
- **现状**: `spring-boot-starter-parent` 版本 2.7.18。Spring Boot 2.7.x OSS 支持已于 2023-11 结束，不再接收免费安全补丁。
- **风险**: 后续发现的 CVE 将无法通过社区更新修复。
- **建议**: 规划升级至 Spring Boot 3.x（需 Java 17+）；短期可购买 VMware Tanzu 商业支持或关注关键 CVE 手工 patch。

#### F6.2 Jackson 2.13.3 存在已知 CVE (P1)
- **位置**: `DEVICE/iot-parent/pom.xml:86`（由 Spring Boot BOM 管理）
- **现状**: Jackson 2.13.3，最低修复版 2.13.5(2.13 线) / 2.15+(最新线)。已知反序列化漏洞。
- **风险**: 若应用接受不可信 JSON 输入，可能触发 RCE。
- **建议**: 在 `pom.xml` 中显式覆盖 `jackson-bom` 版本至 2.13.5 或 2.15+。

#### F6.3 Netty 4.1.77 存在已知 CVE (P1)
- **位置**: `DEVICE/iot-parent/pom.xml`（由 Spring Boot BOM 管理）
- **现状**: Netty 4.1.77.Final；最新 4.1.x 已至 4.1.115+。多个 HTTP/2 相关 CVE。
- **风险**: 若网关（iot-gateway）使用 Netty 处理外部 HTTP 请求，存在 DoS/RCE 风险。
- **建议**: 显式升级至 4.1.100+。

#### F6.4 Fastjson 1.2.83 存在已知漏洞 (P1)
- **位置**: `DEVICE/iot-parent/pom.xml`
- **现状**: Fastjson 1.2.83，历史上多次高危反序列化漏洞（虽然高版本已有部分修复，但生态已不推荐）。
- **风险**: 若仍使用 Fastjson 解析不可信输入，存在 RCE 表面。
- **建议**: 迁移至 Fastjson2 或直接使用 Jackson（去除 Fastjson 依赖）。

#### F6.5 Apache POI 4.1.2 / Commons-FileUpload 1.4 存在 CVE (P2)
- **位置**: `DEVICE/iot-parent/pom.xml`
- **现状**: POI 4.1.2（最新 5.2+）、Commons-FileUpload 1.4（最新 1.5，修复 CVE-2023-24998）。
- **风险**: 若应用处理用户上传的 Office 文件，存在 XXE / DoS 风险。
- **建议**: 升级 POI 至 5.2+、Commons-FileUpload 至 1.5。

#### F6.6 JSch 0.1.55 存在 CVE (P3)
- **位置**: `DEVICE/iot-parent/pom.xml`
- **现状**: JSch 0.1.55 已停更，推荐替换为 `com.github.mwiede:jsch`。
- **风险**: SSH 连接场景下可能被利用。
- **建议**: 替换依赖为 `com.github.mwiede:jsch`。

#### F6.7 无 Shiro 依赖 (未发现)
- **现状**: 全项目使用 Spring Security，未引入 Apache Shiro。
- **评估**: 无需评估 Shiro 相关 CVE。

---

### F7. 密钥/Token 泄露面

#### F7.1 源码硬编码加密密钥 (P0)
- **位置**: 
  - `DEVICE/iot-common/iot-common-base/src/main/java/com/basiclab/iot/common/utils/AesUtils.java:53`
  - `DEVICE/iot-common/iot-common-base/src/main/java/com/basiclab/iot/common/utils/Sm4Utils.java:89-90`
- **现状**: AES 密钥和 SM4 密钥/IV 以字面量硬编码在 Java 源文件中（包括 main() 测试方法和生产代码引用）。
- **风险**: 密钥随源码提交 git，任何有仓库读取权限者可解密所有加密数据。密钥在 .class 反编译后也可提取。
- **建议**: 密钥移至外部配置（Nacos/环境变量），加密存储；已泄露密钥需轮换。

#### F7.2 MyBatis-Plus 加密密钥 + SSL 密钥库密码硬编码 (P0)
- **位置**: 
  - `DEVICE/iot-system/iot-system-biz/src/main/resources/application.yaml:61`
  - `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/resources/application.yaml:77, 101`
- **现状**: MyBatis-Plus 字段加密密码（`encryptor.password`）和 SSL keystore 密码以明文写在 application.yaml 中。
- **风险**: 数据库字段加密形同虚设；SSL 私钥可被解密。
- **建议**: 改为 `${ENCRYPTOR_PASSWORD}` 环境变量引用 + Nacos 加密存储。

#### F7.3 云服务 API Key 泄露到 .env 文件 (P0)
- **位置**: 
  - `VIDEO/.env:252`, `VIDEO/.env.docker:275`, `VIDEO/.env.prod:249`（第三方 LLM API Key）
  - `AI/.env:14`, `AI/.env.docker:11`, `AI/.env.prod:11`（Flask SECRET_KEY）
  - `VIDEO/.env:249`, `VIDEO/.env.docker:266`, `VIDEO/.env.prod:240`（JWT Token）
- **现状**: 第三方付费 API Key（如 DashScope）以明文写入 .env 文件并提交到 Git 仓库。
- **风险**: API Key 泄露可导致财务损失；且所有环境（dev/prod）使用相同 Key。
- **建议**: 
  1. 立即在云平台 revoke 已泄露的 API Key 并生成新 Key。
  2. .env 文件加入 `.gitignore`，仅保留 `.env.example` 模板。
  3. 生产环境通过 Docker Swarm Secrets / K8s Secrets / 注入环境变量。

#### F7.4 数据库/中间件密码全环境一致 (P0)
- **位置**: 全局 application-{dev,prod,local}.yaml 文件 — 包括但不限于:
  - PostgreSQL 密码（所有模块 application-*.yaml）
  - Redis 密码（所有模块 application-*.yaml）
  - Nacos 密码（所有模块 application-*.yaml + AI/.env* + VIDEO/.env*）
  - MinIO access/secret key（多个 application-*.yaml + docker-compose）
  - TDengine 密码（`iot-tdengine`、`iot-sink`）
  - RabbitMQ `guest/guest`（多个 application-prod.yaml）
  - EMQX Dashboard 密码（`.scripts/docker/docker-compose.yml:388`）
- **现状**: 开发、测试、生产环境使用相同的数据库密码和中间件密码，明文写在 yaml 中。
- **风险**: 单一环境泄露即影响全部环境；任何有源码权限者可访问生产数据库。
- **建议**: 
  1. 各环境使用独立密码。
  2. 密码通过环境变量或 Nacos 配置中心注入，不在 yaml 中写明文。
  3. 使用 jasypt 或 Nacos 加密存储。

#### F7.5 微信/DingTalk 第三方平台密钥泄露 (P0)
- **位置**: 
  - `DEVICE/iot-message/iot-message-biz/src/main/resources/application-*.yaml` — 微信公众号 AppSecret、小程序 AppSecret、企业微信 Secret、钉钉 Client Secret
- **现状**: 微信/钉钉等第三方平台的 API Secret 明文写在 yaml 配置文件中。
- **风险**: Secret 泄露可导致攻击者接管企业微信/钉钉应用，发送任意消息、读取通讯录等。
- **建议**: 同 F7.4；立即在各平台后台 reset Secret。

#### F7.6 ZLMediaKit / SIP 设备密钥硬编码 (P1)
- **位置**: 
  - `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/resources/application-{dev,prod,local}.yaml` — ZLM secret、SIP password
  - `DEVICE/iot-device/iot-device-biz/src/main/resources/application-dev.yaml:160, 194, 209` — ZLM secret、SIP password、stream sign
  - `DEVICE/iot-dataset/iot-dataset-biz/src/main/resources/application-prod.yaml` — ZLM secret
- **现状**: 媒体服务器 API Secret 和 SIP 设备认证密码以明文写在多模块配置文件中。
- **风险**: Secret 泄露可控制媒体服务器、伪造 SIP 设备注册。
- **建议**: 同 F7.4。

#### F7.7 前端登录页硬编码默认凭据 (P1)
- **位置**: `WEB/src/views/base/login/LoginForm.vue:43-47`
- **现状**: `formData` 预填充 `tenantName: 'Admin-IoT'`, `username: 'admin'`, `password: 'admin123'`。
- **风险**: 默认凭据暴露在源码中，降低因密码忘记无法登录的门槛；若存在未改密码的账户，可被直接登录。
- **建议**: 移除预填充的密码；首次部署后强制要求修改默认密码。

#### F7.8 验证码默认关闭 (P2)
- **位置**: 
  - `WEB/.env:14` — `VITE_GLOB_APP_CAPTCHA_ENABLE = false`
  - `WEB/src/views/base/login/LoginForm.vue:59` — `if (captchaEnable === 'false')` 跳过验证码
- **现状**: 验证码全局关闭，登录接口无 brute-force 保护。
- **风险**: 可对登录接口进行暴力破解。
- **建议**: 生产环境开启验证码；后端增加登录失败速率限制（如 5 次/分钟/IP 锁定 15 分钟）。

#### F7.9 GPUStack / XXL-Job / Docker Env 密码硬编码 (P2)
- **位置**: 
  - `WEB/.env.production:34` — GPUStack 管理员密码
  - `DEVICE/iot-system/iot-system-biz/src/main/resources/application.yaml:113` — XXL-Job `default_token`
  - `.scripts/docker/docker-compose.yml` — 多个容器密码
  - `.scripts/docker/.env.docker` — 多个容器密码
- **现状**: GPUStack 管理面板密码、XXL-Job 调度中心 Token、Docker 中间件密码明文存储。
- **风险**: 攻击者可访问 GPUStack/XXL-Job 管理面板或中间件。
- **建议**: 同 F7.4。

#### F7.10 Flask SECRET_KEY 全环境相同 (P2)
- **位置**: `AI/.env:14`, `AI/.env.docker:11`, `AI/.env.prod:11`, `VIDEO/.env:14`, `VIDEO/.env.docker:11`, `VIDEO/.env.prod:11`
- **现状**: AI 和 VIDEO 两个 Python 服务的 Flask `SECRET_KEY` 完全相同且跨环境一致。
- **风险**: SECRET_KEY 用于 session 签名；泄露后攻击者可伪造 Flask session。
- **建议**: 各环境生成独立随机 SECRET_KEY；通过环境变量注入。

---

## 修复优先级

### P0 立即修 (2 小时内，可 hotfix)
1. **F7.1** — 移除源码中硬编码的 AES/SM4 密钥，轮换已泄露密钥
2. **F7.2** — MyBatis-Plus encryptor password / SSL keystore password 改为环境变量
3. **F7.3** — 立即 revoke 云平台 API Key（DashScope），.env 文件加入 .gitignore
4. **F7.4** — 各环境数据库/中间件密码改为独立密码 + 环境变量注入（先改生产）
5. **F7.5** — 微信/DingTalk Secret 在各平台后台 reset，改为环境变量
6. **F1.2** — BCrypt `passwordEncoderLength` 从 4 改为 12
7. **F1.3** — 确保所有 profile `mock-enable=false`；生产环境禁用 mockLoginUser
8. **F2.1** — 移除 device 模块 `/**` permitAll，改为具体授权
9. **F3.1** — 修复 StreamProxyProvider SQL 注入，改用 MyBatis `#{}` 参数化
10. **F5.1** — Nginx CORS 限制白名单域名 + 移除 `Access-Control-Allow-Credentials`

### P1 本周修
1. **F1.1** — 改用 JWT 签名 Token（HS256 或 RS256）
2. **F1.5** — LoginUser Header 透传加 HMAC 签名
3. **F2.3** — GB28181 interfaceAuthentication 默认 true 或移除开关
4. **F3.2** — TDengine Mapper `${}` 中 fieldValue 改为 `#{}`，fieldName 加白名单校验
5. **F6.1** — Spring Boot 2.7.18 EOL 升级规划
6. **F6.2** — Jackson 升级至 2.13.5+
7. **F6.3** — Netty 升级至 4.1.100+
8. **F6.4** — Fastjson 迁移至 Fastjson2 或 Jackson
9. **F7.6** — ZLMediaKit/SIP 密钥改为环境变量
10. **F7.7** — 移除前端默认预填充密码

### P2 计划修
1. **F1.4** — 限制 Token URL 参数仅 WebSocket 路径
2. **F1.6** — GB28181 KeyID 移至配置 + 移除 JWT 中密码
3. **F2.2** — 统一鉴权注解体系 + `.anyRequest().authenticated()` 默认拒绝
4. **F4.1** — 用 Vue Markdown 组件替代 v-html
5. **F5.2** — 收紧 CORS 后维持 CSRF disable
6. **F6.5** — POI / Commons-FileUpload 升级
7. **F7.8** — 生产环境开启验证码 + 登录速率限制
8. **F7.9** — GPUStack / XXL-Job / Docker 密码环境变量化
9. **F7.10** — Flask SECRET_KEY 各环境独立化

### P3 监控
1. **F3.3** — AES ECB → GCM 模式
2. **F4.2** — 前端错误消息脱敏
3. **F4.3** — Token URL 反射
4. **F6.6** — JSch 替换为 `com.github.mwiede:jsch`

---

## 不在本维度范围

- **DEVICE module `application.yaml` 中无效路由** → D2 架构
- **Docker Compose 中间件版本过旧** → D7 中间件
- **Gateway 路由健康检查** → D3 服务/部署
- **Logback 日志轮转配置** → D3 服务/部署
- **Flask 启动参数（debug/workers）** → D5 AI 模型服务
- **前端 .map 文件 / console.log 残留** → D6 前端
- **Nginx 静态资源配置** → D6 前端
