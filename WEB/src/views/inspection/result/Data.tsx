import type { BasicColumn, FormProps } from '@/components/Table';

export function getResultFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 80,
    baseColProps: { span: 6 },
    actionColOptions: { span: 6, offset: 12, style: { textAlign: 'right' } },
    schemas: [
      {
        field: 'deviceId',
        label: '设备 ID',
        component: 'Input',
        componentProps: { placeholder: '请输入设备 ID' },
      },
      {
        field: 'overall',
        label: '结果状态',
        component: 'Select',
        componentProps: {
          placeholder: '全部',
          options: [
            { value: '', label: '全部' },
            { value: 'NORMAL', label: '正常' },
            { value: 'ANOMALY', label: '异常' },
            { value: 'ERROR', label: '错误' },
          ],
        },
      },
    ],
  };
}

export function getResultColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 140,
    },
    {
      title: '设备 ID',
      dataIndex: 'deviceId',
      width: 140,
    },
    {
      title: '巡检结果',
      dataIndex: 'overall',
      width: 90,
    },
    {
      title: '异常类型',
      dataIndex: 'anomalyType',
      width: 100,
    },
    {
      title: '信号',
      dataIndex: 'signalScore',
      width: 65,
      align: 'center',
    },
    {
      title: '模糊',
      dataIndex: 'blurScore',
      width: 65,
      align: 'center',
    },
    {
      title: '冻结',
      dataIndex: 'freezeScore',
      width: 65,
      align: 'center',
    },
    {
      title: '遮挡',
      dataIndex: 'obstructionScore',
      width: 65,
      align: 'center',
    },
    {
      title: '偏色',
      dataIndex: 'colorScore',
      width: 65,
      align: 'center',
    },
    {
      title: '条纹',
      dataIndex: 'stripeScore',
      width: 65,
      align: 'center',
    },
    {
      title: '检查时间',
      dataIndex: 'checkedAt',
      width: 170,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 80,
      fixed: 'right',
    },
  ];
}
