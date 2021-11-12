import { IRouterRecordRow } from './index'
import { HomeFilled, Setting } from '@element-plus/icons'
import { RouterView } from 'vue-router'

const mainRoter: Array<IRouterRecordRow> = [
  {
    path: '/main/home',
    icon: HomeFilled,
    meta: {
      name: '首页',
      permissions: ['main.home']
    },
    component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/home/index.vue')
  },
  {
    path: '/main/system',
    icon: Setting,
    meta: {
      name: '系统设置',
      permissions: ['main.system']
    },
    redirect: '/404',
    component: RouterView,
    children: [
      {
        path: '/main/system/role',
        meta: {
          name: '角色管理',
          permissions: ['main.system.role']
        },
        component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/system/role/index.vue'),
        children: [
          {
            path: '/main/system/role/add',
            meta: {
              name: '添加角色',
              permissions: ['main.system.role.add'],
              hideInMenu: true
            },
            component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/home/index.vue')
          },
          {
            path: '/main/system/role/:id',
            meta: {
              name: '编辑角色',
              permissions: ['main.system.role.edit'],
              hideInMenu: true
            },
            component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/home/index.vue')
          }
        ]
      },
      {
        path: '/main/system/user',
        meta: {
          name: '用户管理',
          permissions: ['main.system.user']
        },
        component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/home/index.vue')
      }
    ]
  }
]

export default mainRoter
