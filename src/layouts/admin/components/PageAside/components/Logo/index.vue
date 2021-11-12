<template>
  <div class="aside_logo" :class="{ 'is-collapse': isCollapse }">
    <el-image class="logo_icon" :src="logoImg" />
    <div class="title">
      <p>中小学综合实践活动</p>
      <h4>评价管理系统</h4>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
const logoImg = require('@/assets/images/logo_icon.png')

export default defineComponent({
  name: 'Logo',
  props: {
    isCollapse: {
      default: false,
      type: Boolean
    }
  },
  setup() {
    return {
      logoImg
    }
  }
})
</script>

<style lang="scss" scoped>
.aside_logo {
  background-color: #002041;
  padding: 10px 18px;
  display: flex;
  transition: padding 400ms;
  &.is-collapse {
    padding-left: 14px;
    padding-right: 14px;
    .title {
      width: 0;
      opacity: 0;
    }
  }
}
.logo_icon {
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
}
.title {
  margin-left: 10px;
  transition: all 400ms;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  opacity: 1;
  p {
    color: #999999;
    font-size: 12px;
    line-height: 17px;
    margin-bottom: 4px;
  }
  h4 {
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    line-height: 28px;
  }
}
</style>
