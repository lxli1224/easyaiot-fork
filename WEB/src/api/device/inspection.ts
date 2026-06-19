/**
 * 视频质量巡检接口
 *
 * 后端服务 Gateway 路由：/admin-api/inspection/** → 127.0.0.1:48088
 * 前端通过 /dev-api 基址请求，即 /dev-api/inspection/**
 */
import { defHttp } from '@/utils/http/axios';

const INSPECTION_PREFIX = '/inspection';

const SUCCESS_CODES = new Set([0, 200]);

/** 解析巡检接口错误消息 */
export function parseInspectionError(error: unknown, fallback = '操作失败'): string {
  if (error == null) return fallback;
  if (typeof error === 'string') {
    return /^Request failed with status code \d+$/i.test(error) ? fallback : error;
  }
  const e = error as { message?: string; response?: { data?: { msg?: string } } };
  const bodyMsg = e.response?.data?.msg;
  if (typeof bodyMsg === 'string' && bodyMsg.trim()) return bodyMsg.trim();
  const msg = e.message;
  if (typeof msg === 'string' && msg && !/^Request failed with status code \d+$/i.test(msg)) {
    return msg;
  }
  return fallback;
}

/** 通用 GET/POST/PUT/DELETE 封装 */
const commonApi = <T = any>(
  method: 'get' | 'post' | 'delete' | 'put',
  url: string,
  options: { params?: any; data?: any } = {},
): Promise<T> => {
  defHttp.setHeader({ 'X-Authorization': 'Bearer ' + localStorage.getItem('jwt_token') });
  return defHttp[method](
    {
      url,
      headers: {
        // @ts-ignore
        ignoreCancelToken: true,
      },
      ...(method === 'get' || method === 'delete'
        ? { params: options.params }
        : { data: options.data || options.params }),
    },
    { isTransformResponse: true, errorMessageMode: 'none' },
  ) as Promise<T>;
};

/** 分页列表通用响应 */
export interface PageResult<T> {
  code: number;
  msg: string;
  data: {
    list: T[];
    total: number;
  };
}

/** ========== 巡检计划 ========== */

export interface InspectionPlan {
  id: number;
  name: string;
  code: string;
  description?: string;
  cycle: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  cron?: string;
  devices: string[];
  enabled: boolean;
  createTime?: string;
}

export interface PlanPageParams {
  pageNo?: number;
  pageSize?: number;
}

/** 分页查询巡检计划 */
export const pageInspectionPlans = (params: PlanPageParams) =>
  commonApi<PageResult<InspectionPlan>>('get', `${INSPECTION_PREFIX}/plan/page`, { params });

/** 查询单个巡检计划 */
export const getInspectionPlan = (id: number) =>
  commonApi<{ code: number; msg: string; data: InspectionPlan }>(
    'get',
    `${INSPECTION_PREFIX}/plan/get`,
    { params: { id } },
  );

/** 创建巡检计划 */
export const createInspectionPlan = (data: Partial<InspectionPlan>) =>
  commonApi<{ code: number; msg: string; data: InspectionPlan }>(
    'post',
    `${INSPECTION_PREFIX}/plan/create`,
    { data },
  );

/** 更新巡检计划 */
export const updateInspectionPlan = (data: Partial<InspectionPlan>) =>
  commonApi<{ code: number; msg: string; data: InspectionPlan }>(
    'put',
    `${INSPECTION_PREFIX}/plan/update`,
    { data },
  );

/** 删除巡检计划 */
export const deleteInspectionPlan = (id: number) =>
  commonApi<{ code: number; msg: string }>(
    'delete',
    `${INSPECTION_PREFIX}/plan/delete`,
    { params: { id } },
  );

/** 启用/停用巡检计划 */
export const toggleInspectionPlan = (id: number) =>
  commonApi<{ code: number; msg: string }>(
    'post',
    `${INSPECTION_PREFIX}/plan/toggle`,
    { params: { id } },
  );

/** ========== 巡检任务 ========== */

export interface InspectionTask {
  id: number;
  planId: number;
  planName: string;
  status: 'PENDING' | 'RUNNING' | 'FINISHED' | 'FAILED';
  triggerType: 'SCHEDULED' | 'MANUAL';
  deviceCount: number;
  finishedCount: number;
  anomalyCount: number;
  errorCount: number;
  startTime?: string;
  endTime?: string;
  errorMessage?: string;
}

export interface TaskPageParams {
  pageNo?: number;
  pageSize?: number;
  planId?: number;
}

/** 分页查询巡检任务 */
export const pageInspectionTasks = (params: TaskPageParams) =>
  commonApi<PageResult<InspectionTask>>('get', `${INSPECTION_PREFIX}/task/page`, { params });

/** 按计划查询任务列表 */
export const listTasksByPlan = (planId: number) =>
  commonApi<{ code: number; msg: string; data: InspectionTask[] }>(
    'get',
    `${INSPECTION_PREFIX}/task/listByPlan`,
    { params: { planId } },
  );

/** 手动触发巡检任务 */
export const runInspectionTask = (planId: number) =>
  commonApi<{ code: number; msg: string; data: InspectionTask }>(
    'post',
    `${INSPECTION_PREFIX}/task/run`,
    { params: { planId } },
  );

