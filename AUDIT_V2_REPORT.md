# EasyAIoT 全面代码审查 v2 报告

## 执行摘要

- **审查时间**: 2026-06-19
- **审查范围**: DEVICE/ (2391 .java)、WEB/src/ (602 .ts)、AI/ (54 .py)、VIDEO/
- **发现问题总数**: **31 P0 / 28 P1 / 24 P2 / 8 P3** = **91 个问题**
- **上次审查 P0 修复情况**: 上次 D1-D8 报告标注的 10 个 P0 问题，经本次验证**无一修复**——Device `/**` permitAll 仍在、CORS wildcard 仍在、硬编码密钥仍在、BCrypt 4轮仍在、SQL 注入仍在、.env 密钥未移除。
- **新增重大问题**: AI 模块所有端点零鉴权（21+接口）、alert_service.py SQL 注入（f-string 拼 SQL）、iot-file 模块 4 个 API 因多重 @RequestBody 完全不可用、前端 ~108 个 API 调用无后端对应

**总体结论**: 系统处于高风险状态。上次 P0 无一修，本次发现 31 个 P0（含新增 AI 零鉴权、前端 API 大量断裂）。**建议暂停 demo 开发，优先修 P0。**

---

## 维度 1: 功能完整性

### 1.1 缺失模块

- **[P0] Inspection 模块完全缺失** — 前端 `WEB/src/api/device/inspection.ts` 定义 17 个 `/inspection/*` API，`WEB/src/router/routes/modules/inspection.ts` 定义 4 个巡检页面（dashboard/plan/task/result），但 DEVICE/ 下无 `iot-inspection` 模块，无任何 Java Controller。Gateway 注释说路由到 `127.0.0.1:48088`，但该端口无对应服务。
- **[P0] Indicator/Dashboard API 缺失** — 前端 `WEB/src/api/device/dashboard.ts` 调用 6 个 `/indicatorApi/data/*` 端点，零后端对应。
- **[P0] Warn Notify 模块缺失** — 前端 `notice.ts:193,198` 调用 `/warn/notify/query` 和 `/warn/notify/updateStatus`，无后端 Controller。
- **[P1] Model/Inference/Deploy/Export 模块无 Java Gateway 路由** — AI Python 服务实现了 ~47 个 `/model/*` 接口，但 iot-gateway 无对应路由（gateway `application.yaml:93-97` 标注多个服务"待部署"）。前端通过 `/dev-api/model/...` 调用将 404。

### 1.2 功能链断裂

- **[P0] 告警链路断裂 (Python → Kafka → iot-sink → iot-message)**：
  - `VIDEO/run.py:157` 生产告警到 `iot-alert-notification`
  - `iot-sink/AlertNotificationConsumer.java:50-54` 消费 `iot-alert-notification`，转发到 `iot-alert-notification-send`
  - `iot-message/AlertNotificationConsumer.java:45` 消费 `iot-alert-notification-send`
  - **问题**: 同属告警链路但经过 3 跳（VIDEO→sink→message），任一跳断开则全链路失效。iot-sink 和 iot-message 均处于 failed/inactive 状态（上次审查 D3-F3.12），意味着 **全部实时告警通知静默失效**。
- **[P1] Snapshot 告警链路 topic 名不一致**：
  - `VIDEO/run.py:158` 生产到 `iot-snapshot-alert`
  - `iot-sink/SnapshotAlertConsumer.java:188-192` 消费 `iot-snapshot-alert`，转发到 `iot-snapshot-alert-notification-send`
  - `iot-message/SnapshotAlertNotificationConsumer.java:43` 消费 `iot-snapshot-alert-notification-send`
  - 链路需经过 iot-sink 桥接，若 sink 挂则 snap 告警全丢。
- **[P0] 视频服务无 Gateway 路由** — Gateway `application.yaml:94` 标注 `video-server → 待部署`，前端 `/video/alert/*` API 无法通过 Gateway 访问。

### 1.3 前端调用了不存在的 API

- **[P0] `/inspection/**`** — 17 个端点 (inspection.ts:82,87,95,103,109,118,148,154,162,170,201,206,214,243,248,273,286) — 无后端
- **[P0] `/indicatorApi/**`** — 6 个端点 (dashboard.ts:4-9 enum) — 无后端
- **[P0] `/warn/notify/**`** — 2 个端点 (notice.ts:193,198) — 无后端
- **[P0] `/model/**` (全部 47 个)** — 有 Python 后端但无 Java Gateway 路由 (model.ts:31-340, auto-label.ts:43-59)
- **[P1] `/video/alert/delete/{id}`** — calculate.ts:77 — VIDEO Python 未实现
- **[P1] `/video/alert/generatePlayback`** — calculate.ts:121 — 所有后端均未实现
- **[P1] `/message/config/*`** — 8 个端点 (notice.ts:76,81,86,91,162,177,181,186) — 后端 MessageConfigController 未实现 queryById, export, import 等
- **[P1] `/message/template/*`** — 10 个端点 (notice.ts:110,113,118,123,130,134,138,142,147,152) — 后端仅实现 queryByType 和 get
- **[P1] `/message/history/*`** — 2 个端点 (notice.ts:101,105) — 后端使用 `/message/push/history` 前缀不匹配
- **[P2] `/tdengine/dataOperation/...`** — devices.ts:6 — 前端多带 `/tdengine` 前缀，与实际 Controller `/dataOperation` 不匹配

### 1.4 AI 模块功能链

