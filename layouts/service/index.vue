<template>
  <div class="min-h-screen h-screen">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <NavDomain />
        <NavTopbar class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <NavUser />
        </div>
      </div>
    </div>
    <div class="p-4 min-h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false)

// read local storage dark mode
onMounted(() => {
  const darkModeStorage = localStorage.getItem('darkMode')
  if (darkModeStorage) {
    darkMode.value = JSON.parse(darkModeStorage)
  } else {
    // read device dark mode
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)')
    darkMode.value = darkModeMedia.matches
  }
  // add dark mode class
  watchEffect(() => {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      darkMode.value = e.matches
    })
})
</script>
