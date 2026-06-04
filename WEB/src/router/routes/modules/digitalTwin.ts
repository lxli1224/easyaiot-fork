import type { AppRouteModule } from '@/router/types'

import { LAYOUT } from '@/router/constant'

const digitalTwin: AppRouteModule = {
  path: '/digital-twin',
  name: 'DigitalTwin',
  component: LAYOUT,
  redirect: '/digital-twin/index',
  meta: {
    orderNo: 5,
    icon: 'ant-design:environment-outlined',
    title: '数字孪生',
    hideMenu: false,
    hideChildrenInMenu: true,
    affix: false,
  },
  children: [
    {
      path: 'index',
      name: 'DigitalTwinIndex',
      component: () => import('@/views/digitaltwin/index.vue'),
      meta: {
        title: '数字孪生',
        icon: 'ant-design:environment-outlined',
        hideMenu: true,
        hideBreadcrumb: false,
        hideTab: false,
        affix: false,
      },
    },
  ],
}

export default digitalTwin
