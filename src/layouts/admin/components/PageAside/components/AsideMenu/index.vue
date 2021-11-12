<template>
  <el-menu
    :default-active="activeMenu"
    class="aside-menu"
    :collapse-transition="true"
    background-color="#001529"
    text-color="#ffffffa6"
    active-text-color="#ffffff"
    :collapse="isCollapse"
    @select="selectMenu"
  >
    <AsideMenuTree :menus="menus" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AsideMenuTree from '../AsideMenuTree/index.vue'
import { asideRouters } from '@/router'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AsideMenu',
  props: {
    isCollapse: {
      default: false,
      type: Boolean
    }
  },
  components: {
    AsideMenuTree
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const activeMenu = computed<string>(() => store.state.activeMenu)

    const selectMenu = (path: string) => {
      router.push(path)
      store.commit('saveActiveMenu', { payload: { activeMenu: path } })
    }

    return {
      menus: asideRouters,
      activeMenu,
      selectMenu
    }
  }
})
</script>
<style lang="scss" scoped>
.aside-menu {
  border: none;
  overflow-y: auto;
  max-width: $pageAsideWidth;

  :deep(.el-menu-item) {
    &:hover {
      color: #ffffff;
    }
    &.is-active {
      background-color: $themeColor;
    }
  }
}
</style>
