<template>
  <div class="page_footer">
    <div class="help">
      <router-link to="/help">帮助</router-link>
      <router-link to="/help">隐私</router-link>
      <router-link to="/help">条款</router-link>
    </div>
    <div class="copy_right">copyright ©2020 深圳市前海触点成长教育科技有限公司</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageFooter',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.page_footer {
  font-size: 14px;
  color: #00000059;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 30px;
  a {
    color: #00000059;
    text-decoration: none;
    margin: 0 20px;
  }
  .copy_right {
    margin-top: 10px;
  }
}
</style>
