<template>
  <div class="inspection-plan-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="toolbar-buttons">
          <a-button type="primary" @click="openPlanModal()">
            <template #icon><PlusOutlined /></template>
            新建计划
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'cycle'">
          <a-tag>{{ CYCLE_LABEL_MAP[record.cycle] || record.cycle }}</a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'cron'">
          <span v-if="record.cycle === 'CUSTOM' && record.cron">
            <a-tooltip :title="record.cron">
              <code class="cron-code">{{ record.cron }}</code>
            </a-tooltip>
          </span>
          <span v-else>-</span>
        </template>
        <template v-else-if="column.dataIndex === 'devices'">
          <span>{{ record.devices?.length ?? 0 }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'enabled'">
          <a-tag :color="record.enabled ? 'green' : 'default'">
            {{ record.enabled ? '已启用' : '已停用' }}
          </a-tag>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ formatTime(record.createTime) }}
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <TableAction :actions="getTableActions(record)" />
        </template>
      </template>
    </BasicTable>

    <!-- 新建/编辑弹窗 -->
    <a-modal
      v-model:open="planModalOpen"
      :title="editingPlan ? '编辑巡检计划' : '新建巡检计划'"
      width="680px"
      :confirm-loading="planSaving"
      @ok="handlePlanSave"
      @cancel="closePlanModal"
    >
      <a-form
        ref="planFormRef"
        :model="planForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        :rules="planFormRules"
      >
        <a-form-item label="计划名称" name="name">
          <a-input v-model:value="planForm.name" placeholder="请输入计划名称" />
        </a-form-item>
        <a-form-item label="计划编号" name="code">
          <a-input v-model:value="planForm.code" placeholder="请输入计划编号（英文标识）" />
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="planForm.description" placeholder="请输入描述" :rows="2" />
        </a-form-item>
        <a-form-item label="巡检周期" name="cycle">
          <a-radio-group v-model:value="planForm.cycle">
            <a-radio-button value="DAILY">每天</a-radio-button>
            <a-radio-button value="WEEKLY">每周</a-radio-button>
            <a-radio-button value="CUSTOM">自定义</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="planForm.cycle === 'CUSTOM'" label="Cron 表达式" name="cron">
          <a-input v-model:value="planForm.cron" placeholder="例如：0 30 8 * * ?" />
        </a-form-item>
        <a-form-item label="绑定设备" name="devices">
          <a-select
            v-model:value="planForm.devices"
            mode="multiple"
            placeholder="请选择绑定的设备"
            :options="deviceOptions"
            :filter-option="filterDeviceOption"
            :show-search="true"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="状态" name="enabled">
          <a-switch v-model:checked="planForm.enabled" checked-children="启用" un-checked-children="停用" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { BasicTable, TableAction, useTable } from '@/components/Table';
import { getDevicesList } from '@/api/device/devices';
import {
  pageInspectionPlans,
  createInspectionPlan,
  updateInspectionPlan,
  deleteInspectionPlan,
  toggleInspectionPlan,
  runInspectionTask,
  parseInspectionError,
  CYCLE_LABEL_MAP,
  type InspectionPlan,
} from '@/api/device/inspection';
import { getPlanColumns, getPlanFormConfig } from './Data';

defineOptions({ name: 'InspectionPlanPage' });

const { createMessage } = useMessage();

// ---- 表格 ----
const [registerTable, { reload }] = useTable({
  title: '巡检计划列表',
  api: async (params) => {
    const res: any = await pageInspectionPlans({
      pageNo: params.page || 1,
      pageSize: params.pageSize || 10,
    });
    const list = (res.list ?? []).map((item: any) => ({
      ...item,
      devices: Array.isArray(item.devices) ? item.devices : [],
    }));
    return { items: list, total: res.total ?? 0 };
  },
  columns: getPlanColumns(),
  useSearchForm: true,
  formConfig: getPlanFormConfig(),
  pagination: true,
  showTableSetting: false,
  showIndexColumn: false,
  rowKey: 'id',
  immediate: false,
  fetchSetting: { listField: 'items', totalField: 'total' },
});

// ---- 弹窗 ----
const planModalOpen = ref(false);
const planSaving = ref(false);
const editingPlan = ref<InspectionPlan | null>(null);
const planFormRef = ref();

const planForm = reactive<{
  name: string;
  code: string;
  description: string;
  cycle: string;
  cron: string;
  devices: string[];
  enabled: boolean;
}>({
  name: '',
  code: '',
  description: '',
  cycle: 'DAILY',
  cron: '',
  devices: [],
  enabled: true,
});

const planFormRules = {
  name: [{ required: true, message: '请输入计划名称' }],
  code: [{ required: true, message: '请输入计划编号' }],
  cycle: [{ required: true, message: '请选择巡检周期' }],
  cron: [
    {
      required: true,
      message: '请输入 Cron 表达式',
      trigger: 'change',
      validator: (_rule: any, _value: any) => {
        if (planForm.cycle === 'CUSTOM' && !planForm.cron) {
          return Promise.reject('请输入 Cron 表达式');
        }
        return Promise.resolve();
      },
    },
  ],
};

