<template>
  <el-header class="page_header">
    <i class="expand_icon">
      <component :is="isCollapse ? Expand : Fold" @click="toggleCollapse" />
    </i>
    <div class="page_header_right">
      <el-dropdown>
        <el-icon :size="18" class="notice_icon"><bell /></el-icon>
        <template #dropdown>
          <el-dropdown-menu style="padding: 0">
            <div class="notice_wrapper">
              <div class="notice_title">通知</div>
              <div class="notice_content"></div>
              <div class="notice_footer">
                <el-button size="small">查看更多</el-button>
              </div>
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <div class="user_dropdown">
          <el-avatar :size="30" :src="''" :icon="UserFilled"></el-avatar>
          <el-space size="small" spacer="|">
            <span>触点成长</span>
            <span>admin</span>
          </el-space>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Setting">帐号设置</el-dropdown-item>
            <el-dropdown-item :icon="CopyDocument" divided>切换后台</el-dropdown-item>
            <el-dropdown-item :icon="QuestionFilled" divided>帮助中心</el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { Fold, Expand, Bell, UserFilled, Setting, QuestionFilled, CopyDocument, SwitchButton } from '@element-plus/icons'

export default defineComponent({
  name: 'PageHeader',
  components: { Bell },
  setup() {
    const store = useStore()
    const isCollapse = computed<boolean>(() => store.state.isCollapse)

    const toggleCollapse = () => {
      store.commit('toggleCollapse')
    }

    const logout = () => {
      store.dispatch('logout')
    }

    return {
      isCollapse,
      toggleCollapse,
      logout,
      Fold,
      UserFilled,
      Expand,
      Setting,
      SwitchButton,
      QuestionFilled,
      CopyDocument
    }
  }
})
</script>
<style lang="scss" scoped>
.page_header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 9;
}
.expand_icon svg {
  width: 20px;
  cursor: pointer;
}
.page_header_right {
  display: flex;
  align-items: center;
}
.user_dropdown {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
.notice_icon {
  margin-right: 20px;
}
.notice_wrapper {
  width: 300px;
  .notice_title {
    color: $themeColor;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
  }
  .notice_content {
    border-top: 1px solid $borderColorGray;
    border-bottom: 1px solid $borderColorGray;
    min-height: 100px;
  }
  .notice_footer {
    padding: 10px 20px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
