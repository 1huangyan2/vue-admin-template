<template>
  <el-result title="404" icon="error" sub-title="你访问的页面不存在">
    <template #extra>
      <el-button type="primary" size="medium">返回首页</el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Result404',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.el-result {
  height: 100%;
}
</style>
