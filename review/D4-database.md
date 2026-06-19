# D4 数据层 审查报告

## TL;DR
- **P0**: iot_alert 表 900K+ 全表扫描, 仅 PK 索引, 缺失 device_id/alert_type/alert_time/deleted 的组合索引 — 每个前端告警请求都在拖库
- **P1**: pg_stat_statements 未安装 + 慢查询日志关闭 (log_min_duration_statement=-1) — 可观测性盲区; 零备份策略 (无 cron pg_dump, archive_mode=off)
- **P2**: TDEngine 部署但完全未使用 (0 用户库); Redis/MinIO 空置 (0 keys / 0 objects); iot-video20 回滚率达 48%
- **P3**: work_mem=4MB 偏保守; HikariCP 使用 Spring Boot 默认值 pool=10

**风险等级: P0** — iot_alert 全表扫描直接影响告警查询性能, 随着数据增长会指数级恶化。

---

## 详细发现

### F4.1 iot_alert 严重索引缺失 (P0)
- **位置**: postgres-server:iot-ai20.public.iot_alert + AI/app/blueprints/alert.py:146-161
- **现状**: iot_alert 表仅含 PK 索引 `iot_alert_pkey (id)`, 但查询模式为:
  - `WHERE deleted = false AND device_id = ? ORDER BY alert_time DESC`
  - `WHERE deleted = false AND alert_type = ? ORDER BY alert_time DESC`
  - `WHERE deleted = false AND alert_time >= ? AND alert_time <= ?`
  - `WHERE deleted = false AND alert_type IN (?,?,?)`
  - `SELECT * FROM iot_alert WHERE ... ORDER BY alert_time DESC LIMIT ? OFFSET ?`
- **证据**:
  - `iot_alert` seq_scan=900,186, idx_scan=0 — 零索引命中
  - 表仅 7 行就产生 900K 扫描, 每次请求循环轮询 (Flask alert_service 持续轮询)
  - `ai_service` 同理: seq_scan=32,735, idx_scan=0 (单行表)
- **风险**: 告警查询性能随数据增长线性劣化, 前端列表/仪表板统计响应越来越慢, 最终导致 DB CPU 被打满
- **建议**:
  ```sql
  -- 覆盖最常见查询: /page 分页 + /count 计数 + /record/query 录像查找
  CREATE INDEX idx_iot_alert_device_time ON iot_alert(device_id, alert_time DESC) WHERE deleted = false;
  CREATE INDEX idx_iot_alert_type_time ON iot_alert(alert_type, alert_time DESC) WHERE deleted = false;
  CREATE INDEX idx_iot_alert_deleted_time ON iot_alert(deleted, alert_time DESC);
  -- ai_service 表也类似 (单行但频繁全扫)
  CREATE INDEX idx_ai_service_active ON ai_service(id) WHERE status = 'active';
  ```
- **复现/证据**: `docker exec postgres-server psql -U postgres -d iot-ai20 -c "SELECT relname, seq_scan, idx_scan FROM pg_stat_user_tables WHERE schemaname='public' AND seq_scan > 1000"` → iot_alert 900186, ai_service 32735

### F4.2 可观测性盲区: pg_stat_statements 未安装 + 慢查询日志关闭 (P1)
- **位置**: postgres-server 全局配置
- **现状**:
  - `log_min_duration_statement = -1` (关闭慢查询日志)
  - `CREATE EXTENSION pg_stat_statements` 从未执行
- **风险**: 无法识别慢查询模式, 无法做查询优化决策, 排障全靠猜
- **建议**:
  ```sql
  CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
  ALTER SYSTEM SET log_min_duration_statement = '1000'; -- 记录 >1秒 的查询
  SELECT pg_reload_conf();
  ```

### F4.3 零备份策略 (P1)
- **位置**: postgres-server 全局 + 操作系统
- **现状**:
  - `archive_mode = off` — 无 WAL 归档
  - `wal_level = replica` 但 archive_command 未设置
  - 无 cron 备份任务 (crontab 仅含 video-healthcheck)
  - 服务器上无 pg_dump 相关脚本
- **风险**: 数据库损坏或误操作无恢复能力, 生产级 PITR 完全不可用
- **建议**:
  ```bash
  # 添加 cron: 每日凌晨2点全量备份
  0 2 * * * docker exec postgres-server pg_dumpall -U postgres | gzip > /backup/pg_all_$(date +\%Y\%m\%d).sql.gz
  # 开启 WAL 归档
  ALTER SYSTEM SET archive_mode = on;
  ALTER SYSTEM SET archive_command = 'cp %p /archive/%f';
  ```

