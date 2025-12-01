<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="min-h-screen bg-background text-on-background overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300">
    <Navbar
      :current-view="''"
      :theme-override="null"
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
    />

    <main class="relative">
      <slot />
    </main>
  </div>
</template>
