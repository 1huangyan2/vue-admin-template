<template>
  <el-result title="403" icon="error" sub-title="无权限访问">
    <template #extra>
      <el-button type="primary" size="medium">切换账号</el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Result403',
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
