<script setup lang="ts">
const route = useRoute()
const { setNavbarTheme } = useTheme()

const mediaId = computed(() => route.params.id as string)

const handleThemeChange = (theme: any) => {
  setNavbarTheme(theme)
}

definePageMeta({
  layout: 'immersive'
})
</script>

<template>
  <Media :target-media-id="mediaId" @theme-change="handleThemeChange" />
</template>
