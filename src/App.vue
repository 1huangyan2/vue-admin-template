<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    watchEffect(() => {
      let activeMenu = route.path
      if (route.meta?.hideInMenu) {
        // 当前路由是隐藏菜单，选中上级侧边导航菜单
        for (let i = route.matched.length - 1; i > 0; i--) {
          let menu = route.matched[i]
          if (!menu.meta.hideInMenu) {
            activeMenu = menu.path
            break
          }
        }
      }
      store.commit('saveActiveMenu', { payload: { activeMenu } })
    })

    onMounted(() => {
      // setTimeout(() => {
      //   store.commit('saveUserData', { payload: { usedata: { permissions: ['main.home', 'main.system', 'main.system.role', 'main.system.role.add', 'main.system.role.edit'] } } })
      // }, 5000)
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #333333;
  font-size: 16px;
}
</style>
