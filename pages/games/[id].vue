<script setup lang="ts">
const route = useRoute()
const { setNavbarTheme } = useTheme()

const gameId = computed(() => route.params.id as string)

const handleThemeChange = (theme: any) => {
  setNavbarTheme(theme)
}

definePageMeta({
  layout: 'immersive'
})
</script>

<template>
  <Games :target-game-id="gameId" @theme-change="handleThemeChange" />
</template>
