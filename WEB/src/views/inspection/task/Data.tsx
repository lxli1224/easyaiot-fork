import type { BasicColumn, FormProps } from '@/components/Table';

export function getTaskFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 80,
    baseColProps: { span: 6 },
    actionColOptions: { span: 6, offset: 12, style: { textAlign: 'right' } },
    schemas: [
      {
        field: 'planId',
        label: '所属计划',
        component: 'Input',
        componentProps: { placeholder: '请输入计划 ID' },
      },
    ],
  };
}

export function getTaskColumns(): BasicColumn[] {
  return [
    {
      title: '任务 ID',
      dataIndex: 'id',
      width: 70,
    },
    {
      title: '所属计划',
      dataIndex: 'planName',
      width: 150,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      width: 90,
    },
    {
      title: '触发类型',
      dataIndex: 'triggerType',
      width: 90,
    },
    {
      title: '设备数',
      dataIndex: 'deviceCount',
      width: 70,
      align: 'center',
    },
    {
      title: '已完成',
      dataIndex: 'finishedCount',
      width: 70,
      align: 'center',
    },
    {
      title: '异常数',
      dataIndex: 'anomalyCount',
      width: 70,
      align: 'center',
    },
    {
      title: '错误数',
      dataIndex: 'errorCount',
      width: 70,
      align: 'center',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      width: 170,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 170,
    },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      width: 160,
    },
  ];
}
