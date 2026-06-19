# D7 中间件 审查报告

## TL;DR

9 个 Docker 中间件容器整体运行正常，5 个有健康检查（均 healthy），**4 个缺失健康检查**（kafka/srs/nacos/postgres）。健康检查超时历史问题已通过 `/root/fix_healthcheck.py` 移除 `depends_on: service_healthy` 绕过，但未从根源修复。**关键风险**: 版本漂移（compose 与实际 4 处不一致）、3 种隔离网络碎片化、密码明文出现在 healthcheck 命令/日志中、RootFS 使用 69%（21G 剩余）、Kafka/Redis/TDEngine 均为单节点无高可用。**风险等级: P1**

---

## 1. 容器全景

| 容器 | 镜像 | 版本 | 运行时间 | 状态 | 健康检查 | CPU% | MEM | 网络 |
|------|------|------|----------|------|----------|------|-----|------|
| kafka-server | apache/kafka:3.7.0 | 3.7.0 | Up 7d | running | **缺失** | 1.55% | 963MiB (6.4%) | easyaiot-net (172.19.0.2) |
| srs-server | ossrs/srs:5 | 5.0.213 | Up 9d | running | **缺失** | 0.59% | 13.8MiB | host |
| nacos-server | nacos/nacos-server:v2.5.1 | v2.5.1 | Up 9d | running | **缺失** | 0.64% | 920.9MiB (6.1%) | host |
| postgres-server | postgres:18 | 18.4 | Up 9d | running | **缺失** | 0.06% | 139.7MiB | host |
| zlmediakit-server | zlmediakit/zlmediakit:master | master (eeb2693, 2026-06-04) | Up 4d | healthy | curl API | 3.08% | 13.7MiB | easyaiot-network (172.18.0.2) |
| tdengine-server | tdengine/tsdb:3.3.8.4 | 3.3.8.4 | Up 9d | healthy | taos select 1 | 1.73% | 90.6MiB | easyaiot-network (172.18.0.5) |
| emqx-server | emqx/emqx:5.8.7 | 5.8.7 | Up 9d | healthy | emqx ctl status | 1.02% | 202.4MiB | easyaiot-network (172.18.0.3) |
| minio-server | minio/minio:RELEASE.2025-04-22T22-12-26Z | 2025-04-22 | Up 9d | healthy | curl /health/live | 0.05% | 336.7MiB | easyaiot-network (172.18.0.4) |
| redis-server | (sha256:7ceda2…) | 7.4.8 | Up 9d | healthy | redis-cli PONG | 0.61% | 9.5MiB | easyaiot-network (172.18.0.6) |

---

## 2. 端口规划

### 对外暴露端口

| 端口 | 服务 | 协议 | 用途 |
|------|------|------|------|
| 9092-9093 | Kafka | TCP | Broker + Controller |
| 1935 | SRS | TCP | RTMP 推流 |
| 1985 | SRS | TCP | HTTP API |
| 8080 | SRS | TCP | HTTP 播放 (HLS/FLV) |
| 8848 | Nacos | TCP | HTTP 控制台 |
| 9848-9849 | Nacos | TCP | gRPC 通信 |
| 5432 | PostgreSQL | TCP | 数据库 |
| 5540 | ZLMediaKit | TCP/UDP | RTSP |
| 6080 | ZLMediaKit | TCP | HTTP (内部 80) |
| 4443 | ZLMediaKit | TCP | HTTPS (内部 443) |
| 9002 | ZLMediaKit | TCP | RTP Proxy |
| 8001 | ZLMediaKit | TCP/UDP | WebRTC/WS |
| 10000-10003 | ZLMediaKit | TCP/UDP | RTP 收发 |
| 10935 | ZLMediaKit | TCP/UDP | ONVIF |
| 30000-30500 | ZLMediaKit | TCP/UDP | RTP 动态端口范围 (501 个端口) |
| 6030 | TDEngine | TCP | Native 连接 |
| 6041 | TDEngine | TCP | REST API |
| 6043-6049 | TDEngine | TCP/UDP | 集群通信 |
| 6060 | TDEngine | TCP | Monitor |
| 1883 | EMQX | TCP | MQTT |
| 8083-8084 | EMQX | TCP | WebSocket MQTT |
| 8883 | EMQX | TCP | MQTT over TLS |
| 18083 | EMQX | TCP | Dashboard |
| 9000-9001 | MinIO | TCP | API + Console |
| 6379 | Redis | TCP | Redis |

