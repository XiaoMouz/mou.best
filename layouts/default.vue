<script setup lang="ts">
const route = useRoute()
const { initTheme } = useTheme()

// Determine nav active view for highlighting
const navActiveView = computed(() => {
  if (route.path === '/resume') return ''
  if (route.path.startsWith('/articles')) return 'articles'
  if (route.path.startsWith('/about')) return 'about'
  if (route.path.startsWith('/friends')) return 'friends'
  return 'home'
})

// Show footer on most pages except resume and article detail
const showFooter = computed(() => {
  return (
    route.path !== '/resume' &&
    !route.path.match(/^\/articles\/\d+$/)
  )
})

// Initialize theme on mount
onMounted(() => {
  initTheme()
})

useHead({
  title: "Hello!I'm XiaoMouz",
  meta: [{ name: 'description', content: "Hello!I'm XiaoMouz" }],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-background text-on-background overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300"
  >
    <BackgroundGlow />

    <Navbar :current-view="navActiveView" />

    <main class="relative flex-1">
      <slot />
    </main>

    <footer
      v-if="showFooter"
      class="relative z-10 py-12 text-center border-t border-outline-variant/10 bg-surface/50 backdrop-blur-sm mt-12"
    >
      <p class="text-on-surface-variant text-sm">
        © {{ new Date().getFullYear() }} XiaoMouz. All rights reserved.
      </p>
      <div class="mt-4 flex justify-center gap-4 text-xs text-outline">
        <span>Material Design 3</span>
        <span>•</span>
        <span>Nuxt 3</span>
        <span>•</span>
        <span>UnoCSS</span>
      </div>
    </footer>
  </div>
</template>
