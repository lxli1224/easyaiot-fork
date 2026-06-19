<template>
  <div class="inspection-dashboard">
    <!-- 统计卡片 -->
    <a-row :gutter="16" class="stat-row">
      <a-col :span="6">
        <a-card hoverable class="stat-card stat-card-total">
          <a-statistic title="总巡检次数" :value="summary.total" :value-style="{ color: '#1890ff' }">
            <template #prefix>
              <PieChartOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable class="stat-card stat-card-normal">
          <a-statistic title="正常" :value="summary.normal" :value-style="{ color: '#52c41a' }">
            <template #prefix>
              <CheckCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable class="stat-card stat-card-anomaly">
          <a-statistic title="异常" :value="summary.anomaly" :value-style="{ color: '#ff4d4f' }">
            <template #prefix>
              <WarningOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable class="stat-card stat-card-error">
          <a-statistic title="错误" :value="summary.error" :value-style="{ color: '#faad14' }">
            <template #prefix>
              <CloseCircleOutlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 各维度异常分布 -->
    <a-row :gutter="16" class="stat-row">
      <a-col :span="16">
        <a-card title="异常类型分布" class="chart-card" :loading="loading">
          <div ref="anomalyChartRef" class="chart-container" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="巡检概况" class="overview-card" :loading="loading">
          <div class="detector-list">
            <div class="detector-item">
              <span class="detector-label">信号丢失</span>
              <a-progress
                :percent="getAnomalyPercent('signal_loss')"
                status="exception"
                :format="() => `${summary.detectorAnomaly?.signal_loss ?? 0}`"
              />
            </div>
            <div class="detector-item">
              <span class="detector-label">图像模糊</span>
              <a-progress
                :percent="getAnomalyPercent('blur')"
                status="exception"
                :format="() => `${summary.detectorAnomaly?.blur ?? 0}`"
              />
            </div>
            <div class="detector-item">
              <span class="detector-label">画面冻结</span>
              <a-progress
                :percent="getAnomalyPercent('freeze')"
                :stroke-color="{ from: '#108ee9', to: '#87d068' }"
                :format="() => `${summary.detectorAnomaly?.freeze ?? 0}`"
              />
            </div>
            <div class="detector-item">
              <span class="detector-label">遮挡</span>
              <a-progress
                :percent="getAnomalyPercent('obstruction')"
                :stroke-color="{ from: '#faad14', to: '#ff4d4f' }"
                :format="() => `${summary.detectorAnomaly?.obstruction ?? 0}`"
              />
            </div>
            <div class="detector-item">
              <span class="detector-label">偏色</span>
              <a-progress
                :percent="getAnomalyPercent('color_cast')"
                :stroke-color="{ from: '#722ed1', to: '#eb2f96' }"
                :format="() => `${summary.detectorAnomaly?.color_cast ?? 0}`"
              />
            </div>
            <div class="detector-item">
              <span class="detector-label">条纹</span>
              <a-progress
                :percent="getAnomalyPercent('stripe')"
                :stroke-color="{ from: '#13c2c2', to: '#52c41a' }"
                :format="() => `${summary.detectorAnomaly?.stripe ?? 0}`"
              />
            </div>
          </div>

          <a-divider />

          <div class="kafka-status">
            <span class="kafka-label">Kafka 消费状态：</span>
            <a-tag :color="kafkaStatus.running ? 'green' : 'red'">
              {{ kafkaStatus.running ? '运行中' : '已停止' }}
            </a-tag>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 最近异常记录 -->
    <a-card title="最近异常记录" class="recent-records-card">
      <BasicTable @register="registerTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'overall'">
            <a-tag :color="OVERALL_COLOR_MAP[record.overall]">
              {{ OVERALL_LABEL_MAP[record.overall] || record.overall }}
            </a-tag>
          </template>
          <template v-else-if="column.dataIndex === 'anomalyType'">
            <a-tag v-if="record.anomalyType" color="orange">
              {{ ANOMALY_TYPE_LABEL_MAP[record.anomalyType] || record.anomalyType }}
            </a-tag>
            <span v-else>-</span>
          </template>
          <template v-else-if="column.dataIndex === 'checkedAt'">
            {{ formatTime(record.checkedAt) }}
          </template>
        </template>
      </BasicTable>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PieChartOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue';
import { BasicTable, useTable } from '@/components/Table';
import {
  getInspectionSummary,
  pageInspectionRecords,
  getKafkaStatus,
  ANOMALY_TYPE_LABEL_MAP,
  OVERALL_COLOR_MAP,
  OVERALL_LABEL_MAP,
  type InspectionSummary,
  type KafkaStatus,
} from '@/api/device/inspection';

defineOptions({ name: 'InspectionDashboard' });

// ---- 状态 ----
const loading = ref(false);
const summary = ref<InspectionSummary>({
  total: 0,
  normal: 0,
  anomaly: 0,
  error: 0,
  detectorAnomaly: {
    signal_loss: 0,
    freeze: 0,
    obstruction: 0,
    stripe: 0,
    blur: 0,
    color_cast: 0,
  },
});
const kafkaStatus = ref<KafkaStatus>({ running: false });
const anomalyChartRef = ref<HTMLDivElement | null>(null);

