<script setup lang="ts">
const menu = useHomeMeta().homeMeta

const isDark = useDark()
</script>
<template>
  <div
    class="absolute top-[30%] z-10 right-[10%] flex flex-col items-center justify-center gap-4"
  >
    <div class="p-1 bg-[#99999970] dark:bg-[#00000070] rounded-full">
      <div
        class="flex w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
        @click="isDark ? (isDark = false) : (isDark = true)"
      >
        <Transition name="fade">
          <Icon
            name="mdi:weather-night"
            class="absolute w-5 h-5"
            v-if="isDark"
          />
          <Icon name="mdi:weather-sunny" class="absolute w-5 h-5" v-else />
        </Transition>
      </div>
    </div>

    <div
      class="space-y-4 flex items-center justify-center flex-col bg-[#99999970] dark:bg-[#00000070] p-3 rounded-full"
    >
      <HomeMenuItem v-for="item in menu" v-bind:item="item" />
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
