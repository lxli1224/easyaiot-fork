# D3 服务/部署 审查报告

## TL;DR
6 个核心 systemd unit 全部 running，但存在严重偏差：3 个 unit (gateway/infra/system) 未 enable、启动顺序依赖引用不存在的 service、JVM 堆配置与实际内存消耗严重不匹配 (256m 上限 vs 800M+ 实际)、/tmp 日志无轮转、健康检查端点不一致、部署流程无 systemd 侧自动化脚本。风险等级 **P1**。

---

## 详细发现

### F3.1 启动顺序依赖失效 (P1)
- **位置**: `/etc/systemd/system/iot-infra.service:6-7`, `/etc/systemd/system/iot-message.service:3-4`
- **现状**: iot-infra 引用 `After=network.target nacos-server.service postgres-server.service`，但 `nacos-server.service` 和 `postgres-server.service` 在系统中不存在。Nacos 实际运行在 `nacos-native.service`，PostgreSQL 在 `postgresql.service`。iot-message 引用 `redis.service` 和 `postgres-server.service` 同样不存在。
- **风险**: systemd 忽略不存在依赖，启动顺序完全无序。Nacos 未就绪时业务服务可能连不上注册中心，首次启动必失败靠重试恢复。
- **建议**: 改为正确的 unit 名称或移除无效引用。
  ```
  After=network.target nacos-native.service postgresql.service
  ```
- **复现/证据**: `systemctl list-units --type=service` 确认 nacos-server.service=not-found，postgres-server.service=not-found，redis.service=not-found。

### F3.2 3 个核心服务未 enable (P1)
- **位置**: `systemctl is-enabled` 输出
- **现状**: iot-gateway、iot-infra、iot-system 均 disabled。机器重启后这 3 个服务不会自动启动，业务直接中断。
- **风险**: 重启后需人工介入启动 3 个服务，无自动化恢复。
- **建议**: 
  ```bash
  systemctl enable iot-gateway iot-infra iot-system
  ```
- **复现/证据**: `systemctl is-enabled iot-gateway iot-infra iot-system` → disabled/disabled/disabled。

### F3.3 JVM 堆配置严重不足 (P1)
- **位置**: 各 systemd unit 的 ExecStart 行
- **现状**: device/infra/gateway 仅设 `-Xmx256m` (无 -Xms)，system 设 `-Xmx384m`。但实际 RSS 全部远超上限：

| 服务 | 配置 -Xmx | 实际 RSS | 峰值 RSS | 超标倍数 |
|------|----------|---------|---------|---------|
| iot-device | 256m | 780.6M | 812.5M | 3.0x |
| iot-infra | 256m | 888.4M | 1.0G | 3.5x |
| iot-system | 384m | 816.7M | 817.8M | 2.1x |
| iot-gateway | 256m | 476.7M | 581.7M | 1.9x |

  Docker Compose 中对应服务均为 `-Xms512m -Xmx512m`，说明 systemd 侧配置可能与预期不符。
- **风险**: -Xmx 仅限制堆内存，实际 RSS = 堆 + Metaspace + 线程栈 + Native。低 -Xmx 迫使频繁 Full GC，高峰期可能 OOM (实际已通过非堆内存撑过)。无 -Xms 导致启动后堆逐渐膨胀伴随 GC 停顿。
- **建议**: 至少对齐 docker-compose 标准，建议：
  ```
  -Xms512m -Xmx512m -XX:+UseG1GC
  ```
- **复现/证据**: `ps aux | grep java` 显示实际参数与 `systemctl status` RSS 对比。

### F3.4 无 GC 日志配置 (P2)
- **位置**: 所有 6 个 Java service unit
- **现状**: 无一配置 `-Xloggc` 或 `-XX:+PrintGCDetails`。对比 Nacos 有完整 GC 日志配置 (`-Xloggc:/home/nacos/logs/nacos_gc.log`)。
- **风险**: OOM/GC 问题无法回溯排查。
- **建议**: 增加 GC 日志（每个服务独立路径）：
  ```
  -Xloggc:/var/log/iot/device-gc.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M
  ```

### F3.5 日志写入 /tmp 无轮转 (P2)
- **位置**: 所有 6 个 service unit 的 StandardOutput/StandardError 行
- **现状**: 全部日志 append 到 `/tmp/*.log`。`/etc/logrotate.d/` 下无对应条目。当前日志总量约 393M 但持续增长。`/tmp` 在 69G 盘中，已用 46G。
- **风险**: 长期运行/tmp 打满；系统重启 /tmp 清空丢失日志。
- **建议**: 
  1. 迁移到 `/var/log/iot/` 保留日志
  2. 添加 logrotate 规则: daily, rotate 30, compress
  3. 或者在 spring boot 中配置 logback rolling policy

### F3.6 健康检查端点不一致 (P2)
- **位置**: 各服务 HTTP 端口健康检查结果
- **现状**:

| 服务 | 端口 | /actuator/health | 问题 |
|------|------|-----------------|------|
| gateway | 48080 | 404 | actuator 未暴露 |
| device | 48083 | UP ✓ | 正常 |
| infra | 48082 | UP ✓ | 正常 |
| inspection | 48088 | UP ✓ | 正常 |
| system | 48099 | 401 需登录 | 鉴权拦截 |
| model | 5000 | 404 | Flask 未配置 /health 路由 |