// ---- 表格 ----
const [registerTable, { reload }] = useTable({
  title: '',
  api: async () => {
    try {
      const res = await pageInspectionRecords({ pageNo: 1, pageSize: 10 }) as any;
      const list = (res.list ?? []).filter(
        (r: any) => r.overall === 'ANOMALY' || r.overall === 'ERROR',
      );
      return { items: list, total: res.total ?? 0 };
    } catch {
      return { items: [], total: 0 };
    }
  },
  columns: [
    { title: '设备名称', dataIndex: 'deviceName', width: 160 },
    { title: '设备ID', dataIndex: 'deviceId', width: 140 },
    { title: '结果', dataIndex: 'overall', width: 80 },
    { title: '异常类型', dataIndex: 'anomalyType', width: 100 },
    { title: '信号', dataIndex: 'signalScore', width: 70, align: 'center' },
    { title: '模糊', dataIndex: 'blurScore', width: 70, align: 'center' },
    { title: '冻结', dataIndex: 'freezeScore', width: 70, align: 'center' },
    { title: '遮挡', dataIndex: 'obstructionScore', width: 70, align: 'center' },
    { title: '偏色', dataIndex: 'colorScore', width: 70, align: 'center' },
    { title: '条纹', dataIndex: 'stripeScore', width: 70, align: 'center' },
    { title: '检查时间', dataIndex: 'checkedAt', width: 170 },
  ],
  pagination: false,
  showTableSetting: false,
  showIndexColumn: false,
  rowKey: 'id',
  immediate: false,
  fetchSetting: { listField: 'items', totalField: 'total' },
});

// ---- 方法 ----
function formatTime(val?: string) {
  if (!val) return '-';
  try {
    return new Date(val).toLocaleString('zh-CN', { hour12: false });
  } catch {
    return val;
  }
}

function getAnomalyPercent(key: keyof InspectionSummary['detectorAnomaly']): number {
  const total = (summary.value.detectorAnomaly?.signal_loss ?? 0) +
    (summary.value.detectorAnomaly?.freeze ?? 0) +
    (summary.value.detectorAnomaly?.obstruction ?? 0) +
    (summary.value.detectorAnomaly?.stripe ?? 0) +
    (summary.value.detectorAnomaly?.blur ?? 0) +
    (summary.value.detectorAnomaly?.color_cast ?? 0);
  if (total === 0) return 0;
  return Math.round(((summary.value.detectorAnomaly?.[key] ?? 0) / total) * 100);
}

// ---- ECharts 图表（纯 JS 动态 import） ----
let chartInstance: any = null;

async function initChart() {
  if (!anomalyChartRef.value) return;
  try {
    const echarts = await import('echarts');
    if (!chartInstance) {
      chartInstance = echarts.init(anomalyChartRef.value);
    }
    const detector = summary.value.detectorAnomaly;
    const names = Object.keys(ANOMALY_TYPE_LABEL_MAP);
    const values = names.map((k) => (detector as any)?.[k] ?? 0);

    chartInstance.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 0,
        data: names.map((k) => ANOMALY_TYPE_LABEL_MAP[k]),
      },
      series: [
        {
          name: '异常分布',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '48%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' },
          },
          data: names.map((k) => ({
            name: ANOMALY_TYPE_LABEL_MAP[k],
            value: values[names.indexOf(k)] ?? 0,
          })),
        },
      ],
    });
  } catch {
    // echarts not available
  }
}

async function loadSummary() {
  loading.value = true;
  try {
    const res = await getInspectionSummary() as any;
    if (res) {
      summary.value = res as InspectionSummary;
    }
    await nextTick();
    initChart();
  } catch {
    // ignore
  } finally {
    loading.value = false;
  }
}

async function loadKafkaStatus() {
  try {
    const res = await getKafkaStatus() as any;
    if (res) {
      kafkaStatus.value = res as KafkaStatus;
    }
  } catch {
    // ignore
  }
}

function handleResize() {
  chartInstance?.resize?.();
}

onMounted(async () => {
  await loadSummary();
  await loadKafkaStatus();
  reload();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose?.();
  chartInstance = null;
});
</script>

<style lang="less" scoped>
.inspection-dashboard {
  padding: 16px;
  min-height: 100%;
  background: #f5f7fa;
}

.stat-row {
  margin-bottom: 16px;
}

.stat-card {
  :deep(.ant-card-body) {
    padding: 20px 24px;
  }

  .ant-statistic {
    .ant-statistic-title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
    .ant-statistic-content {
      font-size: 28px;
    }
    .ant-statistic-content-prefix {
      font-size: 22px;
    }
  }
}

.stat-card-total { border-top: 3px solid #1890ff; }
.stat-card-normal { border-top: 3px solid #52c41a; }
.stat-card-anomaly { border-top: 3px solid #ff4d4f; }
.stat-card-error { border-top: 3px solid #faad14; }

.chart-card,
.overview-card {
  height: 380px;

  :deep(.ant-card-body) {
    padding: 16px 24px;
  }
}

.chart-container {
  width: 100%;
  height: 300px;
}

.detector-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.detector-item {
  display: flex;
  align-items: center;
  gap: 12px;

  .detector-label {
    width: 72px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
    text-align: right;
    flex-shrink: 0;
  }

  :deep(.ant-progress) {
    flex: 1;
    margin: 0;
  }
}

.kafka-status {
  display: flex;
  align-items: center;
  gap: 8px;

  .kafka-label {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
  }
}

.recent-records-card {
  :deep(.ant-card-body) {
    padding: 16px 24px;
  }
}
</style>
