<script setup lang="ts">
useHead({
  script: [
    `(function () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'
      if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
    })()`,
  ],
})
useDark()
</script>

<template>
  <LoadingIndicator>
    <div class="flex items-center justify-center flex-col gap-4 h-screen">
      <UiLoading size-class="size-10" />
      <span class="ml-2 text-lg">Loading...</span>
    </div>
  </LoadingIndicator>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
@import url('./assets/css/uno.css');
</style>