- AI 模块功能链**基本完整**：模型上传 → 训练 → 部署 → 推理 → 告警，覆盖 YOLO/OCR/LLM/语音/车牌等，但：
  - **[P0]** 所有 Blueprint 端点**零鉴权**（见维度 3）
  - **[P2]** `app/blueprints/model.py:660-664` — `get_model_size()` 返回硬编码假数据，非真实模型文件大小
  - **[P2]** `app/services/ocr_service.py:556-569` — `get_performance_metrics()` 引用不存在的 `self.ocr_engine` 属性，运行时必抛 AttributeError

### 维度 1 总结

功能完整性问题**极其严重**：108 个前端 API 调用无后端对应。核心模块 inspection 完全缺失，dashboard 指标 API 缺失，告警链路在小批量环境中需 3 跳 fragile 架构。model 模块虽有 Python 实现但无法通过 Gateway 访问。这些断裂意味着 **15路摄像头 demo 的巡检、告警、仪表盘功能无法正常工作**。

---

## 维度 2: 结构稳定性

### 2.1 端口冲突

- **端口分配表**（bootstrap.yaml 确认）:

| 服务 | 端口 | 状态 |
|------|------|------|
| iot-gateway | 48080 | ✓ |
| iot-infra | 48082 | ✓ |
| iot-device | 48083 | ✓ |
| iot-dataset | 48087 | ✓ |
| iot-gb28181 | 48088 | ✓ |
| iot-file | 48090 | ✓ |
| iot-tdengine | 48091 | ✓ |
| iot-sink | 48092 | ✓ |
| iot-message | 48093 | ✓ |
| iot-system | 48099 | ✓ |

- **[P1] iot-inspection 模块不在 DEVICE/ 但前端引用了端口 48088**：gb28181 使用 48088，若未来 inspection 部署将冲突。需在规划时为 inspection 分配独立端口（如 48089）。
- **[P2] iot-video (VIDEO/run.py:764) 使用 6000**：不在 Gateway 路由表中，直接暴露宿主机端口，无 Gateway 层的鉴权/限流保护。
- **其他 10 个模块端口无冲突**。

### 2.2 Nacos 配置

- **[P0] Nacos namespace 全部错配（上次 P0，未修复）**：
  - `bootstrap-dev.yaml`: `discovery.namespace: local` + `config.namespace: local`
  - `bootstrap-prod.yaml`: `discovery.namespace: dev` + `config.namespace: dev`
  - **影响**: 10 个服务全部受影响。dev 环境从 Nacos namespace `local` 拉配置，prod 环境从 `dev` 拉配置。若 Nacos 上建了正确的 dev/prod namespace，服务将 fallback 到本地 yaml，远程配置完全无效。
- **[P0] iot-message base-package 配置错误（上次 P0，未修复）**：
  - `DEVICE/iot-message/iot-message-biz/src/main/resources/application.yaml:147`
  - `iot.info.base-package: com.basiclab.iot.device` → 应为 `com.basiclab.iot.message`
  - 影响 MyBatis 类型别名扫描、Swagger 文档生成、可能影响组件扫描
- **[P0] iot-infra 生产环境 RocketMQ 地址错误（上次 P0，未修复）**：
  - `DEVICE/iot-infra/iot-infra-biz/src/main/resources/application-prod.yaml` — RocketMQ name-server = `127.0.0.1:9876`
  - 其他所有服务 prod 均配置 `10.0.0.87:9876`
- **[P1] iot-file MinIO endpoint 硬编码**：
  - `DEVICE/iot-file/iot-file-biz/.../MinioSysFileServiceImpl.java:696`
  - `MinioClient.builder().endpoint("14.18.122.2")` — 硬编码公网 IP，绕过配置文件中的 minio.url/downloadUrl 设置
- **[P1] iot-message MinioClient Bean 端口缺失**：
  - `DEVICE/iot-message/iot-message-biz/.../config/MinioConfig.java:23-29`
  - endpoint 仅 `http://localhost`，未包含端口 9000，导致 `@Autowired MinioClient` Bean 连接到 80 端口
- **[P1] iot-message dev 环境数据库主机不一致（上次 P1，未修复）**：
  - `DEVICE/iot-message/iot-message-biz/src/main/resources/application-dev.yaml` — 数据库主机 `iot.basiclab.top:5432`
  - 其他所有服务 dev 环境使用 `14.18.122.2:5432`
- **[P2] PROD 环境 Redis DB 索引不一致**：system-server 使用 DB 0，其余 9 个服务使用 DB 1
- **[P2] Kafka 序列化方式不统一（上次 P2，未修复）**：部分服务用 JsonSerializer、部分用 StringSerializer 且使用自定义 `spring.kafka.iot` 命名空间
- **[P2] MinIO 配置结构碎片化（上次 P2，未修复）**：存在 3 种互不兼容的属性结构（A: minio.endpoint/port, B: minio.url/downloadUrl, C: minio.endpoint/user/password）
- **[P2] Multipart 文件上传大小配置冲突**：iot-message application.yaml=16MB vs bootstrap.yaml=500MB，iot-gb28181 仅 10MB
- **[P2] iot-dataset prod Kafka bootstrap-servers 错误**：`application-prod.yaml:76` — `spring.kafka.bootstrap-servers: localhost:9092`，实际应为 `10.0.0.87:9092`（spring.kafka.iot 配置块正确但标准块错误）
- **[P3] "Yudao" 旧项目名残留**：iot-infra（3处 Yudao 配置块）、iot-message（3处）、iot-sink（3处 token secret 含 "yudao"），共 9 处

