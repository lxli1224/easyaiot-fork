import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';

const inspection: AppRouteModule = {
  path: '/inspection',
  name: 'Inspection',
  component: LAYOUT,
  redirect: '/inspection/dashboard',
  meta: {
    orderNo: 60,
    icon: 'ant-design:security-scan-outlined',
    title: '巡检管理',
    hideChildrenInMenu: false,
  },
  children: [
    {
      path: 'dashboard',
      name: 'InspectionDashboard',
      component: () => import('@/views/inspection/dashboard/index.vue'),
      meta: {
        title: '巡检仪表盘',
        icon: 'ant-design:dashboard-outlined',
      },
    },
    {
      path: 'plan',
      name: 'InspectionPlan',
      component: () => import('@/views/inspection/plan/index.vue'),
      meta: {
        title: '巡检计划',
        icon: 'ant-design:schedule-outlined',
      },
    },
    {
      path: 'task',
      name: 'InspectionTask',
      component: () => import('@/views/inspection/task/index.vue'),
      meta: {
        title: '巡检任务',
        icon: 'ant-design:unordered-list-outlined',
      },
    },
    {
      path: 'result',
      name: 'InspectionResult',
      component: () => import('@/views/inspection/result/index.vue'),
      meta: {
        title: '巡检记录',
        icon: 'ant-design:file-search-outlined',
      },
    },
  ],
};

export default inspection;
