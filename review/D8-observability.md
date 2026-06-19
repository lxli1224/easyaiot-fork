# D8 可观测性 审查报告

## TL;DR

SkyWalking 10.4.0 OAP + UI 通过 systemd 以裸 Java 进程运行，非容器化。**核心问题：全部 6 个业务服务 (iot-device/gateway/infra/inspection/model/system) 均未接入 SkyWalking Agent**，segment 表无任何 trace 数据，SkyWalking 处于「运行但空转」状态。依赖 pom.xml 声明 agent 8.12.0 与服务端 10.4.0 版本不匹配。UI 启动依赖 OAP 就绪但无健康等待，重启时有 18080 端口死锁风险。告警 webhook 全部注释，无实际通知。数据库凭证硬编码。

**风险等级: P0**

---

## 详细发现

### F8.1 Agent 未接入任何业务服务 —— 零可观测性 (P0)

- **位置**: 生产服务器 47.97.32.241 全部 6 个 systemd 业务服务
- **现状**: 
  - `ps aux | grep java` 在所有业务 JVM 中均无 `-javaagent` 参数
  - 各服务 `/etc/systemd/system/iot-*.service` 无 SkyWalking 相关环境变量
  - `DEVICE/docker-compose.yml:18-24` 中 SkyWalking agent 挂载和 `JAVA_TOOL_OPTIONS` 全部被注释
  - `/data/skywalking/skywalking-agent/` 目录不存在，无 agent jar
  - PostgreSQL `segment_20260617` 表: **0 行**，`alarm_record_20260617` 表: **0 行**
- **风险**: 系统无任何分布式追踪、服务拓扑、性能指标、JVM 监控能力。故障定位完全依赖手动查日志。
- **建议**: 
  1. 下载 SkyWalking Java Agent 10.4.0 (`apache-skywalking-java-agent-10.4.0.tgz`) 到 `/data/skywalking/`
  2. 编辑各 `/etc/systemd/system/iot-*.service`，在 `[Service]` 段添加:
     ```
     Environment="JAVA_TOOL_OPTIONS=-javaagent:/data/skywalking/skywalking-agent/skywalking-agent.jar"
     Environment="SW_AGENT_NAME=iot-{service}"
     Environment="SW_AGENT_COLLECTOR_BACKEND_SERVICES=127.0.0.1:11800"
     ```
  3. 逐服务 `systemctl daemon-reload && systemctl restart iot-{service}`
  4. 同步更新 `DEVICE/docker-compose.yml` 取消注释 agent 配置，修正 `SW_AGENT_COLLECTOR_BACKEND_SERVICES`

### F8.2 Agent 版本与服务端不匹配 (P0)

- **位置**: `DEVICE/iot-parent/pom.xml:57`
- **现状**: `<skywalking.version>8.12.0</skywalking.version>` — Maven 依赖使用 8.12.0 agent API，但服务端运行 SkyWalking OAP 10.4.0。
- **风险**: Agent 8.x 协议与 OAP 10.x 不完全兼容 (10.x 使用新版 gRPC 协议)。即使未来接入 agent，trace 数据可能丢失或格式错误。
- **建议**: 将 pom.xml 中 `skywalking.version` 升级至 `10.4.0`，并重新构建所有依赖该 agent API 的模块。

### F8.3 OAP/UI 启动依赖脆弱，重启死锁风险 (P1)

- **位置**: `/etc/systemd/system/skywalking-ui.service`, `/etc/systemd/system/skywalking-oap.service`
- **现状**:
  - UI unit 配置 `Requires=skywalking-oap.service` + `After=skywalking-oap.service`
  - 但 systemd 判断 OAP "started" 仅基于 ExecStart 命令返回，不等 Java 进程完成端口绑定
  - `ExecStop=/bin/kill -15 $MAINPID` — SIGTERM 后 JVM shutdown hook 可能超 10s (`RestartSec=10`)，旧进程未释放 18080 就启动新进程 → **Address already in use**
  - UI 日志确认重启时存在连接拒绝循环: `Connection refused: localhost/127.0.0.1:12800`
  - OAP 与 UI 于 2026-06-07 同时启动 (PID 91955/91956)，无启动间隔检查