### F4.4 HikariCP 连接池使用默认值, 无显式配置 (P2)
- **位置**: 所有 Spring Boot 服务 (iot-device/gateway/infra/inspection/model/system)
- **现状**: Spring Boot 默认 `maximum-pool-size=10`, 生产 PG 当前连接数 25/100
- **证据**: 源码中未找到任何 HikariCP explicit 配置, Nacos 也未覆盖; PG `pg_stat_activity` 显示 14 个 JDBC Driver 空闲连接
- **风险**: 默认池大小未必匹配生产负载, 高并发时可能连接不足; 同时 100 的 max_connections 也偏高 (shared_buffers=16384/16MB 较低)
- **建议**:
  ```yaml
  # 在各服务 application.yml 或 Nacos 中显式配置
  spring:
    datasource:
      hikari:
        maximum-pool-size: 20
        minimum-idle: 5
        connection-timeout: 30000
        idle-timeout: 600000
        max-lifetime: 1800000
  ```

### F4.5 TDEngine 部署但未使用 (P2)
- **位置**: tdengine-server (tdengine/tsdb:3.3.8.4)
- **现状**: 数据库仅含 `information_schema` 和 `performance_schema`, 0 个用户数据库, 0 个 APP
- **证据**: `SHOW DATABASES;` → 无用户库; `SHOW APPS;` → 0 rows; `SHOW DNODES;` → 单节点 localhost:6030, vnodes=0
- **风险**: 资源浪费 (内存 + CPU + 端口 6030-6060/6043-6049)
- **建议**: 确认是否需要; 如果未规划使用则停止容器; 如果计划使用则创建库表并接入数据采集

### F4.6 Redis 空置 (0 键) (P2)
- **位置**: redis-server (redis:7.4.8), 端口 6379
- **现状**: `DBSIZE`=0, `keyspace` 空, used_memory=1.74MB (几乎全是 overhead)
- **配置**: AOF 开启 (appendfsync=everysec), `maxmemory=0` (无限制), `maxmemory-policy=allkeys-lru`, `save 60 1000`
- **证据**: 5 分钟内 427 次 RDB change (无 key 却有 changes, 可能为运维交互)
- **风险**: Redis 部署但无业务数据, 可能配置错误或服务未接入; AOF 文件持续增长但无有效数据
- **建议**: 排查为何所有 IoT 服务未向 Redis 写入数据; 确认 Redis 用途 (缓存/Session/分布式锁?)

### F4.7 MinIO 空置 (0 对象) (P2)
- **位置**: minio-server (minio/minio:RELEASE.2025-04-22), 端口 9000-9001
- **现状**: 4 个 bucket (iot, iot-breakpoint, record-space, snap-space) 全部为空, 0B/0 objects
- **证据**: `mc du myminio/` → 0B 0 objects
- **风险**: 无告警截图/录像存储; 前端告警详情 snap_image_url/video_clip_url 均指向空存储
- **建议**: 确认 snapshot 和录像文件上传链路是否正常; 检查 iot-video20.record_space/snap_space 表的 source_url 是否写入

### F4.8 iot-video20 异常高回滚率 (P2)
- **位置**: postgres-server:iot-video20
- **现状**: xact_commit=64,633, xact_rollback=31,024 → 回滚率 48%
- **证据**: `pg_stat_database` 中 iot-video20 的 rollback 远高于其他库 (ruoyi-vue-pro20 仅 19/296K)
- **风险**: 业务逻辑中大量事务失败回滚, 可能为录像处理/存储写入失败
- **建议**: 排查 iot-video20 服务日志, 检查为何近半数事务回滚

### F4.9 system_operate_log 缺失时间索引 (P2)
- **位置**: postgres-server:ruoyi-vue-pro20.public.system_operate_log
- **现状**: 仅 PK 索引, 无 create_time 或 user_id 索引; 操作日志通常按时间范围和用户查询
- **风险**: 日志查询全表扫描, 随日志积累性能劣化
- **建议**: `CREATE INDEX idx_operate_log_time ON system_operate_log(create_time DESC);`