### 仅容器内/主机内部端口

| 端口 | 服务 | 说明 |
|------|------|------|
| 80 | ZLMediaKit (容器内) | 映射到宿主机 6080 |
| 443 | ZLMediaKit (容器内) | 映射到宿主机 4443 |
| 8888 | nginx (宿主机) | 前端入口 |
| 48080/48082/48083/48088/48099 | Java 业务服务 | 业务应用 (非中间件) |
| 5000/5001/58000/8765 | Python AI 服务 | AI 模型/告警 (非中间件) |
| 9090/11800/12800/12801 | SkyWalking OAP | 可观测 (非中间件) |
| 7848/9848/9849 | Nacos | gRPC (来自容器内进程, 因为用 host 网络) |
| 3100/1234 | SkyWalking | 内部端口 |
| 18080 | SkyWalking UI | 可观测 UI |

### 端口安全风险
- **ZLMediaKit 30000-30500**: 501 个端口全部对外开放，RTP 动态端口范围过大，建议缩小或限定客户端 IP
- **5432/6379/8848/9092**: 核心中间件直接对外暴露，无前端 nginx 反向代理层保护

---

## 3. 健康检查分析

### 3.1 有健康检查且正常 (5/9)

| 容器 | 检查方式 | 间隔 | 超时 | 重试 | 评估 |
|------|----------|------|------|------|------|
| zlmediakit | `curl -f http://localhost:80/index/api/getServerConfig?secret=XXX` | 30s | 10s | 5 | 正常, 但 secret 明文在 healthcheck 中, 健康检查输出暴露完整配置文件 |
| tdengine | `taos -h localhost -s 'select 1;'` | 30s | 10s | 5 | 正常, 直接查询是可靠的探活方式 |
| emqx | `emqx ctl status` | 5s | 25s | 5 | **间隔 5s 过于频繁**, 增加 CPU 开销 |
| minio | `curl -f http://localhost:9000/minio/health/live` | 30s | 10s | 5 | 正常, 返回空 body 但 exit code 0 正确 |
| redis | `redis-cli -a <password> ping \| grep PONG` | 10s | 5s | 5 | 功能正常, **密码明文暴露在 inspect/ps 输出中** |

### 3.2 缺失健康检查 (4/9) — P1

**kafka/srs/nacos/postgres 四个容器没有配置任何健康检查** (docker inspect 返回 `Healthcheck: null`)。

证据:
```
kafka-server:   Healthcheck: null
srs-server:     Healthcheck: null  
nacos-server:   Healthcheck: null
postgres-server: Healthcheck: null
```

这导致:
- `docker ps` 不显示 health 状态
- Docker Swarm/K8s 场景下无法正确重启
- 之前 compose 中 `depends_on: condition: service_healthy` 因健康检查不存在而超时

### 3.3 已知问题: "健康检查超时但业务正常" 根因分析

**调查结果**: 该问题的根因由两层构成:

1. **健康检查对容器间依赖引用错误**: 之前的 compose 文件使用了 `condition: service_healthy`，但 kafka 等中间件根本没有健康检查。Docker 在评估 `depends_on` 时会无限等待不存在的 healthy 状态，导致启动超时。

2. **绕过而非修复**: `/root/fix_healthcheck.py` (发现于服务器) 的做法是将 `condition: service_healthy` 全部替换为 `condition: service_started`。这解决了启动阻塞问题，但**没有为 4 个容器添加健康检查**，只是绕过了问题。

**结论**: 这是 Docker Compose 配置问题（脚本问题），不是中间件自身的 bug。但缺乏健康检查本身就是运维风险，应该有真正的健康检查而不是仅仅绕过。

---

## 4. 版本与升级路径