### 2.3 数据库设计

- **[P1] iot-message 与 iot-sink 对 alert 表双写冲突（上次 P1，未修复）**：
  - `DEVICE/iot-sink/.../AlertMapper.java:19` — `@DS("video")`
  - `DEVICE/iot-message/.../AlertMapper.java:19` — `@DS("video")`
  - 两个服务同时写同一张 alert 表，无分布式锁，存在数据竞争
- **[P1] iot-sink 手动 DataSource 切换缺少 finally 保护（上次 P1，未修复）**：
  - `DEVICE/iot-sink/.../AlertServiceImpl.java:1114` — `DynamicDataSourceContextHolder.push("video")` 后用原始 JDBC 执行 SQL，若异常抛出时 .clear() 未执行，线程上下文被污染
- **[P2] iot-device20 被多个服务共享读写（上次 P2，未修复）**：device、sink、dataset 三个服务共写同一数据库
- **[P2] PROD 环境缺失 Redis Lettuce 连接池配置（上次 P2，未修复）**

### 2.4 Gateway 路由

- **[P1] Knife4j 死路由 gb28181-server（上次 P1，未修复）**：Gateway `application.yaml:115-117` 聚合了 `gb28181-server` 的 Swagger 文档，但路由表中该路径已注释（"由 Nginx mock 处理"），Swagger UI 返回 404
- **[P2] 多个服务路由缺失**：video-server、tdengine-server、broker-server、iot-gb28181 在 Gateway 路由表中均标注"待部署"或"已由 Nginx mock 处理"

### 2.5 systemd Unit 文件（参考上次 D3 审查）

上次审查发现 13 个问题（3 P1 + 5 P2 + 3 P3）。核心问题：
- **[P1]** 3 个核心服务（gateway/infra/system）未 enable
- **[P1]** systemd unit 中明文暴露数据库/Redis/Nacos 密码
- **[P1]** JVM 堆配置严重不足（-Xmx256m 但实际 RSS 800M+）
- **[P2]** 日志写入 /tmp 无轮转
- **[P2]** 健康检查端点不一致

### 维度 2 总结

10 个模块端口分配唯一无冲突，但 inspection 预留 48088 与 gb28181 潜在冲突。Nacos namespace 错配、iot-message base-package 错误、iot-infra RocketMQ 地址错误等 3 个 P0 **自上次审查以来无一修复**。iot-file 模块新增硬编码 IP 和 MinIO 端口缺失问题。数据库双写冲突、DataSource 切换无 finally 保护等架构问题持续存在。

---

## 维度 3: Bug 检测

### P0 (立即修)

1. **[P0-001] AI 模块所有 API 端点零鉴权** — `AI/app/blueprints/inference.py:71,125,302`、`model.py:83,138,400,551`、`train.py:254,295`、`deploy.py:171,284,684`、`alert.py:239,277`、`llm.py:93,289,603,1377`、`auto_label.py:95,310` 等 21+ 个端点。任何可访问 Flask 5000 端口的攻击者可直接上传模型、启动 GPU 训练、删除所有告警、使用 LLM API Key、部署服务。**建议**: 添加 JWT/Token 中间件，所有端点默认拒绝对外访问。

2. **[P0-002] AI alert_service.py SQL 注入** — `AI/alert_service.py:121,146,155,161,220`。使用 f-string 拼接用户参数到 SQL WHERE 子句（`conditions.append(f'alert_type IN ({ph})')`、`cur.execute(f'SELECT ... WHERE {where}', params)`）。攻击者可通过 device_id/alert_type/alert_tag 参数注入恶意 SQL。**建议**: 改为参数化查询或使用 SQLAlchemy text() 绑定参数（参照 `alert.py` blueprint）。

3. **[P0-003] Device 模块 `/**` permitAll 鉴权绕过（上次 P0，未修复）** — `DEVICE/iot-device/iot-device-biz/.../SecurityConfiguration.java:32` — `.antMatchers("/**").permitAll()`。所有 device 接口无需认证即可访问。**建议**: 移除 wildcard，改为具体路径授权 + 默认 `.anyRequest().authenticated()`。

4. **[P0-004] CORS 全域放行 + 允许凭证（上次 P0，未修复）** — `DEVICE/iot-common/iot-common-web/.../YudaoWebAutoConfiguration.java:86-89` — `config.setAllowCredentials(true)` + `config.addAllowedOriginPattern("*")`。任何恶意网站可发送带凭证的跨域请求。GB28181 `WebSecurityConfig.java:139-141` 同样问题。**建议**: 限制为白名单域名。

5. **[P0-005] Nacos 密码硬编码在 10 个服务的 bootstrap-*.yaml 中（上次 P0，未修复）** — 所有模块 `bootstrap-dev.yaml` 和 `bootstrap-prod.yaml` 明文写入 `password: basiclab@iot78475418754`（每个文件 2 处 × 3 profiles × 10 服务 = 60 处）。**建议**: 改为 `${NACOS_PASSWORD}` 环境变量注入。

6. **[P0-006] AES 密钥硬编码在源码（上次 P0，未修复）** — `DEVICE/iot-common/iot-common-base/.../AesUtils.java:53` — `String key = "FA171555405706F73D7B973DB89F0B47"`。**建议**: 密钥移至外部配置，已泄露密钥需轮换。

