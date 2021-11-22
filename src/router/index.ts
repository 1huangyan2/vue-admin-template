import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import mainRoter from './main'
import { emptyPendingRequest } from '@/utils/request'

export type Meta = {
  permissions?: string[]
  [key: string]: any
  hideInMenu?: boolean
}

export type IRouterRecordRow = RouteRecordRaw & {
  icon?: any
  children?: Array<IRouterRecordRow>
  meta?: Meta
}

// 侧边导航
export const asideRouters: Array<IRouterRecordRow> = [...mainRoter]

const routes: Array<IRouterRecordRow> = [
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "AdminLayout" */ '@/layouts/admin/index.vue'),
    redirect: '/404',
    children: [
      ...asideRouters,
      {
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "login" */ '@/views/result/Result404.vue')
      }
    ]
  },
  {
    path: '/account',
    component: () => import(/* webpackChunkName: "account" */ '@/layouts/account/index.vue'),
    redirect: '/404',
    children: [
      {
        path: '/account/login',
        meta: {
          name: '登录'
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/account/login/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 修改浏览器导航栏标题
router.beforeEach((to, from, next) => {
  let documentTitle = '评价管理系统'
  if (to?.meta?.name) {
    documentTitle = to.meta.name + ' - 评价管理系统'
  }
  document.title = documentTitle
  emptyPendingRequest()
  next()
})

export default router