### 4.1 版本清单与偏差

| 服务 | compose 定义版本 | 实际运行版本 | 偏差 |
|------|-----------------|-------------|------|
| Kafka | 3.8.0 | **3.7.0** | 降级 1 个小版本 |
| PostgreSQL | 16 | **18** | 升级 2 个主版本 |
| Redis | 7-alpine | **7.4.8** (非 alpine, sha256 无标签) | 镜像来源不明确 |
| Nacos | v2.5.1 | v2.5.1 | 一致 |
| EMQX | 5.8.7 | 5.8.7 | 一致 |
| ZLMediaKit | (无 compose 定义) | master | 浮动标签, 不可复现 |
| SRS | (无 compose 定义) | 5 (5.0.213) | 版本宽泛 |
| TDEngine | (无 compose 定义) | 3.3.8.4 | 固定版本 |
| MinIO | (无 compose 定义) | RELEASE.2025-04-22T22-12-26Z | 已超 13 个月未更新 |

**注意**: `/root/middleware-compose.yml` 是一个模板文件（容器名 `easyaiot-*`），与实际运行的容器名（`*-server`）不一致，表明实际部署不是通过该 compose 文件启动的。

### 4.2 升级路径

| 服务 | 升级建议 | 风险 |
|------|----------|------|
| Kafka | 3.7.0 → 3.8.0/3.9.0: 滚动升级, 需先升级 consumer 到新协议 | 低, KRaft 模式简化了升级 |
| PostgreSQL | 18 → 最新 minor (18.5+): `pg_upgrade` 或 dump/restore | 中, 需停服, 建议 dump/restore |
| Redis | 7.4.8 → 7.4.x latest: 无 breaking changes | 低, 注意 AOF 持久化连续性 |
| Nacos | 2.5.1 → 2.5.x/2.6.x: 检查 auth 迁移 | 低, 环境变量兼容 |
| EMQX | 5.8.7 → 5.8.latest: 查看 changelog | 低 |
| ZLMediaKit | master → 固定 tag: 建议固定到稳定 release | 高, master 浮动不可复现 |
| SRS | 5.0.213 → 5.x latest: 配置文件兼容检查 | 低, 5.x 系列稳定 |
| TDEngine | 3.3.8.4 → 3.3.x latest: 数据兼容 | 低, 无自定义数据库, 升级简单 |
| MinIO | 2025-04 → 2026-x: 查看 data 格式兼容性 | 中, 大版本跨度 13 个月 |

### 4.3 关键升级建议

1. **ZLMediaKit 使用 `:master` 标签 (P1)**: 浮动标签导致部署不可复现。当前运行的 git hash 为 `eeb2693` (2026-06-04)，建议固定到对应 tag。
2. **Redis 使用 sha256 digest 无标签 (P1)**: 镜像来源不明确, 无法溯源，必须更换为带明确版本的镜像如 `redis:7.4-alpine`。
3. **MinIO 13 个月未更新 (P2)**: 长期不更新存在安全漏洞累积风险。
4. **compose 与实际版本不一致 (P2)**: `/root/middleware-compose.yml` 与实际差异达 4 项，易导致误操作。

---

## 5. 容量与资源

### 5.1 主机资源

| 指标 | 值 |
|------|-----|
| 总磁盘 | 69G (vda3) |
| 已用 | 46G (69%) |
| 可用 | 21G |
| 总内存 | 14.72 GiB |
| Docker 镜像总大小 | ~3.5 GB |
| Docker 数据卷总大小 | ~345 MB |

**磁盘使用 69%**，剩余 21G 在业务增长下需关注。
docker-proxy 为 ZLMediaKit 的 501 个 RTP 端口各创建了一个 LISTEN 进程，占用大量 fd。

### 5.2 各中间件容量详情

#### Kafka
- Topics: 7 (6 业务 + `__consumer_offsets`)
- 所有 topic 均为 `PartitionCount=1, ReplicationFactor=1` — **无高可用，无分区并行**
- 数据目录: `/home/ubuntu/kafka-data` (host bind mount)
- 容器 writable layer: 1.3 GB — 可能有未清理的容器内日志
- 100 个进程/PID (JVM + Kafka 线程)

