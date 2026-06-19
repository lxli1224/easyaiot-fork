# EasyAIoT 全面代码审查 v2

## 任务背景
EasyAIoT 是一个开源 IoT 平台（基于 ruoyi-vue-pro），客户马上要做 demo（15 路摄像头 + 数字孪生 + AI 算法），李杨要我**先全面审查代码再修**。

之前 6-16/6-17 我做过一次审查（review/D1-D8 markdown），发现 22 个问题（6 P0 + 7 P1 + 5 P2 + 4 P3）。**这次要重新审查一遍**，**上次修了 P0 但其他 P1-P3 没动**，且要检查是否漏了什么、修复是否引入了新问题。

## 工作目录
- `/home/ubuntu/.openclaw/workspace/easyaiot/` —— 本地 main 分支（HEAD `2c9f493a`）
- Java: `DEVICE/` (2391 个 .java)
- TypeScript: `WEB/src/` (602 个 .ts)
- Python: `AI/` (54 个 .py)
- 上次审查报告: `review/D1-D8-*.md` (6 个 markdown)

## 这次审查的 3 个维度（重要！）

### 维度 1: 功能完整性
- IoT 平台应有的核心模块**都全吗**？缺失哪些？
- 已实现的模块**功能链完整吗**？比如：设备管理 → MQTT 接入 → 数据存储 → 告警 → 视频 → 算法 链路
- 模块间依赖关系**有没有断裂**（缺 service/缺 client 引用）？
- 前端页面（routes/modules）**有后端对应 API 吗**？前端调了但后端没实现？
- AI 模块（YOLO/LLM/deploy/auto_label/alert）**功能链完整吗**？

### 维度 2: 结构稳定性
- 微服务模块划分**合理吗**？（system/infra/file/gateway/dataset/message/device/model/video/gb28181/inspection）
- 端口分配**有没有冲突风险**？（iot-system=48099, iot-gb28181=48088, iot-inspection=48088-冲突, iot-infra=48082, iot-file=48083, iot-dataset=48087, iot-tdengine=48090, iot-message=48093, iot-gateway=48080, iot-device=?, iot-sink=?, iot-video=6000）
- 数据库设计**合理吗**？（schema/索引/外键/事务）
- 配置管理（Nacos）**有冗余/冲突吗**？
- systemd unit 文件**结构合理吗**？（依赖顺序/重启策略/资源限制）

### 维度 3: Bug 检测（重点）
- **并发问题**：线程安全、死锁、竞态条件
- **资源泄漏**：连接池未关闭、文件句柄、内存泄漏
- **异常处理**：吞异常、空 catch、错误日志缺失
- **SQL 注入**：MyBatis `${}` 用法（特别注意 TdEngineMapper / 动态表名）
- **XSS / CSRF**：前端输入未转义、CSRF token 缺失
- **认证 / 授权**：接口未鉴权、CORS 配错、Token 泄露
- **数据一致性**：事务边界、缓存与 DB 不一致
- **N+1 查询**：循环查 DB
- **超时配置缺失**：HTTP client、数据库连接、Redis、MQ

## 审查要求

1. **必须实际读代码** —— 不要只看 README。每个 P0/P1 都给具体文件:行号
2. **必须区分新建模块 vs 历史代码** —— 不要把 ruoyi-vue-pro 自带的代码当成我们的 bug
3. **重点模块**（优先深入看）：
   - AI/run.py + AI/app/blueprints/*.py（最近部署的，可能有 GPU 依赖问题）
   - DEVICE/iot-gateway/src/main/resources/application.yaml（路由配置）
   - DEVICE/iot-sink/iot-sink-biz/src/main/java/.../TdEngineMapper.xml（SQL 注入历史点）
   - DEVICE/iot-common/iot-common-security/（鉴权）
   - WEB/src/api/（前端 API 客户端，看是否调了不存在的接口）
   - WEB/src/views/inspection/（最近加的巡检模块）
   - DEVICE/iot-parent/iot-file/（新模块）
   - DEVICE/iot-message/iot-message-biz/（Kafka 消费）
   - DEVICE/iot-video/（视频服务）
4. **次要模块**（快速过）：
   - system/infra/dataset/device/gb28181（成熟模块）
   - 所有 module 的 application*.yaml（配置）

## 输出格式

写到 `/home/ubuntu/.openclaw/workspace/easyaiot/AUDIT_V2_REPORT.md`，按下面结构：

```
# EasyAIoT 全面代码审查 v2 报告

## 执行摘要
- 总文件扫描数
- 发现问题总数：X P0 / X P1 / X P2 / X P3
- 总体结论：（一句话）

## 维度 1: 功能完整性
### 缺失模块
- [P1] xxx 模块缺失，y 功能没实现
### 功能链断裂
- [P2] A → B 链路缺 C 节点（文件:行号）
### 前端调用了不存在的 API
- [P0] 前端 src/api/foo.ts:42 调用 GET /admin-api/bar/xxx，但后端无对应接口
### 总结
...

## 维度 2: 结构稳定性
### 端口冲突
- [P0] iot-gb28181 和 iot-inspection 都用 48088
### systemd 依赖
- [P2] iot-dataset 启动不依赖 iot-system，可能 Nacos 配置没拉到就起来
### 数据库设计
- ...
### 总结
...

## 维度 3: Bug 检测
### P0 (立即修)
1. [P0-001] xxx - 文件:行号 - 描述 - 修法
2. [P0-002] ...
### P1 (本周修)
1. ...
### P2 (计划修)
1. ...
### P3 (监控)
1. ...
### 总结
...

## 优先修复建议
按依赖关系排序，告诉我先修哪个后修哪个
```

## 注意事项

1. **不要修改任何代码**，只出报告
2. **不要碰 .opencode-prompts/ 目录里其他 prompt 文件**（旧审查的 prompt 留档）
3. **写到 `/home/ubuntu/.openclaw/workspace/easyaiot/AUDIT_V2_REPORT.md`**
4. **用 deepseek/deepseek-v4-pro 模型**（与上次审查一致）
5. **中文报告**
6. **如果报告很长（>50KB），写到 `AUDIT_V2_REPORT.md`，同时把详细 P0/P1 写到 `AUDIT_V2_DETAILS.md`**

执行