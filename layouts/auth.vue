<script setup lang="ts">
const main = ref(null)
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
<template>
  <div class="flex min-h-screen flex-col">
    <section class="flex-1 flex justify-center">
      <slot />
    </section>
  </div>
</template>

<style scoped></style>
