<template>
  <div class="inspection-result-page">
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
        <template v-else-if="['signalScore', 'blurScore', 'freezeScore', 'obstructionScore', 'colorScore', 'stripeScore'].includes(column.dataIndex)">
          <span :class="getScoreClass(record[column.dataIndex])">
            {{ record[column.dataIndex] ?? '-' }}
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-button type="link" size="small" @click="openDetailModal(record)">
            详情
          </a-button>
        </template>
      </template>
    </BasicTable>

    <!-- 详情弹窗 -->
    <a-modal
      v-model:open="detailModalOpen"
      title="巡检详情"
      width="720px"
      :footer="null"
      @cancel="closeDetailModal"
    >
      <template v-if="detailRecord">
        <a-descriptions :column="2" bordered size="small">
          <a-descriptions-item label="设备名称">{{ detailRecord.deviceName || '-' }}</a-descriptions-item>
          <a-descriptions-item label="设备 ID">{{ detailRecord.deviceId || '-' }}</a-descriptions-item>
          <a-descriptions-item label="巡检结果">
            <a-tag :color="OVERALL_COLOR_MAP[detailRecord.overall]">
              {{ OVERALL_LABEL_MAP[detailRecord.overall] || detailRecord.overall }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="异常类型">
            <a-tag v-if="detailRecord.anomalyType" color="orange">
              {{ ANOMALY_TYPE_LABEL_MAP[detailRecord.anomalyType] || detailRecord.anomalyType }}
            </a-tag>
            <span v-else>-</span>
          </a-descriptions-item>
          <a-descriptions-item label="检查时间">{{ formatTime(detailRecord.checkedAt) }}</a-descriptions-item>
        </a-descriptions>

        <a-divider>检测维度分数</a-divider>
        <a-descriptions :column="3" bordered size="small">
          <a-descriptions-item label="信号质量">
            <span :class="getScoreClass(detailRecord.signalScore)">{{ detailRecord.signalScore ?? '-' }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="模糊度">
            <span :class="getScoreClass(detailRecord.blurScore)">{{ detailRecord.blurScore ?? '-' }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="冻结检测">
            <span :class="getScoreClass(detailRecord.freezeScore)">{{ detailRecord.freezeScore ?? '-' }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="遮挡检测">
            <span :class="getScoreClass(detailRecord.obstructionScore)">{{ detailRecord.obstructionScore ?? '-' }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="偏色检测">
            <span :class="getScoreClass(detailRecord.colorScore)">{{ detailRecord.colorScore ?? '-' }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="条纹检测">
            <span :class="getScoreClass(detailRecord.stripeScore)">{{ detailRecord.stripeScore ?? '-' }}</span>
          </a-descriptions-item>
        </a-descriptions>

        <template v-if="detailJsonParsed">
          <a-divider>详细数据</a-divider>
          <pre class="detail-json">{{ detailJsonParsed }}</pre>
        </template>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { BasicTable, useTable } from '@/components/Table';
import {
  pageInspectionRecords,
  OVERALL_COLOR_MAP,
  OVERALL_LABEL_MAP,
  ANOMALY_TYPE_LABEL_MAP,
  type InspectionRecord,
} from '@/api/device/inspection';
import { getResultColumns, getResultFormConfig } from './Data';

defineOptions({ name: 'InspectionResultPage' });

// ---- 表格 ----
const [registerTable, { reload }] = useTable({
  title: '巡检记录',
  api: async (params) => {
    const res: any = await pageInspectionRecords({
      pageNo: params.page || 1,
      pageSize: params.pageSize || 10,
      deviceId: params.deviceId || undefined,
      overall: params.overall || undefined,
    });
    return { items: res.list ?? [], total: res.total ?? 0 };
  },
  columns: getResultColumns(),
  useSearchForm: true,
  formConfig: getResultFormConfig(),
  pagination: true,
  showTableSetting: false,
  showIndexColumn: false,
  rowKey: 'id',
  immediate: false,
  fetchSetting: { listField: 'items', totalField: 'total' },
});

// ---- 详情弹窗 ----
const detailModalOpen = ref(false);
const detailRecord = ref<InspectionRecord | null>(null);
const detailJsonParsed = ref<string>('');

function openDetailModal(record: InspectionRecord) {
  detailRecord.value = record;
  try {
    const detail = (record as any).detailJson || (record as any).detail_json;
    if (detail) {
      const parsed = typeof detail === 'string' ? JSON.parse(detail) : detail;
      detailJsonParsed.value = JSON.stringify(parsed, null, 2);
    } else {
      detailJsonParsed.value = '';
    }
  } catch {
    detailJsonParsed.value = '';
  }
  detailModalOpen.value = true;
}

function closeDetailModal() {
  detailModalOpen.value = false;
  detailRecord.value = null;
  detailJsonParsed.value = '';
}

// ---- 工具 ----
function formatTime(val?: string) {
  if (!val) return '-';
  try {
    return new Date(val).toLocaleString('zh-CN', { hour12: false });
  } catch {
    return val;
  }
}

function getScoreClass(score?: number): string {
  if (score == null) return '';
  if (score >= 80) return 'score-good';
  if (score >= 60) return 'score-warn';
  return 'score-bad';
}

onMounted(() => {
  reload();
});
</script>

<style lang="less" scoped>
.inspection-result-page {
  padding: 16px;
  min-height: 100%;
  background: #fff;
}

.detail-json {
  background: #f6f8fa;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 12px;
  line-height: 1.6;
  max-height: 400px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}

.score-good {
  color: #52c41a;
  font-weight: 500;
}

.score-warn {
  color: #faad14;
  font-weight: 500;
}

.score-bad {
  color: #ff4d4f;
  font-weight: 500;
}
</style>
