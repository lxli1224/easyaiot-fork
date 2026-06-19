# D2 架构 审查报告

## TL;DR

10 个 Spring Cloud 微服务 + 17 个公共模块组成四层架构 (WEB/Gateway/Biz/API)，无 Maven 依赖循环。但存在 3 个 P0 级问题：Nacos namespace 全部错配 (dev 用 local、prod 用 dev)、iot-message 的 base-package 配置错误 (指向 device 而非 message)、iot-infra 生产环境 RocketMQ 地址写死 localhost。此外还有 API 网关死路由、跨库双写冲突、MinIO 属性碎片化等配置漂移严重问题。总体风险等级：**P0**。

---

## 详细发现

### F2.1 Nacos Namespace 全部错配 (P0)

- **位置**: 10 个服务的 `bootstrap-dev.yaml` 和 `bootstrap-prod.yaml`
- **现状**:
  - `bootstrap-dev.yaml`: `discovery.namespace: local` / `config.namespace: local`
  - `bootstrap-prod.yaml`: `discovery.namespace: dev` / `config.namespace: dev`
  - 注释写 "这里使用 dev 开发环境"，但实际 namespace 值与环境名不匹配
- **风险**: 所有服务的 dev 环境从 Nacos namespace `local` 拉配置，prod 环境从 Nacos namespace `dev` 拉配置。如果 Nacos 上按环境建了正确的 namespace (dev / prod)，服务将永远拿不到正确的远程配置，fallback 到本地 yaml。一旦有人在 Nacos 上改了 `local` 或 `dev` namespace 的配置，所有环境一起受影响。
- **建议**:
  - `bootstrap-dev.yaml`: `discovery.namespace: dev` / `config.namespace: dev`
  - `bootstrap-prod.yaml`: `discovery.namespace: prod` / `config.namespace: prod`
  - 同步确保 Nacos 服务端已创建对应的 dev / prod namespace
- **证据**:
  - `DEVICE/iot-system/iot-system-biz/src/main/resources/bootstrap-dev.yaml`:6 (namespace: local)
  - `DEVICE/iot-system/iot-system-biz/src/main/resources/bootstrap-prod.yaml`:6 (namespace: dev)
  - 其余 9 个服务同理

### F2.2 iot-message base-package 配置错误 (P0)

- **位置**: `DEVICE/iot-message/iot-message-biz/src/main/resources/application.yaml`:147
- **现状**: `iot.info.base-package: com.basiclab.iot.device`
- **风险**: 该值注入 `mybatis-plus.type-aliases-package`，解析为 `com.basiclab.iot.device.dal.dataobject`。message 服务的 MyBatis 类型别名解析到 device 模块的包，可能导致 Entity 映射失败、Swagger 扫描错误包。
- **建议**: 修改为 `com.basiclab.iot.message`
- **证据**: 对比 iot-device 的同一字段为 `com.basiclab.iot.device` (正确)，message 服务显然是从 device 复制后未修改。

### F2.3 iot-infra 生产环境 RocketMQ name-server 错误 (P0)

- **位置**: `DEVICE/iot-infra/iot-infra-biz/src/main/resources/application-prod.yaml` (rocketmq.name-server 配置)
- **现状**: `rocketmq.name-server: 127.0.0.1:9876`
- **风险**: 所有其他服务 prod 环境均配置 `10.0.0.87:9876`。infra 服务在 prod 会尝试连接 localhost 的 RocketMQ，导致消息发送全部失败。
- **建议**: 改为 `10.0.0.87:9876`
- **证据**:
  - iot-infra application-prod.yaml (127.0.0.1)
  - iot-system / iot-device / iot-message 等 application-prod.yaml (10.0.0.87)

### F2.4 API 网关 Knife4j 聚合死路由: gb28181-server (P1)

