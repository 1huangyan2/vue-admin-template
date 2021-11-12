<template>
  <el-container class="is_wrapper" :class="{ 'is-collapse': isCollapse }">
    <PageAside />

    <el-container>
      <PageHeader />
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <PageFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageHeader from './components/PageHeader/index.vue'
import PageAside from './components/PageAside/index.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Adminlayout',
  components: {
    PageHeader,
    PageAside
  },
  setup() {
    const store = useStore()
    const isCollapse = computed<boolean>(() => store.state.isCollapse)
    return {
      isCollapse
    }
  }
})
</script>

<style lang="scss" scoped>
.el-container.is_wrapper {
  min-height: 100vh;
}
.el-main {
  padding: 0;
  overflow: initial;
}
</style>