7. **[P0-007] .env 文件含云平台 API Key + 数据库密码 + Flask SECRET_KEY（上次 P0，未修复）** — `AI/.env:14,32,48,65-68`、`AI/.env.prod:11,32,47,60-66`、`AI/.env.docker:11,30,45,59-64`、`VIDEO/.env`, `VIDEO/.env.prod`, `VIDEO/.env.docker`。这些 .env 文件仍在 Git 仓库中。**建议**: .env 加入 .gitignore，仅保留 .env.example；立即在云平台 revoke 已泄露的 API Key。

8. **[P0-008] BCrypt 密码强度仅 4 轮（上次 P0，未修复）** — `DEVICE/iot-common/iot-common-security/.../SecurityProperties.java:50` — `passwordEncoderLength = 4`。GPU 暴力破解秒级完成。**建议**: 改为 12。

9. **[P0-009] Mock 登录可绕过认证（上次 P0，未修复）** — `DEVICE/iot-common/iot-common-security/.../TokenAuthenticationFilter.java:126-138` — 若 `mockEnable=true`，发送 `Authorization: Bearer test1` 即可伪装 userId=1。默认 secret 为 `"test"`。**建议**: 所有 profile 显式设置 `mock-enable=false`。

10. **[P0-010] GPUStack 管理员密码硬编码在前端源码** — `WEB/.env.production:33` + `WEB/src/utils/gpustack.ts:46` — `VITE_GPUSTACK_PASSWORD = basiclab@iotp4JWmQSvzdh0z4mF`。打包进 JS bundle，任何用户可提取后登录 GPUStack 控制台 (10180)。**建议**: 密码移至后端，前端通过 API 获取临时 Token。

11. **[P0-011] iot-file: getDataConfig() 泄露 MinIO 凭证** — `DEVICE/iot-file/iot-file-biz/.../SysFileController.java:176-180` — 返回 `accessKey` 和 `secretKey` 明文给调用方。**建议**: 移除该字段或脱敏。

12. **[P0-012] iot-file: 4 个 API 因多重 @RequestBody 完全不可用** — `DEVICE/iot-file/iot-file-biz/.../SysFileController.java:291,311,329,347` — Spring 不支持单个方法多个 @RequestBody，这些端点（download/folderExists/createFolder/getUrl）在运行时必抛异常。**建议**: 改为 `@RequestParam` 或 DTO 封装。

13. **[P0-013] iot-file: 硬编码 MinIO endpoint** — `DEVICE/iot-file/iot-file-biz/.../MinioSysFileServiceImpl.java:696` — `.endpoint("14.18.122.2")` 绕过所有配置文件。**建议**: 从配置读取。

14. **[P0-014] iot-message base-package 错误** — `DEVICE/iot-message/iot-message-biz/src/main/resources/application.yaml:147` — `iot.info.base-package: com.basiclab.iot.device`。**建议**: 改为 `com.basiclab.iot.message`。

15. **[P0-015] iot-message MinioClient Bean 端口缺失** — `DEVICE/iot-message/iot-message-biz/.../MinioConfig.java:23-29` — endpoint 为 `http://localhost` 无端口，连接到 80 而非 9000。**建议**: 改为 `http://localhost:9000` 或从配置读取。

16. **[P0-016] iot-infra prod RocketMQ 地址错误** — `DEVICE/iot-infra/iot-infra-biz/src/main/resources/application-prod.yaml` — `127.0.0.1:9876`，应为 `10.0.0.87:9876`。

17. **[P0-017] Nacos namespace 全部错配** — 10 个服务的 bootstrap-dev.yaml 指向 namespace `local`，bootstrap-prod.yaml 指向 namespace `dev`。**建议**: dev→dev, prod→prod。

18. **[P0-018] AI alert_service.py 零鉴权独立服务** — `AI/alert_service.py:82-329` — 完整独立 Flask 应用（端口 58000），所有端点（/health, /page, /statistics, /delete, /clear）零鉴权。**建议**: 添加 Token 验证中间件。

19. **[P0-019] 前端 ~108 个 API 调用无后端实现** — inspection(17) + indicatorApi(6) + model(47) + video-alert(10) + warn-notify(2) + message-gaps(19) + tdengine(1)。详见维度 1.3。

20. **[P0-020] alert_service 的 Kafka 告警链路静默失效** — iot-message 和 iot-sink 服务处于 failed/inactive 状态（上次审查 D3-F3.12），VIDEO→sink→message 的三跳架构中任一跳断开则所有实时告警通知失败。

21. **[P0-021] AI .env.docker:20 DEBUG=True** — Docker 环境开启 Flask debug 模式，Werkzeug debugger 允许任意代码执行。

22. **[P0-022] AI 模块全局可变状态无锁** — `AI/app/blueprints/export.py:25,70`（ThreadPoolExecutor + export_tasks dict）、`train.py:51,52`（train_status + train_processes）、`plate.py:49,52`（plate status + model cache）、`deploy_service.py:20`（deploy daemons）。多线程并发访问无锁保护。**建议**: 使用 `threading.Lock()` 或迁移到数据库/Redis 状态。

23. **[P0-023] 前端 new Function() 代码注入** — `WEB/src/api/http.ts:94,218`（`new Function(funcStr)()` 和 `new Function("return \`" + url + "\`")()`）。Dashboard 配置系统中的 `javascript:` 前缀允许执行任意用户提供的代码。若攻击者修改仪表盘配置（通过管理 API），可实现存储型 XSS。**建议**: 移除 `javascript:` 执行能力，使用受控的表达式引擎。

24. **[P0-024] JWT Token 通过 URL 查询参数泄露** — `WEB/src/api/device/model.ts:158` — `EventSource(...?token=${localStorage.getItem('jwt_token')})`。Token 出现在 URL 中，可见于浏览器历史、服务器日志、Referer header。**建议**: 改用 HTTP Header 或 Cookie 传 Token。

