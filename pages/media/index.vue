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
  <Media :target-media-id="null" @theme-change="handleThemeChange" />
</template>
