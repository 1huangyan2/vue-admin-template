<template>
  <template v-for="menu in list">
    <el-sub-menu v-if="menu.children?.length" :key="menu.path" :index="menu.path">
      <template #title>
        <el-icon v-if="menu.icon" :size="14"><component :is="menu.icon" /></el-icon>

        <span class="menu_item_name">{{ menu?.meta?.name }}</span>
      </template>
      <AsideMenuTree :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :key="menu.path + ''" :index="menu.path">
      <el-icon v-if="menu.icon" :size="14"><component :is="menu.icon" /></el-icon>
      <span class="menu_item_name">{{ menu?.meta?.name }}</span>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, watchEffect } from 'vue'
import { IRouterRecordRow } from '@/router'
import { useStore } from 'vuex'
import { State } from '@/store'

// 过滤菜单
const authMenus = (menus: Array<IRouterRecordRow>, permissions: Array<string>) => {
  return menus.filter((menu) => {
    // 隐藏菜单
    if (menu.meta?.hideInMenu) {
      return false
    }
    // 过滤无权限访问菜单
    let menuPermissions = menu?.meta?.permissions
    if (menuPermissions?.length) {
      let menuPermission = false
      for (let i = 0; i < menuPermissions.length; i++) {
        // 有权限访问该菜单
        if (permissions.includes(menuPermissions[i])) {
          menuPermission = true
          break
        }
      }
      // 无权限访问改菜单
      if (menuPermission === false) {
        return false
      }
    }
    // 递归过滤子菜单
    if (menu.children) {
      menu.children = authMenus(menu.children, permissions)
    }
    return true
  })
}

export default defineComponent({
  name: 'AsideMenuTree',
  props: {
    menus: {
      type: Array as PropType<IRouterRecordRow[]>,
      default: () => []
    }
  },
  setup(props) {
    const store = useStore<State>()

    let permissions = computed(() => store.state.userdata.permissions)

    let list: any = ref([])
    watchEffect(() => {
      // 过滤不显示菜单
      list.value = authMenus(props.menus, permissions.value)
    })

    return {
      list
    }
  }
})
</script>
<style lang="scss" scoped></style>