- **风险**: 系统重启或 OAP crash 后 UI 可能反复 fail-restart 死锁，SkyWalking UI 不可用。
- **建议**:
  1. 在 `ExecStartPre` 中添加健康检查等待:
     ```
     ExecStartPre=/bin/bash -c 'for i in {1..30}; do curl -sf http://127.0.0.1:12800/healthCheck && break || sleep 2; done'
     ```
  2. `RestartSec` 改为 30s 给 JVM 足够停机时间
  3. 部署脚本增加 `fuser -k 18080/tcp` 强制释放端口（仅限手动重启场景）

### F8.4 告警规则存在但 webhook 全部禁用 —— 无实际通知 (P1)

- **位置**: `/opt/apache-skywalking-apm-bin/config/alarm-settings.yml`
- **现状**:
  - 配置了 6 条告警规则 (响应时间、SLA、数据库访问等)，格式正确
  - webhook/wechat/dingshi/feishu 全部以 `#` 注释，无一启用
  - 无恢复通知 (`recovery-urls` 全部注释)
- **风险**: 即使 agent 接入后产生告警，运维人员完全不知情，丧失可观测性核心价值。
- **建议**: 根据通知渠道选择其一并启用:
  ```yaml
  hooks:
    webhook:
      default:
        is-default: true
        urls:
          - http://<告警接收服务地址>/alarm
        recovery-urls:
          - http://<告警接收服务地址>/alarm-recovery
  ```

### F8.5 无外部指标采集 —— OAP 自监控缺失 (P1)

- **位置**: 生产服务器无 Prometheus/Grafana 实例
- **现状**:
  - OAP 已暴露 Prometheus 指标端点 `:1234` (telemetry 模块)
  - OAP 已启动 PromQL API 端口 `:9090` 
  - 无任何外部 Prometheus 实例抓取这些指标
  - 无 Grafana 可视化仪表盘 (端口 3000 未监听)
  - 多个 `:30000-30009` 端口监听但为未知 docker-proxy
- **风险**: OAP 自身的 JVM 内存、GC、存储延迟、gRPC 吞吐等核心指标无人监控，OAP 性能退化无法感知。
- **建议**: 部署 Prometheus + Grafana 容器，配置抓取 `47.97.32.241:1234` 和 `47.97.32.241:9090`，导入 SkyWalking OAP 监控面板。

### F8.6 OAP 配置中数据库凭证硬编码 (P0)

- **位置**: `/opt/apache-skywalking-apm-bin/config/application.yml` storage.postgresql 段
- **现状**: JDBC URL、用户名密码明文硬编码在配置文件中。非通过环境变量 `${SW_JDBC_URL}` 等注入。
- **风险**: 凭证泄露风险。与 EasyAIoT 其他服务使用环境变量注入的实践不一致。
- **建议**: 改用环境变量方式 (application.yml 已定义默认环境变量映射但未生效):
  ```yaml
  storage:
    postgresql:
      properties:
        jdbcUrl: ${SW_JDBC_URL:"jdbc:postgresql://127.0.0.1:5432/skywalking"}
        dataSource.user: ${SW_DATA_SOURCE_USER:postgres}
        dataSource.password: ${SW_DATA_SOURCE_PASSWORD}
  ```
  通过 systemd unit 的 `Environment=` 或 systemd EnvironmentFile 注入凭证。

### F8.7 Web 前端 SkyWalking 链接使用硬编码 IP (P2)

- **位置**: `WEB/src/views/infra/skywalking/index.vue:4`
- **现状**: `const url = 'http://47.97.32.241:8888/skywalking/'` — 硬编码公网 IP
- **风险**: IP 变更时前端需重新构建；若内网部署则无此入口。
- **建议**: 使用相对路径或通过后端配置项动态返回，参考 `.scripts/postgresql/ruoyi-vue-pro10.sql:16480` 中已存在的 `url.skywalking` 系统参数。

### F8.8 日志轮转仅按大小，无时间维度保留策略 (P3)

- **位置**: `/opt/apache-skywalking-apm-bin/config/log4j2.xml`
- **现状**: `SizeBasedTriggeringPolicy size="102400KB"` (100MB) × `max="30"` = 最大 3GB。日志目录当前 ~2.7GB，磁盘使用 69%。
- **风险**: 若 trace 数据量增大后 OAP 自日志增长，无按天清理策略可能导致磁盘打满。
- **建议**: 添加 `TimeBasedTriggeringPolicy` + 降低 `max` 为 7 天，或使用 logrotate 外挂管理。

### F8.9 Trace 采样策略默认 100% (P3)