const deviceOptions = ref<{ label: string; value: string }[]>([]);

function openPlanModal(record?: InspectionPlan) {
  editingPlan.value = record || null;
  if (record) {
    planForm.name = record.name;
    planForm.code = record.code;
    planForm.description = record.description || '';
    planForm.cycle = record.cycle;
    planForm.cron = record.cron || '';
    planForm.devices = Array.isArray(record.devices) ? [...record.devices] : [];
    planForm.enabled = record.enabled;
  } else {
    planForm.name = '';
    planForm.code = '';
    planForm.description = '';
    planForm.cycle = 'DAILY';
    planForm.cron = '';
    planForm.devices = [];
    planForm.enabled = true;
  }
  planModalOpen.value = true;
}

function closePlanModal() {
  planModalOpen.value = false;
  planFormRef.value?.resetFields?.();
}

async function handlePlanSave() {
  try {
    await planFormRef.value?.validate?.();
  } catch {
    return;
  }
  planSaving.value = true;
  try {
    const data = {
      name: planForm.name,
      code: planForm.code,
      description: planForm.description,
      cycle: planForm.cycle,
      cron: planForm.cycle === 'CUSTOM' ? planForm.cron : undefined,
      devices: planForm.devices,
      enabled: planForm.enabled,
    };
    if (editingPlan.value) {
      await updateInspectionPlan({ id: editingPlan.value.id, ...data });
      createMessage.success('更新成功');
    } else {
      await createInspectionPlan(data);
      createMessage.success('创建成功');
    }
    closePlanModal();
    reload();
  } catch (e: unknown) {
    createMessage.error(parseInspectionError(e, '保存失败'));
  } finally {
    planSaving.value = false;
  }
}

async function handleDelete(record: InspectionPlan) {
  try {
    await deleteInspectionPlan(record.id);
    createMessage.success('删除成功');
    reload();
  } catch (e: unknown) {
    createMessage.error(parseInspectionError(e, '删除失败'));
  }
}

async function handleToggle(record: InspectionPlan) {
  try {
    await toggleInspectionPlan(record.id);
    createMessage.success(record.enabled ? '已停用' : '已启用');
    reload();
  } catch (e: unknown) {
    createMessage.error(parseInspectionError(e, '操作失败'));
  }
}

async function handleRun(record: InspectionPlan) {
  try {
    await runInspectionTask(record.id);
    createMessage.success('巡检任务已触发');
  } catch (e: unknown) {
    createMessage.error(parseInspectionError(e, '触发失败'));
  }
}

function getTableActions(record: InspectionPlan) {
  return [
    {
      icon: 'ant-design:eye-outlined',
      tooltip: '查看',
      onClick: () => openPlanModal(record),
    },
    {
      icon: 'ant-design:edit-filled',
      tooltip: '编辑',
      onClick: () => openPlanModal(record),
    },
    {
      icon: 'ant-design:play-circle-outlined',
      tooltip: '手动触发',
      popConfirm: {
        title: `确定要手动触发「${record.name}」的巡检任务？`,
        confirm: () => handleRun(record),
      },
    },
    {
      icon: record.enabled
        ? 'ant-design:pause-circle-outlined'
        : 'ant-design:check-circle-outlined',
      tooltip: record.enabled ? '停用' : '启用',
      popConfirm: {
        title: record.enabled
          ? `确定要停用「${record.name}」？`
          : `确定要启用「${record.name}」？`,
        confirm: () => handleToggle(record),
      },
    },
    {
      icon: 'material-symbols:delete-outline-rounded',
      tooltip: '删除',
      popConfirm: {
        title: `确定删除「${record.name}」？`,
        confirm: () => handleDelete(record),
      },
    },
  ];
}

function formatTime(val?: string) {
  if (!val) return '-';
  try {
    return new Date(val).toLocaleString('zh-CN', { hour12: false });
  } catch {
    return val;
  }
}

function filterDeviceOption(input: string, option: any) {
  return option.label?.toLowerCase().includes(input.toLowerCase());
}

// ---- 加载设备列表 ----
async function loadDeviceOptions() {
  try {
    const res: any = await getDevicesList({ page: 1, pageSize: 500 });
    const list = res.data || res.rows || [];
    deviceOptions.value = (Array.isArray(list) ? list : []).map((d: any) => ({
      label: `${d.deviceName || d.name || d.id} (${d.deviceIdentification || d.id})`,
      value: String(d.id),
    }));
  } catch {
    deviceOptions.value = [];
  }
}

onMounted(async () => {
  await loadDeviceOptions();
  reload();
});
</script>

<style lang="less" scoped>
.inspection-plan-page {
  padding: 16px;
  min-height: 100%;
  background: #fff;
}

.toolbar-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cron-code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}
</style>
