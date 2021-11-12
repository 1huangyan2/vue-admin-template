import { createStore } from 'vuex'
import { switchAdmin } from '@/services/account'
import router from '@/router'
import { setToken } from '@/localStorages/token'

export interface State {
  isCollapse: boolean
  activeMenu: string
  userdata: UserData
}

interface UserData {
  permissions: string[]
}

export default createStore<State>({
  state: {
    isCollapse: false,
    activeMenu: '',
    userdata: {
      permissions: ['main.home', 'main.system', 'main.system.role', 'main.system.role.add', 'main.system.role.edit']
    }
  },
  mutations: {
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    saveActiveMenu(state, { payload }: { payload: { activeMenu: string } }) {
      state.activeMenu = payload.activeMenu
    },
    saveUserData(state, { payload }: { payload: { usedata: UserData } }) {
      console.log(payload.usedata)
      state.userdata = payload.usedata
    }
  },
  actions: {
    // 切换后台
    async switchAdmin(_, { payload }) {
      const { data, code } = await switchAdmin(payload)
      if (code === 0 && data) {
        // 跳首页， 渲染路由
        router.push('/main/home')
        setToken(data.access_token)
      }
    }
  },
  modules: {}
})