/** 更新任务状态 */
export const updateTaskStatus = (taskId: number, status: string) =>
  commonApi<{ code: number; msg: string }>(
    'post',
    `${INSPECTION_PREFIX}/task/updateStatus`,
    { data: { taskId, status } },
  );

/** ========== 巡检记录 ========== */

export interface InspectionRecord {
  id: number;
  deviceId: string;
  deviceName: string;
  checkedAt: string;
  overall: 'NORMAL' | 'ANOMALY' | 'ERROR';
  anomalyType?: 'signal_loss' | 'blur' | 'freeze' | 'obstruction' | 'color_cast' | 'stripe';
  /** 各维度检测分数 (0-100) */
  signalScore?: number;
  blurScore?: number;
  freezeScore?: number;
  obstructionScore?: number;
  colorScore?: number;
  stripeScore?: number;
}

export interface RecordPageParams {
  pageNo?: number;
  pageSize?: number;
  deviceId?: string;
  overall?: string;
}

/** 分页查询巡检记录 */
export const pageInspectionRecords = (params: RecordPageParams) =>
  commonApi<PageResult<InspectionRecord>>('get', `${INSPECTION_PREFIX}/page`, { params });

/** 最近巡检记录 */
export const listRecentRecords = () =>
  commonApi<{ code: number; msg: string; data: InspectionRecord[] }>(
    'get',
    `${INSPECTION_PREFIX}/list-recent`,
  );

/** 单设备最新巡检状态 */
export const getDeviceLatestRecord = (deviceId: string) =>
  commonApi<{ code: number; msg: string; data: InspectionRecord }>(
    'get',
    `${INSPECTION_PREFIX}/latest`,
    { params: { deviceId } },
  );

/** ========== 巡检结果（详细检测数据）========== */

export interface InspectionResult {
  id: number;
  taskId: number;
  planId: number;
  recordId: number;
  deviceId: string;
  deviceName: string;
  overall: 'NORMAL' | 'ANOMALY' | 'ERROR';
  anomalyType?: string;
  detailJson?: string;
  checkedAt?: string;
  /** 解析后的 detail_json */
  detail?: Record<string, any>;
}

export interface ResultPageParams {
  pageNo?: number;
  pageSize?: number;
  planId?: number;
}

/** 分页查询巡检结果 */
export const pageInspectionResults = (params: ResultPageParams) =>
  commonApi<PageResult<InspectionResult>>('get', `${INSPECTION_PREFIX}/result/page`, { params });

/** 按计划查询巡检结果 */
export const listResultsByPlan = (planId: number) =>
  commonApi<{ code: number; msg: string; data: InspectionResult[] }>(
    'get',
    `${INSPECTION_PREFIX}/result/listByPlan`,
    { params: { planId } },
  );

/** ========== 汇总统计 ========== */

export interface InspectionSummary {
  total: number;
  normal: number;
  anomaly: number;
  error: number;
  detectorAnomaly: {
    signal_loss: number;
    freeze: number;
    obstruction: number;
    stripe: number;
    blur: number;
    color_cast: number;
  };
}

/** 获取巡检汇总统计 */
export const getInspectionSummary = () =>
  commonApi<{ code: number; msg: string; data: InspectionSummary }>(
    'get',
    `${INSPECTION_PREFIX}/summarize`,
  );

/** Kafka 消费状态 */
export interface KafkaStatus {
  running: boolean;
  [key: string]: any;
}

/** 获取 Kafka 消费状态 */
export const getKafkaStatus = () =>
  commonApi<{ code: number; msg: string; data: KafkaStatus }>(
    'get',
    `${INSPECTION_PREFIX}/kafka/status`,
  );

/** ========== 工具函数 ========== */

/** 巡检结果状态 tag 颜色映射 */
export const OVERALL_COLOR_MAP: Record<string, string> = {
  NORMAL: 'green',
  ANOMALY: 'red',
  ERROR: 'orange',
};

/** 巡检结果状态中文名 */
export const OVERALL_LABEL_MAP: Record<string, string> = {
  NORMAL: '正常',
  ANOMALY: '异常',
  ERROR: '错误',
};

/** 异常类型中文名 */
export const ANOMALY_TYPE_LABEL_MAP: Record<string, string> = {
  signal_loss: '信号丢失',
  blur: '图像模糊',
  freeze: '画面冻结',
  obstruction: '遮挡',
  color_cast: '偏色',
  stripe: '条纹',
};

/** 任务状态 tag 颜色映射 */
export const TASK_STATUS_COLOR_MAP: Record<string, string> = {
  PENDING: 'default',
  RUNNING: 'processing',
  FINISHED: 'success',
  FAILED: 'error',
};

/** 任务状态中文名 */
export const TASK_STATUS_LABEL_MAP: Record<string, string> = {
  PENDING: '等待中',
  RUNNING: '执行中',
  FINISHED: '已完成',
  FAILED: '失败',
};

/** 周期中文名 */
export const CYCLE_LABEL_MAP: Record<string, string> = {
  DAILY: '每天',
  WEEKLY: '每周',
  CUSTOM: '自定义',
};