25. **[P0-025] InnerAuth 鉴权可被 trivial Header 绕过** — `DEVICE/iot-common/iot-common-security/.../InnerAuthAspect.java:28-32` — 仅检查 `from-source: inner` Header 字符串。攻击者添加此 Header 即可绕过 `@InnerAuth` 保护的内部 RPC 端点。**建议**: 使用 HMAC 签名或双向 TLS。

26. **[P0-026] iot-file: MinIO 文件上传无类型/路径校验** — `DEVICE/iot-file/iot-file-biz/.../MinioSysFileServiceImpl.java:88-89,142-143` — `file.getOriginalFilename()` 直接用作 MinIO object key，无路径遍历过滤、无文件类型验证。`FileUploadUtils.extractFilename()` 安全方法被注释掉。**建议**: 启用 extractFilename() + MIME 类型白名单。

27. **[P0-027] AI 模块多处 bare except 吞异常** — `AI/run.py:219,524`（bare `except: pass`）、`db_models.py:149,195`（吞 JSON 解析异常）、`inference.py:319`（吞推理异常）、`cluster.py:238`、`speech_service.py:567`、`inference_service.py:550,745`、`deploy.py:786` 等 17 处。**建议**: 替换为具体异常类型并记录日志。

28. **[P0-028] AI/VIDEO .env 文件密钥全环境相同 + 已提交 Git** — `AI/.env`, `AI/.env.prod`, `AI/.env.docker` 中 `SECRET_KEY`、`DATABASE_URL`（含密码）、`NACOS_PASSWORD`、`MINIO_SECRET_KEY` 完全相同，且 `.gitignore` 未排除 .env 文件。`VIDEO/.env*` 同理。**建议**: 立即在 .gitignore 添加 `*.env` (保留 `.env.example`)；在云平台 revoke 已泄露的多项密钥。

29. **[P0-029] AI speech_service.py 硬编码真实 API Key** — `AI/app/services/speech_service.py:42-46` — 代码中直接比对 `self.config['secret_key'] == 'b16ed9e1cef762967b79145b69811eb6'`，泄露了讯飞 API Secret。**建议**: 移除硬编码比对，仅从环境变量读取。

30. **[P0-030] iot-message Kafka 消费者 poison message 无限重试** — `DEVICE/iot-message/iot-message-biz/.../AlertNotificationConsumer.java:128-136` — 异常捕获后既不 ack 也不 nack，MANUAL ack 模式下 offset 永不提交，消费者卡在同一消息死循环。**建议**: 配置死信队列或超过重试次数后 ack 跳过。

31. **[P0-031] AI 模块线程中反复创建 Flask app 实例** — `AI/app/blueprints/export.py:185`、`train.py:645,1013`、`inference_service.py:786` — Worker 线程中调用 `from run import create_app; application = create_app()`，造成重复注册 Blueprint、重复 Nacos 注册、重复心跳线程。**建议**: 传递 app 引用或使用 `current_app._get_current_object()`。

### P1 (本周修)

1. **[P1-001] GB28181 StreamProxyProvider SQL 注入（上次 P0）** — `DEVICE/iot-gb28181/iot-gb28181-biz/.../StreamProxyProvider.java:22,30-31,34-63` — 使用 `String.format()` 和 `StringBuilder.append()` 拼接用户参数。**建议**: 重写为标准 MyBatis Mapper + `#{}` 参数化。

2. **[P1-002] Token 非 JWT 签名，无法自验（上次 P1）** — `DEVICE/iot-system/.../OAuth2TokenServiceImpl.java:191-197` — 使用 `IdUtil.fastSimpleUUID()` 生成 Token。**建议**: 改用 JWT HS256 自包含 Token。

3. **[P1-003] LoginUser 可从 HTTP Header 伪造（上次 P1）** — `DEVICE/iot-common/.../TokenAuthenticationFilter.java:141-153` — 读取 `login-user` Header 直接反序列化。**建议**: Gateway 层加 HMAC 签名。

4. **[P1-004] GB28181 认证可配置关闭（上次 P1）** — `DEVICE/iot-gb28181/.../JwtAuthenticationFilter.java:53-58` — `interfaceAuthentication=false` 时完全跳过认证。**建议**: 移除开关或默认 true。

5. **[P1-005] Spring Boot 2.7.18 EOL（上次 P1）** — `DEVICE/iot-parent/pom.xml:29` — OSS 支持已于 2023-11 终止。**建议**: 规划升级到 Spring Boot 3.x。

6. **[P1-006] Jackson 2.13.3 CVE（上次 P1）** — `DEVICE/iot-parent/pom.xml:86`。**建议**: 升级到 2.13.5+ 或 2.15+。

7. **[P1-007] Netty 4.1.77 CVE（上次 P1）** — `DEVICE/iot-parent/pom.xml:91`。**建议**: 升级到 4.1.100+。

8. **[P1-008] Fastjson 1.2.83（上次 P1）** — `DEVICE/iot-parent/pom.xml:75`。**建议**: 迁移到 Fastjson2 或 Jackson。

9. **[P1-009] 前端默认预填充密码（上次 P1）** — `WEB/src/views/base/login/LoginForm.vue:43-47` — `password: 'admin123'`。**建议**: 移除预填充。