- **位置**: `DEVICE/iot-gateway/src/main/resources/application.yaml`:115-117
- **现状**: Knife4j 聚合配置了 `gb28181-server` 指向 `iot-gb28181` 服务，URL 为 `/admin-api/gb28181/v3/api-docs`。但网关路由表中无 `/admin-api/gb28181/**` 的路由 (已注释，注释说明由 Nginx mock 处理)。Swagger UI 聚合页面对该服务返回 404。
- **建议**: 删除或注释该 Knife4j 条目，或在网关中恢复 gb28181 路由。
- **证据**: 网关 application.yaml:93-97 注释确认 4 个服务由 Nginx 处理，但 Knife4j 聚合却仍然包含 gb28181。

### F2.5 跨库双写冲突: iot-message 与 iot-sink 共写 alert 表 (P1)

- **位置**:
  - `DEVICE/iot-sink/iot-sink-biz/src/main/java/com/basiclab/iot/sink/dal/mapper/AlertMapper.java`:19 (`@DS("video")`)
  - `DEVICE/iot-message/iot-message-biz/src/main/java/com/basiclab/iot/message/mapper/AlertMapper.java`:19 (`@DS("video")`)
- **现状**: 两个服务都通过 `@DS("video")` 连接到 `iot-video20` 数据库的 `alert` 表，都有 `insert()` 和 `updateImagePath()` 操作。同一个 alert 记录可能被两个服务并发更新 `image_url` 字段。
- **风险**: 写写冲突 → 数据竞争，image_path 被覆盖。
- **建议**:
  - 明确 alert 表的归属服务 (生产者唯一写入，消费者只读)
  - 或使用数据库行锁 / 乐观锁 (version 字段) 防并发覆盖
  - 或引入 Kafka 消息队列解耦，由一个服务负责落库
- **证据**: 两个 AlertMapper.java 内容几乎一致 (拷贝)，两个 AlertMapper.xml 操作同一张 alert 表。

### F2.6 iot-message Kafka Alert 主题名不一致 (P1)

- **位置**:
  - `DEVICE/iot-message/iot-message-biz/src/main/resources/application.yaml` (base): `alert-notification.topic: iot-alert-notification`
  - `DEVICE/iot-message/iot-message-biz/src/main/resources/application-dev.yaml` / `application-prod.yaml`: `alert-notification.send-topic: iot-alert-notification-send`
- **现状**: 生产者往 `iot-alert-notification-send` topic 发消息，消费者订阅 `iot-alert-notification` topic。两者不同名。
- **风险**: alert 消息永远投递失败，告警通知功能静默失效。
- **建议**: 统一为一个 topic 名，或明确 send-topic 和 consume-topic 的使用边界。

### F2.7 iot-message dev 环境数据库主机不一致 (P1)

- **位置**: `DEVICE/iot-message/iot-message-biz/src/main/resources/application-dev.yaml` (datasource.master)
- **现状**: `jdbc:postgresql://iot.basiclab.top:5432/...`，而所有其他服务 dev 环境均使用 `14.18.122.2`
- **风险**: message 服务在 dev 环境连接到不同的数据库服务器，可能操作的是过期/错误的数据库。
- **建议**: 统一为 `14.18.122.2`

### F2.8 iot-sink 手动 DataSource 切换 + 原始 JDBC (P1)

- **位置**: `DEVICE/iot-sink/iot-sink-biz/src/main/java/com/basiclab/iot/sink/service/impl/AlertServiceImpl.java`:383, 395, 1114, 1177
- **现状**: 使用 `DynamicDataSourceContextHolder.push("video")` / `.clear()` 模式手动切换数据源，再用 `jdbcTemplate.queryForList()` 执行原始 SQL join。
- **风险**:
  1. 如果异常抛出时 `.clear()` 未执行 (缺少 try/finally)，线程上下文被污染，后续请求可能跑到错误的数据库。
  2. 原始 SQL 绕过 MyBatis/ORM 的类型安全和索引推荐。
- **建议**:
  - 改用 `@DS("video")` 注解 + MyBatis Mapper (如 AlertMapper)
  - 如必须用 JdbcTemplate，确保 `DynamicDataSourceContextHolder.clear()` 在 finally 块中执行
- **证据**: AlertServiceImpl.java 1114-1121 存在 `INNER JOIN algorithm_task_device` 的硬编码 SQL。