#### PostgreSQL
- 版本: 18.4 (Debian)
- 数据库: 11 个, 总大小 ~127 MB
  - skywalking: 47 MB (最大)
  - ruoyi-vue-pro20: 23 MB
  - iot-device20: 10 MB
  - 其余 < 10 MB
- 数据卷: 185 MB (docker volume)
- 连接: 25 个进程

#### TDEngine
- 1 个 dnode, status: ready
- **无业务数据库** -- 仅有系统 schema `information_schema` 和 `performance_schema`
- 数据目录: `/root/easyaiot-main/.scripts/docker/taos_data/data`
- 结论: TDEngine 已在运行但尚未被业务实际使用

#### Redis
- 版本: 7.4.8
- **keyspace: 空 (0 keys)** — Redis 已运行但无数据
- 已用内存: 2.10 MB
- 最大内存: 无限制 (`maxmemory=0B`)
- 持久化: AOF 启用, RDB 无主动配置
- 10000 最大客户端连接
- 密码保护: 已设置 (但命令中明文可见)

#### EMQX
- 版本: 5.8.7
- 状态: running
- MQTT 端口 1883 正常监听

#### MinIO
- 数据存储: `/root/easyaiot-main/.scripts/docker/minio_data/data`
- 健康检查通过

#### ZLMediaKit
- 构建: git hash eeb2693, branch master, 2026-06-04
- 重启过: 仅运行 4 天 (其他容器 9-11 天)

#### SRS
- 版本: 5.0.213
- 静态配置 `/etc/srs/srs.conf` → 映射到容器内 `conf/docker.conf`

---

## 6. 网络架构

存在 3 种隔离策略:

| 网络 | 成员 | 问题 |
|------|------|------|
| **host** | srs, nacos, postgres | 直接占用宿主机端口, 无容器隔离, 安全性最低 |
| **easyaiot-net** (172.19.0.x) | kafka | 单独一个bridge, 与其他服务网络隔离不一致 |
| **easyaiot-network** (172.18.0.x) | zlmediakit, tdengine, emqx, minio, redis | 标准的用户定义 bridge, 但 kafka 不在同一网络 |

**问题**: Kafka 在 `easyaiot-net` 而其他中间件在 `easyaiot-network`，若业务服务需要同时访问 Kafka 和其他中间件，可能依赖 host 网络穿透或需要额外网络配置。

---

## 7. 敏感信息暴露 (P1)

审查过程中发现以下凭证明文可见:

1. **Redis 密码**: 通过 `docker inspect redis-server` 的 `Cmd` 字段可直接读取 `--requirepass <redacted>`。健康检查命令 `redis-cli -a <redacted> ping` 同样暴露。
2. **ZLMediaKit API secret**: 通过 `docker inspect zlmediakit-server` 的健康检查输出完整/conf/config.ini 内容, 包含 `api.secret`。
3. **EMQX Dashboard 默认密码**: compose 模板定义 `EMQX_DASHBOARD__DEFAULT_PASSWORD`，虽实际容器可能不同但建议确认。

这些信息可被任意有 docker 访问权限的用户读取。建议使用 Docker Secrets 或环境变量文件管理。

---

## 8. 详细发现汇总

### F7.1 4 个容器缺失健康检查 (P1)
- **位置**: kafka-server / srs-server / nacos-server / postgres-server
- **现状**: `docker inspect` 返回 `Healthcheck: null`
- **风险**: 无法监控容器运行状态，依赖 `depends_on` 会导致启动超时
- **建议**: 为每个容器添加合适的健康检查:
  - kafka: `kafka-topics.sh --bootstrap-server localhost:9092 --list`
  - srs: `curl -f http://localhost:1985/api/v1/versions`
  - nacos: `curl -f http://localhost:8848/nacos/v1/console/health/readiness`
  - postgres: `pg_isready -U postgres`
- **历史修复分析**: `/root/fix_healthcheck.py` 通过替换 `service_healthy` → `service_started` 绕过问题, 并未修复根因