10. **[P1-010] iot-sink TdEngineMapper.xml ${} SQL 注入（上次 P1）** — `DEVICE/iot-sink/iot-sink-biz/src/main/resources/mapper/TdEngineMapper.xml:18,22,26,36,40,44` — `${item.fieldValue}` 直接拼接值。**建议**: fieldValue 改为 `#{}` 参数化。

11. **[P1-011] Gateway  Knife4j 死路由** — `DEVICE/iot-gateway/.../application.yaml:115-117` — gb28181-server 聚合但无对应路由。**建议**: 删除或恢复路由。

12. **[P1-012] iot-message Kafka Alert 主题名不一致（上次 P1）** — `application.yaml:111` 定义 `topic: iot-alert-notification`，但 profile 文件追加 `send-topic: iot-alert-notification-send`，消费者使用后者。默认 topic 成为孤立配置。

13. **[P1-013] iot-file createFolder 端点实际调用 folderExists** — `DEVICE/iot-file/iot-file-biz/.../SysFileController.java:331` — `sysFileService.folderExists(bucketName, path)` 而非 `createFolder()`。**建议**: 修正方法调用。

14. **[P1-014] iot-file getUrl 参数顺序反转** — `DEVICE/iot-file/iot-file-biz/.../SysFileController.java:351` — `getUrl(bucketName, objectName)` 但接口声明为 `getUrl(String objectName, String bucketName)`。**建议**: 统一参数顺序。

15. **[P1-015] iot-file objectExists/deletes 缺少 @RequestParam 注解** — `DEVICE/iot-file/iot-file-biz/.../SysFileController.java:96,115` — 参数无注解，Spring 无法正确绑定。

16. **[P1-016] iot-file uploadByBucket 返回 URL 用错 bucket** — `DEVICE/iot-file/iot-file-biz/.../MinioSysFileServiceImpl.java:157` — 返回 URL 使用默认 `minioConfig.getBucketName()` 而非传入的 `bucketName`。**建议**: 使用传入参数。

17. **[P1-017] AI run.py DB 连接失败不阻止启动** — `AI/run.py:305-313` — 数据库连接失败 catch Exception 但不 re-raise，Flask 启动后所有路由 500。**建议**: 启动失败应退出进程。

18. **[P1-018] AI run.py Nacos 注册失败静默降级** — `AI/run.py:460-462` — Nacos 失败时设置 `app.nacos_client = None`，心跳线程永不运行，服务静默从注册中心消失。

19. **[P1-019] AI deploy_daemon.py 无限制重试** — `AI/app/services/deploy_daemon.py:288-294` — 异常后 sleep 10 秒无限重试，无 max retry 或熔断。

20. **[P1-020] GB28181 ZLMediaKit webhook 端点未鉴权** — `DEVICE/iot-device/.../SecurityConfiguration.java:30-31` (.antMatchers("/index/hook/**").permitAll())、`DEVICE/iot-gb28181/.../WebSecurityConfig.java:99-100`。**建议**: hook 端点加签名验证。

21. **[P1-021] GB28181 App API 全局 permitAll** — `DEVICE/iot-common/.../YudaoWebSecurityConfigurerAdapter.java:142` — `.antMatchers(buildAppApi("/**")).permitAll()`。**建议**: 收紧具体路径。

22. **[P1-022] VIDEO Kafka Producer 消息丢失无 DLQ** — `VIDEO/app/services/alert_hook_service.py:698-709` — Kafka send() 失败时设置 `_producer = None`，当前消息永久丢失。

23. **[P1-023] iot-message multipart 配置冲突** — application.yaml=16MB vs bootstrap.yaml=500MB，加载顺序不确定。**建议**: 统一配置。

24. **[P1-024] iot-file MinIO 上传无 MIME 类型校验** — 绕过 `FileUploadUtils` 安全校验，MinioSysFileServiceImpl 直接接受任何文件。**建议**: 添加 MIME 白名单 + 文件头魔数校验。

25. **[P1-025] iot-sink SnapshotAlertConsumer 非原子 dedup 清理** — `DEVICE/iot-sink/.../SnapshotAlertConsumer.java:94-113` — `entrySet().forEach()` + `.remove()` 非原子，并发可导致漏删或漏处理。**建议**: 使用 `keySet().removeIf()` 或 `compute` 模式。

26. **[P1-026] iot-sink SnapshotAlertConsumer 默认 dedup 保留 1ms** — `DEVICE/iot-sink/.../SnapshotAlertConsumer.java:61-62` — `retentionMs = 1` 极短，若改为长值则 dedup map 无界增长 OOM。**建议**: 限制 map 最大大小。

27. **[P1-027] GB28181 密码可能双重 BCrypt 加密** — `DEVICE/iot-gb28181/.../DefaultUserDetailsServiceImpl.java:39` — 从 DB 取密码后再过 `SecurityUtils.encryptPassword()`。若 DB 已存 BCrypt hash 则认证必失败。**建议**: 确认 DB 密码存储方式。

28. **[P1-028] AI deploy.py check_heartbeat_timeout 双重吞异常** — `AI/app/blueprints/deploy.py:763-787` — try 中 catch Exception 日志，rollback 中 bare `except: pass`，双重吞异常。

### P2 (计划修)

1. **[P2-001] AI 模块 12 处 tempfile.NamedTemporaryFile(delete=False) 无清理** — export.py:602,642、model.py:724、auto_label.py:250 等 — 文件上传/下载产生的临时文件永不删除。**建议**: 使用 `@after_this_request` 注册清理回调。

