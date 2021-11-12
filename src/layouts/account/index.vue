<template>
  <div class="page_wrapper">
    <main class="login_wrapper">
      <div class="login_left"></div>
      <div class="login_right">
        <el-image :src="logoImg" class="logo_img" />
        <div>
          <router-view></router-view>
        </div>
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const logoImg = require('@/assets/images/logo.png')

export default defineComponent({
  setup() {
    return {
      logoImg
    }
  }
})
</script>

<style scoped lang="scss">
.page_wrapper {
  min-height: 100vh;
  background-image: url(../../assets/images/login_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}
.login_wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}
.login_left,
.login_right {
  width: 483px;
  height: 560px;
}
.login_left {
  background-image: url(../../assets/images/login_left_banner.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.login_right {
  background: #ffffff;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  :deep(.submit_btn) {
    width: 100%;
  }
  :deep(.forget_password) {
    text-align: right;
    margin-bottom: 10px;
    .el-form-item__content {
      line-height: 1;
    }
    a {
      text-decoration: none;
      color: $themeColor;
      &:hover {
        text-decoration: revert;
      }
    }
  }
}

.logo_img {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  display: block;
}
</style>