### F2.9 Kafka 序列化方式不统一 (P2)

- **位置**: 各服务 application.yaml 中 `spring.kafka` vs `spring.kafka.iot` 配置段
- **现状**:
  - system/infra/file/tdengine/dataset/message/gateway: `JsonSerializer` / `JsonDeserializer` (标准 Spring Kafka)
  - device/sink/gb28181: `StringSerializer` / `StringDeserializer` (使用 `spring.kafka.iot.*` 自定义命名空间)
- **风险**:
  1. 自定义 `spring.kafka.iot` 命名空间**不被 Spring Boot 自动配置识别**，这些服务需要手动创建 KafkaTemplate / ConsumerFactory Bean
  2. 如果同一 topic 被 Json 端和 String 端同时消费，消息格式不兼容
- **建议**: 统一使用标准 `spring.kafka` 命名空间 + JsonSerializer。如确有字符串传输需求，明确区分 topic 并文档化。

### F2.10 MinIO 配置结构碎片化 (P2)

- **位置**: 各服务 application.yaml 中 minio 配置段
- **现状**: 存在三种互不兼容的 MinIO 属性结构:
  - **结构 A** (message): `minio.endpoint` / `minio.port` / `minio.accessKey` / `minio.secretKey` / `minio.bucketName`
  - **结构 B** (file, sink): `minio.url` / `minio.downloadUrl` / `minio.accessKey` / `minio.secretKey` / `minio.bucketName`
  - **结构 C** (device, gb28181): `minio.endpoint` / `minio.user` / `minio.password`
- **风险**: Nacos 无法提供统一的 MinIO 共享配置。开发者需要为每种结构单独维护配置，容易遗漏导致连接到错误的 MinIO 实例。
- **建议**: 统一 MinIO 属性结构到一种格式，利用 `@ConfigurationProperties` 的 prefix 统一注入。

### F2.9 数据库共享冲突: iot-device20 被多个服务操作 (P2)

- **位置**:
  - `iot-device` DeviceMapper: `DEVICE/iot-device/iot-device-biz/src/main/java/com/basiclab/iot/device/dal/pgsql/device/DeviceMapper.java`
  - `iot-sink` DeviceMapper: `DEVICE/iot-sink/iot-sink-biz/src/main/java/com/basiclab/iot/sink/dal/mapper/DeviceMapper.java`
- **现状**: device、sink、dataset 三个服务的主数据源都是 `iot-device20`。sink 有自己的 DeviceMapper、AppMapper 直接读写 device 的 core 表。
- **风险**: 两个独立服务同时修改 `device` / `app` 表，无分布式锁保护。
- **建议**: 明确 device 表只由 iot-device 服务写入，sink 如需修改通过 Feign 调用 device API 或发送 MQ 消息。

### F2.11 PROD 环境缺少 Redis Lettuce 连接池配置 (P2)

- **位置**: system/infra/file/message/gb28181/tdengine/device/sink 的 `application-prod.yaml`
- **现状**: dev 环境配置了 `spring.redis.lettuce.pool.*` (max-active, max-idle, min-idle, max-wait 等)，但 prod 环境缺失。
- **风险**: 生产环境使用默认 Lettuce 连接池参数，可能与预期不同，导致 Redis 连接耗尽或性能下降。
- **建议**: 为 prod 环境补充 lettuce pool 配置，且值应高于 dev (生产流量更大)。

### F2.12 iot-gb28181 dev 环境 Redis DB 索引与其他服务不同 (P2)

- **位置**: `DEVICE/iot-gb28181/iot-gb28181-biz/src/main/resources/application-dev.yaml`
- **现状**: gb28181 dev 使用 Redis DB 7，其余所有服务 dev 使用 DB 0
- **风险**: 运维/开发人员按其他服务的 DB 0 去查 Redis 数据时查不到 gb28181 的数据，误判为丢失。
- **建议**: 统一为 DB 0，或文档化各服务专用 Redis DB 索引。

### F2.13 公共模块向业务 API 泄露依赖 (P3)