2. **[P2-002] AI get_model_size() 返回硬编码假数据** — `AI/app/blueprints/model.py:660-664` — 固定返回 `1.02 MB`。**建议**: 读取实际文件大小。

3. **[P2-003] AI ocr_service get_performance_metrics 引用不存在的属性** — `AI/app/services/ocr_service.py:556-569` — `self.ocr_engine` 等属性不存在，运行时抛 AttributeError。

4. **[P2-004] AI speech_service 类型注解错误** — `AI/app/services/speech_service.py:250,586-587` — `language: "cn"` 字符串字面量作为类型注解。

5. **[P2-005] AI docker-entrypoint.sh NVIDIA 库路径脆弱** — inline python 代码解析 site-packages 路径，PyTorch 版本变化可能失效。

6. **[P2-006] AI multiprocessing.set_start_method('spawn', force=True) 在模块级** — `AI/run.py:28-47` — 在 import 时强制修改全局 multiprocessing 设置。

7. **[P2-007] iot-file ThreadPoolExecutor 泄漏** — `MinioSysFileServiceImpl.java:351,458,530` — 每次分块上传/下载创建新线程池，awaitTermination 仅 3 秒可能超时泄漏。

8. **[P2-008] iot-message FileServiceImpl 无文件大小校验** — `DEVICE/iot-message/iot-message-biz/.../FileServiceImpl.java:172-186` — `checkFileSize()` 方法存在但从未调用。

9. **[P2-009] 前端 VITE_DEV_PATH / VITE_PRO_PATH 未定义** — `WEB/src/api/axios.ts:7` — 两个环境变量在所有 .env 文件中均缺失，visualization 设计器的 secondary axios 实例 baseURL 为 undefined。

10. **[P2-010] 前端 SkyWalking 页面硬编码公网 IP** — `WEB/src/views/infra/skywalking/index.vue:4` — `http://47.97.32.241:8888/skywalking/`。

11. **[P2-011] 前端 .env.development 泄露生产 IP** — `WEB/.env.development:15,21,26` — `47.97.32.241:48080`。

12. **[P2-012] Token URL 参数传递（WebSocket 外也启用）** — `DEVICE/iot-common/iot-common-security/.../TokenAuthenticationFilter.java:62-63` + `SecurityProperties.java:28`。**建议**: 仅对 WebSocket 启用。

13. **[P2-013] GB28181 SessionCreationPolicy.ALWAYS 而非 STATELESS** — `DEVICE/iot-gb28181/.../WebSecurityConfig.java:111`。**建议**: 改为 STATELESS。

14. **[P2-014] GB28181 JWT KeyID 硬编码** — `DEVICE/iot-gb28181/.../JwtUtils.java:55` — 固定 UUID。**建议**: 移至配置。

15. **[P2-015] GB28181 RSA 密钥自动生成到可预测路径** — `DEVICE/iot-gb28181/.../JwtUtils.java:183-228` — 写入 `./config/jwk.json`。**建议**: 路径从配置读取，限制文件权限。

16. **[P2-016] AES ECB 模式** — `DEVICE/iot-common/iot-common-base/.../AesUtils.java:91` — ECB 不隐藏数据模式。**建议**: 改用 GCM 或 CBC+IV。

17. **[P2-017] 前端 v-html 渲染 LLM 输出（虽有 DOMPurify）** — `WEB/src/views/train/components/AiModelTool/index.vue:203,234`、`VisionInferenceModal.vue:79` — DOMPurify 存在历史绕过漏洞。**建议**: 使用 Markdown 组件替代，保持 DOMPurify 最新。

18. **[P2-018] iot-sink AlertServiceImpl MinIO 清理全局锁阻塞** — `DEVICE/iot-sink/.../AlertServiceImpl.java:90,770-805` — 5 秒等待期阻塞所有设备的告警图片上传。**建议**: 改用 per-bucket 或 per-device 锁。

19. **[P2-019] 前端 gb28181.ts 不设 X-Authorization Header** — `WEB/src/api/device/gb28181.ts:19-32` — 仅该模块跳过认证头。**建议**: 统一添加认证头或文档化差异。

20. **[P2-020] iot-file LocalSysFileServiceImpl 是完全空壳** — 除 `uploadFile()` 外所有方法返回 null/false/""，却注册为 `@Service` Bean。

21. **[P2-021] iot-file ResourcesConfig.java CORS wildcard** — `DEVICE/iot-file/iot-file-biz/.../ResourcesConfig.java:50` — `.allowedOrigins("*")` 虽仅 GET，但文件服务不需跨域。**建议**: 限制 origin。

22. **[P2-022] 前端 debugger 残留** — `WEB/src/api/device/devices.ts` — 7 处 `// debugger;` 注释。**建议**: 清理。

23. **[P2-023] AI speech_service session 挂载 HTTP adapter 但 API 为 HTTPS** — `AI/app/services/speech_service.py:63-64` — `session.mount("http://"...)` 但讯飞 API 为 `https://raasr.xfyun.cn`。**建议**: 替换为 HTTPS mount。

24. **[P2-024] iot-device20 数据库被 3 个服务共享写** — device/sink/dataset 共写同一 DB 表无分布式锁。**建议**: 明确 device 表归属服务。

### P3 (监控)

1. **[P3-001] Fastjson 1.2.83** — 生态不推荐。**建议**: 迁移至 Fastjson2 或 Jackson。

2. **[P3-002] JSch 0.1.55 已停更** — `DEVICE/iot-parent/pom.xml`。**建议**: 替换为 `com.github.mwiede:jsch`。