### F4.10 PostgreSQL work_mem 配置保守 (P3)
- **位置**: postgres-server 全局配置
- **现状**: `work_mem = 4096` (4MB), `shared_buffers = 16384` (16MB), `max_connections = 100`
- **风险**: 复杂 ORDER BY / GROUP BY 可能触发磁盘排序
- **建议**: 评估负载后调整
  ```sql
  ALTER SYSTEM SET shared_buffers = '256MB';
  ALTER SYSTEM SET work_mem = '16MB';
  ALTER SYSTEM SET effective_cache_size = '512MB';
  ```
  注意: 需确保总内存 (shared_buffers + work_mem × max_connections) < 可用系统内存

### F4.11 SkyWalking 数据库膨胀 (P3)
- **位置**: postgres-server:skywalking (46 MB, 最大库)
- **现状**: 10 个活跃连接 (最多), 创建大量按日分表 (zipkin_span_*, segment_*, event_*, alarm_record_*)
- **证据**: 按日分区表多为空, 但元数据和管理表持续写入
- **风险**: 无 TTL 清理策略, 历史 trace 数据持续积累
- **建议**: 在 SkyWalking OAP 配置中设置 TTL (如 7 天), 或定期执行 `DELETE FROM segment WHERE time_bucket < NOW() - INTERVAL '7 days'`

---

## 数据库清单汇总

### PostgreSQL (postgres:18, 端口 5432)
| 数据库 | 大小 | 表数 | 连接数 | 特征 |
|--------|------|------|--------|------|
| ruoyi-vue-pro20 | 23 MB | ~45 | 2 | 基础平台, 56 个表含 47 个仅 PK 索引 |
| skywalking | 46 MB | 大量按日表 | 10 | APM 数据, 最大库, 需 TTL |
| iot-device20 | 10 MB | ~18 | 1 | 设备管理, 数据量极少 |
| iot-video20 | 9 MB | 15 | 0 | 录像/截图, 高回滚率 |
| iot-ai20 | 8 MB | 15 | 2 | AI 告警, 索引严重缺失 |
| iot-message20 | 8 MB | 18 | 0 | 消息推送, 数据量极少 |
| iot_inspection | 8 MB | 4 | 1 | 巡检 (新增), 索引设计良好 |
| iot-gb2818120 | 8 MB | ~? | 0 | GB28181, 空表 |
| postgres | 8 MB | - | 1 | 系统库 |

### TDEngine (3.3.8.4, 端口 6030-6060)
- 数据库: 0 个用户库 (仅内置 info/performance schema)
- 节点: 1 个 (localhost:6030), vnodes=0
- 使用量: 空

### Redis (7.4.8, 端口 6379)
- 内存: 1.74 MB (used) / 14.72 GB (system total)
- 键数: 0
- 持久化: AOF=yes (everysec), RDB save=60 1000
- 策略: maxmemory=0 (无上限), allkeys-lru

### MinIO (RELEASE.2025-04-22, 端口 9000-9001)
| Bucket | 对象数 | 大小 |
|--------|--------|------|
| iot | 0 | 0B |
| iot-breakpoint | 0 | 0B |
| record-space | 0 | 0B |
| snap-space | 0 | 0B |

---

## 修复优先级

1. **P0 立即修**: 为 iot_alert 添加组合索引 (device_id/alert_type/alert_time/deleted), 消除 900K 全表扫描
2. **P0 立即修**: 为 ai_service 添加查询覆盖索引
3. **P1 本周**: 安装 pg_stat_statements 扩展, 开启慢查询日志 (log_min_duration_statement=1000)
4. **P1 本周**: 配置 PostgreSQL 定时备份 (cron + pg_dumpall) 及 WAL 归档
5. **P2 计划**: 显式配置 HikariCP 连接池参数, 调整 PG work_mem/shared_buffers
6. **P2 计划**: 排查 TDEngine/Redis/MinIO 空置原因, 确认是否需要
7. **P2 计划**: 排查 iot-video20 48% 回滚率
8. **P2 计划**: system_operate_log 添加时间索引
9. **P3 监控**: SkyWalking 配置数据 TTL 清理策略

---

## 不在本维度范围

- 告警服务 Flask 轮询架构设计 → D5 (AI 模型服务)
- Nacos 配置中心数据源配置是否正确 → D2 (架构)
- 6 个服务的 systemd unit 启动顺序依赖 → D3 (服务/部署)
- emqx 活跃度 → D7 (中间件)
- SkyWalking 18080 端口死锁 → D8 (可观测性)
