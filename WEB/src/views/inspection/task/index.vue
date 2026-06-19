<template>
  <div class="inspection-task-page">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-tag :color="TASK_STATUS_COLOR_MAP[record.status]">
            {{ TASK_STATUS_LABEL_MAP[record.status] || record.status }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'triggerType'">
          <a-tag :color="record.triggerType === 'SCHEDULED' ? 'blue' : 'orange'">
            {{ record.triggerType === 'SCHEDULED' ? '定时触发' : '手动触发' }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'startTime'">
          {{ formatTime(record.startTime) }}
        </template>
        <template v-else-if="column.dataIndex === 'endTime'">
          {{ formatTime(record.endTime) }}
        </template>
        <template v-else-if="column.dataIndex === 'deviceCount'">
          <a-badge
            :count="record.finishedCount ?? 0"
            :overflow-count="record.deviceCount"
            :number-style="{ backgroundColor: '#52c41a' }"
          >
            <span>{{ record.deviceCount }}</span>
          </a-badge>
        </template>
        <template v-else-if="column.dataIndex === 'anomalyCount'">
          <span :style="{ color: record.anomalyCount > 0 ? '#ff4d4f' : '' }">
            {{ record.anomalyCount ?? 0 }}
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'errorCount'">
          <span :style="{ color: record.errorCount > 0 ? '#faad14' : '' }">
            {{ record.errorCount ?? 0 }}
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'errorMessage'">
          <span v-if="record.errorMessage" class="error-text" :title="record.errorMessage">
            {{ record.errorMessage }}
          </span>
          <span v-else>-</span>
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { BasicTable, useTable } from '@/components/Table';
import { pageInspectionTasks, TASK_STATUS_COLOR_MAP, TASK_STATUS_LABEL_MAP } from '@/api/device/inspection';
import { getTaskColumns, getTaskFormConfig } from './Data';

defineOptions({ name: 'InspectionTaskPage' });

const [registerTable, { reload }] = useTable({
  title: '巡检任务列表',
  api: async (params) => {
    const res: any = await pageInspectionTasks({
      pageNo: params.page || 1,
      pageSize: params.pageSize || 10,
      planId: params.planId || undefined,
    });
    return { items: res.list ?? [], total: res.total ?? 0 };
  },
  columns: getTaskColumns(),
  useSearchForm: true,
  formConfig: getTaskFormConfig(),
  pagination: true,
  showTableSetting: false,
  showIndexColumn: false,
  rowKey: 'id',
  immediate: false,
  fetchSetting: { listField: 'items', totalField: 'total' },
});

function formatTime(val?: string) {
  if (!val) return '-';
  try {
    return new Date(val).toLocaleString('zh-CN', { hour12: false });
  } catch {
    return val;
  }
}

onMounted(() => {
  reload();
});
</script>

<style lang="less" scoped>
.inspection-task-page {
  padding: 16px;
  min-height: 100%;
  background: #fff;
}

.error-text {
  display: block;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ff4d4f;
  font-size: 12px;
}
</style>
