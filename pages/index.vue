<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

definePageMeta({
  auth: false,
})

const menu = useHomeMeta()

const selected = ref(menu.value[0].key)

const currentComponent = computed(() => {
  return menu.value.find((item) => item.active === true)?.component
})

const nestedProps = computed(() => {
  return menu.value.find((item) => item.active === true)?.props
})

onMounted(() => {})
</script>

<template>
  <HomeWelcome />
  <HomeMenu />
  <div class="relative bg-[#ffffff30] dark:bg-black-shadow w-full h-full">
    <div class="bg-inner"></div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <Transition name="fade">
        <component
          :is="currentComponent"
          :key="selected"
          v-bind="nestedProps"
        />
      </Transition>
    </div>
  </div>
  <div class="relative"></div>
</template>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(https://mou.best/images/banner.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
.fade-enter-active,
.fade-leave-active {
  /* 保持淡入淡出的动画，并且增加垂直移动 */
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  /* 初始透明度为0，表示完全透明 */
  opacity: 0;
  /* 在Y轴方向上向上或向下移动30px，根据实际需求调整 */
  transform: translateY(-100%);
}

.fade-enter-to,
.fade-leave-from {
  /* 结束时透明度为1，完全不透明 */
  opacity: 1;
  /* 结束时Y轴方向回到原点 */
  transform: translateY(0);
}
</style>