- **位置**: 4 个 common 模块的 pom.xml
- **现状**:
  - `iot-common-web`: 依赖 `iot-system-api` + `iot-infra-api`
  - `iot-common-security`: 依赖 `iot-system-api`
  - `iot-common-data-permission`: 依赖 `iot-system-api`
  - `iot-common-excel`: 依赖 `iot-system-api`
- **风险**: "公共"层不独立，引入了对特定业务服务 API 的编译期耦合。任何引入 common-web 的服务都间接依赖 system-api。
- **建议**: 将公共模块依赖业务 API 的依赖标记为 `<optional>true</optional>`，由使用方显式引入。

### F2.14 iot-infra 残留 Yudao 旧项目名配置 (P3)

- **位置**: `DEVICE/iot-infra/iot-infra-biz/src/main/resources/application-*.yaml` 中 `yudao.*` 配置段
- **现状**: iot-infra 的 profile yaml 中仍包含 `yudao.xxx` 配置项 (旧项目名)
- **风险**: 配置命名不一致，新加入的开发者可能混淆。
- **建议**: 全局搜索 `yudao` 并迁移到 `iot` 或 `basiclab.iot` 前缀。

### F2.15 Multipart 文件上传大小不一致 (P3)

- **位置**: 各服务 `application.yaml` 和 `bootstrap.yaml` 中 `spring.servlet.multipart.max-file-size`
- **现状**:
  - gateway: 25MB / dataset: 25MB
  - gb28181: 10MB
  - system/infra/device/message/sink: 500MB (bootstrap 覆盖)
  - file: 500MB
- **风险**: gb28181 视频服务仅 10MB 上传限制明显不够。多规格不一致增加调试难度。
- **建议**: 按业务场景统一分档 (网关级 100MB 上限 + 文件服务 500MB + 视频 500MB)。

### F2.16 无 Maven 依赖循环 (正面发现)

- **范围**: 48 个 Maven 模块全部检查
- **结果**: **零循环依赖**。依赖方向符合 `BIZ → API → COMMON` 的正向分层。
- **唯一需关注**: `iot-tdengine-api → iot-device-api` 单向依赖，目前未形成反向依赖，但需持续关注。

---

## 修复优先级

### P0 - 立即修复
1. **F2.1**: 修正 10 个服务的 Nacos namespace 配置 (dev=dev, prod=prod)
2. **F2.2**: 修正 iot-message `base-package` (device → message)
3. **F2.3**: 修正 iot-infra 生产环境 RocketMQ 地址 (127.0.0.1 → 10.0.0.87)

### P1 - 本周修复
4. **F2.4**: 删除或修复 Knife4j gb28181-server 聚合条目
5. **F2.5**: 解决 iot-message 与 iot-sink 对 alert 表的双写冲突
6. **F2.6**: 统一 iot-message Kafka alert 主题名
7. **F2.7**: 修正 iot-message dev 数据库主机地址
8. **F2.8**: 重构 iot-sink 手动 DataSource 切换为 `@DS` 注解

### P2 - 计划修复
9. **F2.9**: 统一 Kafka 序列化方式为标准 spring.kafka + Json
10. **F2.10**: 统一 MinIO 配置属性结构
11. **F2.11**: 统一 iot-device20 数据库访问，消除 sink 直接写 device 表
12. **F2.12**: 为 PROD 环境补充 lettuce pool 配置

### P3 - 持续改善
13. **F2.13**: 修正 iot-gb28181 Redis DB 索引
14. **F2.14**: Common 模块业务 API 依赖加 optional 标记
15. **F2.15**: 清理 iot-infra Yudao 旧名配置
16. **F2.16**: 统一 multipart 上传大小配置

---

## 不在本维度范围

- F2.2 base-package 错误同时影响 Swagger → 关联 D6 (前端/Swagger 文档)
- F2.5/F2.9 跨库双写 → 关联 D4 (数据层索引/锁策略)
- F2.6 Kafka topic 不一致 → 关联 D7 (中间件)
- F2.8 iot-sink datasource 切换 → 关联 D3 (服务/部署健康检查)
- MinIO / Nacos credentials → 关联 D1 (安全审计 - 密钥泄露)