- **风险**: 无法统一通过 actuator 做健康探测。gateway 和 model 的健康状态无法自动化检查。
- **建议**: 
  1. Gateway 暴露 actuator (添加 spring-boot-starter-actuator，配置 `management.endpoints.web.exposure.include=health`)
  2. System 放开 `/actuator/health` 白名单
  3. Model (Flask) 添加 `/health` route

### F3.7 iot-model ExecStartPre 危险操作 (P2)
- **位置**: `/etc/systemd/system/iot-model.service:ExecStartPre`
- **现状**: `ExecStartPre=/usr/bin/env bash -c 'fuser -k 5000/tcp 2>/dev/null; sleep 2; true'` —— 启动前无条件 kill 端口 5000 上的任何进程。
- **风险**: 如果有其他服务误用 5000 端口会被误杀；掩盖了端口冲突问题。
- **建议**: 改为检测端口后仅报错退出，由运维处理；或将此操作移除、仅在 systemctl stop 后确保清理。

### F3.8 部署流程与 Docker 设计不匹配 (P2)
- **位置**: `/root/easyaiot-main/DEVICE/install_linux.sh` + systemd units
- **现状**: install_linux.sh 是为 Docker Compose 设计的自动化脚本（两阶段构建 + 容器化部署），但线上实际部署是 systemd 直接运行 JVM jar（baremetal）。两类部署参数差异大（如 docker 侧 -Xms512m -Xmx512m vs systemd 侧 -Xmx256m）。
- **风险**: 本地构建→rsync→systemctl restart 的流程没有统一的升级脚本，手动操作易遗漏单元。
- **建议**: 创建 systemd 侧升级脚本，或用 `systemctl restart $unit` 批量操作。保持与 docker-compose 的 JVM 参数一致。

### F3.9 iot-message unit 泄露敏感信息 (P1)
- **位置**: `/etc/systemd/system/iot-message.service:Environment`
- **现状**: systemd unit 中明文设置 `NACOS_LOGIN_PASSWORD` 和 `REDIS_PASSWORD` 环境变量。
- **风险**: 任何能读取 `/etc/systemd/system/` 的用户都可获取数据库/Redis 密码。
- **建议**: 使用 systemd EnvironmentFile 从受保护的配置文件读取（如 `/etc/iot/secrets.conf`，权限 600）。

### F3.10 iot-model unit 暴露数据库凭据和密钥 (P1)
- **位置**: `/etc/systemd/system/iot-model.service:Environment`
- **现状**: systemd unit 中明文包含 `DATABASE_URL`（含密码）、`MINIO_SECRET_KEY`、`SECRET_KEY`。
- **风险**: 数据库、MinIO、Flask secret 全部明文暴露。
- **建议**: 迁移到 EnvironmentFile（权限 600）。

### F3.11 LimitNOFILE 配置不一致 (P2)
- **位置**: 各 service unit
- **现状**: 仅 iot-inspection 设置了 `LimitNOFILE=65536`，其余 5 个服务未设置。
- **风险**: 高并发时可能触及默认文件描述符限制 (1024-4096)。
- **建议**: 所有 Java 服务统一添加 `LimitNOFILE=65536`。

### F3.12 3 个非核心服务处于 failed 状态 (P3)
- **位置**: iot-dataset, iot-file, iot-message (systemctl status)
- **现状**: 这 3 个附加服务 unit 处于 failed，但不影响当前 6 核心服务。iot-video 处于 inactive。
- **风险**: 如需启用这些功能模块，需排查启动失败原因。
- **建议**: 确认是否需要，不需要则 `systemctl disable --now` + 移除 unit 文件。

### F3.13 iot-inspection Restart 策略不一致 (P3)
- **位置**: `/etc/systemd/system/iot-inspection.service:Restart=always`
- **现状**: iot-inspection 使用 `Restart=always`，其他 5 个使用 `Restart=on-failure`。`always` 会在手动 stop 后也重启，运维不便。
- **建议**: 统一为 `Restart=on-failure` 或确认 iot-inspection 有特殊理由。

---

## 修复优先级

1. **P0 立即修**: (无 P0 致命问题)
2. **P1 本周**:
   - F3.2 核心服务 enable (3 个服务)
   - F3.3 JVM 堆配置对齐 docker-compose
   - F3.9 iot-message 敏感信息脱敏
   - F3.10 iot-model 敏感信息脱敏
3. **P2 计划**:
   - F3.1 启动顺序依赖修正
   - F3.4 GC 日志配置
   - F3.5 日志迁移 + 轮转
   - F3.6 健康检查端点统一
   - F3.7 model ExecStartPre 危险操作
   - F3.8 部署流程规范化
   - F3.11 LimitNOFILE 统一
4. **P3 监控**:
   - F3.12 非核心 failed 服务清理
   - F3.13 restart 策略统一

---

## 不在本维度范围

- 数据库连接池、慢查询 → D4 数据层
- Nacos/Redis/PostgreSQL 容器健康检查 → D7 中间件
- SkyWalking agent 接入状态 → D8 可观测性
- Kafka/MinIO 服务状态 → D7 中间件
- iot-inspection 日志中的 MyBatis 错误 → D2 架构 / D4 数据层
- 前端路由守卫 → D6 前端