3. **[P3-003] Apache POI 4.1.2 / Commons-FileUpload 1.4 CVE** — 处理 Office 文件存在 XXE/DoS 风险。**建议**: POI→5.2+, FileUpload→1.5。

4. **[P3-004] 前端登录错误消息原样展示** — `WEB/src/views/base/login/LoginForm.vue:112` — 服务端异常原样弹窗。**建议**: 脱敏。

5. **[P3-005] GB28181 RSA KeyID 硬编码** — 虽非直接秘密但降低审计能力。**建议**: 移至配置。

6. **[P3-006] Nginx sub_filter SkyWalking 路径重写** — 仅对 text/html 生效，JS 动态构建的 API 请求可能路径错误。**建议**: 监控 SkyWalking 升级兼容性。

7. **[P3-007] iot-sink Yudao token secret 残留** — `DEVICE/iot-sink/iot-sink-biz/src/main/resources/application-*.yaml` — 3 处 `secret: yudaoIotGatewayTokenSecret123456789`。**建议**: 改为独立随机值。

8. **[P3-008] AI nvidia_lib_path.py 在 import 时修改 os.environ** — `AI/app/utils/nvidia_lib_path.py:34` — 模块级副作用。**建议**: 改为显式初始化调用。

### 维度 3 总结

31 个 P0 覆盖认证鉴权（AI 零鉴权、Device permitAll、InnerAuth 绕过、Mock 登录）、SQL 注入（alert_service.py f-string SQL）、密钥泄露（Nacos 密码 60+处、AES 密钥、GPUStack 密码、讯飞 API Key）、功能断裂（108 个 API 无后端、告警链路静默失效）、代码质量（17 处 bare except、12 处无锁全局状态、多重 @RequestBody 不可用 API）。**多数 P0 均非新发现——上次 10 个 P0 无一修复。**

---

## 优先修复建议

按依赖关系和风险严重程度排序：

### 第一阶段: 安全保障（2 小时内）

1. **P0-028 + P0-007** — 将所有 .env 文件加入 .gitignore，在云平台 revoke 已泄露的 API Key/密码（DashScope、讯飞、Nacos、PostgreSQL、MinIO），生成新密钥 → **阻止外部利用**
2. **P0-005 + P0-006 + P0-010** — 将 yaml 中的 Nacos 密码改为环境变量 `${NACOS_PASSWORD}`，移除 AesUtils.java 硬编码 AES 密钥，移除 GPUStack 密码 → **消除源码泄露**
3. **P0-001 + P0-018** — 为 AI 模块和 alert_service.py 添加 JWT Token 验证中间件 → **保护 21+ 个开放 API**
4. **P0-003** — 移除 Device 模块 `/**` permitAll → **关闭最大鉴权后门**
5. **P0-004** — 收紧 CORS wildcard → **防御 CSRF**

### 第二阶段: 功能修复（本周）

6. **P0-019** — 补齐 inspection 模块 Java 后端（17 个端点）、indicatorApi（6个）、model Gateway 路由（47个）→ **demo 可用**
7. **P0-020** — 修复 iot-sink/iot-message 服务状态，确保告警链路通畅 → **告警功能恢复**
8. **P0-014 + P0-016 + P0-017** — 修复 iot-message base-package、iot-infra RocketMQ 地址、Nacos namespace → **服务注册配置正确**
9. **P0-002** — 修复 alert_service.py SQL 注入 → **数据库安全**
10. **P0-011 + P0-012 + P0-013** — 修复 iot-file 凭证泄露、不可用 API、硬编码 IP → **文件服务可用**

### 第三阶段: 依赖升级 + 债务清理（2 周内）

11. **P1-005 ~ P1-008** — Spring Boot、Jackson、Netty、Fastjson 升级规划
12. **P0-022** — AI 模块全局状态加锁
13. **P0-023 + P0-024** — 前端 new Function() 移除 + JWT URL 泄露修复
14. **P0-025** — InnerAuth 加签名
15. 其余 P1 问题

### 第四阶段: 持续改善（1 个月内）

16. 所有 P2 问题
17. 所有 P3 问题

---

## 附录：上次 P0 修复验证

| 上次编号 | 问题 | 上次状态 | 本次状态 | 证据 |
|----------|------|----------|----------|------|
| F7.1 | AES/SM4 硬编码密钥 | P0 | **未修复** | AesUtils.java:53 仍在 |
| F7.2 | MyBatis encryptor/SSL 密码硬编码 | P0 | **未修复** | application.yaml:61,77,101 仍在 |
| F7.3 | 云 API Key 在 .env 文件中 | P0 | **未修复** | AI/.env 仍在 Git |
| F7.4 | 数据库/中间件密码全环境一致 | P0 | **未修复** | 所有 application-*.yaml 相同密码 |
| F7.5 | 微信/DingTalk Secret 泄露 | P0 | **未修复** | application-*.yaml 明文 Secret |
| F1.2 | BCrypt passwordEncoderLength=4 | P0 | **未修复** | SecurityProperties.java:50 |
| F1.3 | Mock 登录绕过 | P0 | **未修复** | TokenAuthenticationFilter.java:126-138 |
| F2.1 | Device `/**` permitAll | P0 | **未修复** | SecurityConfiguration.java:32 |
| F3.1 | StreamProxyProvider SQL 注入 | P0 | **未修复** | StreamProxyProvider.java:22,30-31 |
| F5.1 | CORS wildcard+credentials | P0 | **未修复** | YudaoWebAutoConfiguration.java:86-89 |

**结论: 10/10 P0 问题无一修复。**