### F7.2 ZLMediaKit RTP 端口范围过大 (P1)
- **位置**: 宿主机 30000-30500 共 501 个端口
- **现状**: 全部通过 docker-proxy 绑定到 `0.0.0.0`
- **风险**: 攻击面过大, 大量 docker-proxy 进程消耗 fd
- **建议**: 缩小 RTP 端口范围至实际需要 (如 30000-30100), 或在 compose 中限制为 `--port=30000-30100`

### F7.3 凭证明文暴露 (P1)
- **位置**: Redis Cmd + healthcheck, ZLMediaKit healthcheck
- **风险**: 任意有 docker 权限的用户可获取密码
- **建议**: 使用 Docker Secrets 或 `--env-file` 替代命令行传参

### F7.4 ZLMediaKit 镜像使用浮动标签 (P1)
- **位置**: `zlmediakit/zlmediakit:master`
- **风险**: 每次 pull 可能拉取不同版本, 不可复现
- **建议**: 固定到 `zlmediakit/zlmediakit:v2025.1` 或具体 tag

### F7.5 Redis 镜像无版本标签 (P1)
- **位置**: redis-server 使用 sha256 digest (7ceda270a313)
- **风险**: 无法溯源和审计
- **建议**: 重新部署为 `redis:7.4-alpine` 并 dump/restore AOF

### F7.6 Kafka/Redis/TDEngine 均单节点 (P2)
- **位置**: Kafka Partition=1 Replica=1, Redis standalone, TDEngine 1 dnode
- **风险**: 单点故障, 无数据冗余
- **建议**: 评估是否需要高可用，若业务允许可暂维持

### F7.7 Redis/TDEngine 无业务数据 (P2)
- **位置**: Redis keyspace 空, TDEngine 仅系统库
- **现状**: 服务已运行但未被使用
- **建议**: 确认是否计划使用，如长期不用可考虑停止以释放资源

### F7.8 磁盘使用 69% (P3)
- **位置**: /dev/vda3 46G/69G
- **现状**: 21G 可用
- **建议**: 配置日志轮转，定期清理镜像，预留 15G 以上富余

### F7.9 compose 与实际情况不一致 (P2)
- **位置**: `/root/middleware-compose.yml` vs 实际容器
- **现状**: 容器名、版本、网络均有差异
- **建议**: 若 compose 是部署模板应更新匹配实际状态; 若已废弃应移除

### F7.10 EMQX 健康检查间隔过短 (P3)
- **位置**: emqx 健康检查 interval=5s
- **现状**: 每 5 秒执行一次 `emqx ctl status`
- **风险**: 轻微 CPU 开销
- **建议**: 调整为 30s

---

## 修复优先级

1. **P0 立即修**: (无)
2. **P1 本周**:
   - F7.1: 为 kafka/srs/nacos/postgres 添加健康检查
   - F7.2: 缩小 ZLMediaKit RTP 端口范围
   - F7.3: 移除命令行明文密码, 改用 secrets
   - F7.4: 固定 ZLMediaKit 镜像 tag
   - F7.5: 更换 Redis 为明确版本标签镜像
3. **P2 计划**:
   - F7.6: 评估高可用需求
   - F7.7: 确认 Redis/TDEngine 是否使用, 否则可停服
   - F7.9: 同步 compose 文件与实际部署
4. **P3 监控**:
   - F7.8: 监控磁盘使用趋势
   - F7.10: 调整 EMQX 健康检查间隔

---

## 不在本维度范围 (交叉引用)

- Docker compose 中 `depends_on` 的设计属于 **D3 服务/部署**
- 业务服务 (iot-*) 的健康检查属于 **D3 服务/部署**
- SkyWalking 相关 (OAP 11800/12800, UI 18080) 属于 **D8 可观测性**
- Nacos 鉴权配置 `NACOS_AUTH_TOKEN` 属于 **D1 安全审计**
- PostgreSQL 慢查询/索引属于 **D4 数据层**
- Redis 持久化策略 (AOF/RDB) 属于 **D4 数据层**
- MinIO 存储桶规划属于 **D4 数据层**
