<template>
  <div v-if="havePermission">
    <slot name="header">
      <div class="hedder">
        <slot name="breadcrumb">
          <el-breadcrumb separator="/">
            <template v-for="item in breadcrumb" :key="item.path">
              <el-breadcrumb-item v-if="item.redirect">{{ item.meta?.name }}</el-breadcrumb-item>
              <el-breadcrumb-item v-else :to="{ path: item.path }">{{ item.meta?.name }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </slot>
        <h4 class="header_title" v-if="title">{{ route.meta?.name }}</h4>
        <slot name="title"></slot>
      </div>
    </slot>

    <div class="content_wrapper">
      <slot>
        <transition>
          <router-view></router-view>
        </transition>
      </slot>
    </div>
  </div>

  <Result403 v-else />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { State } from '@/store'
import Result403 from '@/views/result/Result403.vue'
import { Meta, IRouterRecordRow } from '@/router'

// 验证是否有权限访问当前页面
const authPerimission = (permissions: string[], meta?: Meta): boolean => {
  let permisions = meta?.permissions
  if (!permisions?.length) {
    return true
  }
  let menuPermission = false
  for (let i = 0; i < permisions.length; i++) {
    // 有权限访问改菜单
    if (permissions.includes(permisions[i])) {
      menuPermission = true
      break
    }
  }
  return menuPermission
}

export default defineComponent({
  name: 'ContentWrapper',
  components: {
    Result403
  },
  props: {
    title: {
      type: Boolean,
      default: () => true
    }
  },
  setup() {
    const route = useRoute()
    const store = useStore<State>()

    const breadcrumb: IRouterRecordRow[] = []

    const state = reactive({
      breadcrumb
    })

    let permissions = computed(() => store.state.userdata.permissions)
    const havePermission = ref<boolean>(false)

    watchEffect(() => {
      // 获取面包屑导航
      let breadcrumb = [] as IRouterRecordRow[]
      breadcrumb = [...route.matched]
      breadcrumb.shift()
      state.breadcrumb = breadcrumb
      // 判断是否有当前页面访问权限
      havePermission.value = authPerimission(permissions.value, route.meta)
    })

    return {
      ...toRefs(state),
      havePermission,
      route
    }
  }
})
</script>

<style scoped lang="scss">
.hedder {
  padding: 16px 24px;
  background-color: #ffffff;
}
.el-breadcrumb {
  margin-bottom: 16px;
}
.header_title {
  font-size: 20px;
}
.content_wrapper {
  margin: 24px;
  background: #ffffff;
  padding: 16px;
  border-radius: 2px;
}
</style>
