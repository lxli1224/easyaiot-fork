import type { BasicColumn, FormProps } from '@/components/Table';

export function getPlanFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 80,
    baseColProps: { span: 6 },
    actionColOptions: { span: 6, offset: 12, style: { textAlign: 'right' } },
    schemas: [
      {
        field: 'name',
        label: '计划名称',
        component: 'Input',
        componentProps: { placeholder: '请输入计划名称' },
      },
    ],
  };
}

export function getPlanColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '计划名称',
      dataIndex: 'name',
      width: 160,
    },
    {
      title: '计划编号',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: '巡检周期',
      dataIndex: 'cycle',
      width: 90,
    },
    {
      title: 'Cron 表达式',
      dataIndex: 'cron',
      width: 130,
    },
    {
      title: '绑定设备数',
      dataIndex: 'devices',
      width: 80,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 170,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 260,
      fixed: 'right',
    },
  ];
}
