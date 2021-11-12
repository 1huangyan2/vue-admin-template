<template>
  <el-aside :class="{ 'is-collapse': isCollapse }">
    <Logo :is-collapse="isCollapse" />
    <AsideMenu :is-collapse="isCollapse" />
  </el-aside>
  <div class="frand_aside" :class="{ 'is-collapse': isCollapse }"></div>
</template>

<script lang="ts">
import AsideMenu from './components/AsideMenu/index.vue'
import Logo from './components/Logo/index.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageAside',
  components: {
    AsideMenu,
    Logo
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

<style scoped lang="scss">
.el-aside {
  max-width: $pageAsideWidth;
  height: 100vh;
  background: #001529;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 400ms;
  display: flex;
  flex-direction: column;
  z-index: 99;

  &.is-collapse {
    width: 64px;
  }
}
.frand_aside {
  transition: width 400ms;
  width: $pageAsideWidth;
  &.is-collapse {
    width: 64px;
  }
}
</style>
