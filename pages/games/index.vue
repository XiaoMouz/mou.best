<script setup lang="ts">
const { setNavbarTheme } = useTheme()

const handleThemeChange = (theme: any) => {
  setNavbarTheme(theme)
}

definePageMeta({
  layout: 'immersive'
})
</script>

<template>
  <Games :target-game-id="null" @theme-change="handleThemeChange" />
</template>