- **位置**: `/opt/apache-skywalking-apm-bin/config/trace-sampling-policy-settings.yml`
- **现状**: `rate: 10000` (100% 全量采样)
- **风险**: 当前无 agent 无影响。一旦接入后，全量采样可能导致 PostgreSQL 存储快速增长、OAP 内存压力增大。
- **建议**: 在 agent 接入前即配置采样策略，如:
  ```yaml
  default:
    rate: 1000  # 10% 采样
    duration: 500  # 慢请求 >500ms 全量保存
  ```

### F8.10 Nginx 代理 sub_filter 路径重写可能失效 (P3)

- **位置**: `/etc/nginx/conf.d/easyaiot.conf:180-191`
- **现状**: Nginx 通过 `sub_filter` 对 SkyWalking 静态资源路径做前缀注入 `/skywalking/`，使前端通过 `47.97.32.241:8888/skywalking/` 访问 UI。
- **风险**: sub_filter 仅对 `Content-Type: text/html` 生效，对 JS/CSS/json 中的路径引用无效。SkyWalking UI 为 SPA，JS 动态构建的 API 请求 (graphql) 可能路径错误。
- **建议**: 已验证功能正常工作（无用户报障），但需注意 SkyWalking 版本升级后 sub_filter 规则可能需调整。

---

## 修复优先级

| 优先级 | 编号 | 问题 | 行动 |
|--------|------|------|------|
| **P0** | F8.1 | 零 agent 接入 | 部署 agent 到全部 6 个业务服务 |
| **P0** | F8.2 | Agent 版本 8.12.0 vs 10.4.0 | 升级 pom.xml agent 依赖 + 使用 10.4.0 agent jar |
| **P0** | F8.6 | 数据库凭证硬编码 | 改用环境变量注入 |
| **P1** | F8.3 | 启动死锁风险 | 添加 ExecStartPre 健康检查 + RestartSec=30 |
| **P1** | F8.4 | 告警 webhook 禁用 | 启用至少一种告警通知渠道 |
| **P1** | F8.5 | 无外部指标采集 | 部署 Prometheus 抓取 OAP 自监控 |
| **P2** | F8.7 | 前端硬编码 IP | 改用动态配置 |
| **P3** | F8.8 | 日志仅按大小轮转 | 添加时间维度保留 |
| **P3** | F8.9 | 全量采样 | 接入前降采样 |
| **P3** | F8.10 | Nginx sub_filter | 监控升级兼容性 |

---

## 证据汇总

| 检查项 | 状态 | 证据 |
|--------|------|------|
| OAP 端口 11800 (gRPC) | 正常 | PID 91955, fd=367, 监听 `*:11800` |
| OAP 端口 12800 (REST) | 正常 | PID 91955, fd=371, 监听 `*:12800` |
| UI 端口 18080 | 正常 | PID 91956, fd=39, 监听 `*:18080` |
| Telemetry 1234 | 正常 | PID 91955, fd=304, 监听 `*:1234` |
| PromQL 9090 | 正常 | PID 91955, fd=384, 监听 `*:9090` |
| Agent 接入 | **未接入** | 全部 6 服务无 -javaagent 参数 |
| Agent jar | **不存在** | `/data/skywalking/` 目录不存在 |
| segment 数据 | **0 行** | `segment_20260617` count=0 |
| alarm_record 数据 | **0 行** | `alarm_record_20260617` count=0 |
| SkyWalking DB | 46 MB / 471 表 | PostgreSQL `skywalking` 库 |
| OAP JVM | -Xms256M -Xmx4096M | 运行 10 天，内存健康 |
| UI JVM | -Xms256M -Xmx1024M | 运行 10 天，内存健康 |
| OAP 日志错误 | 无 | 最近日志仅 TTL 清理 INFO |
| UI 日志错误 | 启动时连接拒绝 | 6/14 有 disconnect/reconnect 循环 |
| Alarm webhook | **全部禁用** | alarm-settings.yml hooks 全部注释 |
| Nginx proxy | 正常 | 8888 → 18080，sub_filter 重写 |
| 系统内存 | 14Gi total / 10Gi used / 4.5Gi avail | Swap 0B |

## 不在本维度范围

- OAP 使用的 PostgreSQL `skywalking` 库连接池和备份策略 → D4
- Nacos 集成配置 (OAP 已配置 nacos cluster/config 但使用 standalone) → D3
- nginx easyaiot.conf 其他 proxy 路由审查 → D2
