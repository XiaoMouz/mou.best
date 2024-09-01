<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId()
const loading = ref(false)

onMounted(() => {
  loading.value = true
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div v-show="loading">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div v-show="!loading">
      <div class="flex items-center justify-center h-screen bg-black">
        <LoadingCycle class="border-gray-200" :size-class="`w-10 h-10`" />
      </div>
    </div>
  </ConfigProvider>
</template>

<style>
body {
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
}
</style>
