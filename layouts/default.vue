<script setup lang="ts">
const route = useRoute()
const { isDark, navbarTheme, toggleTheme, initTheme } = useTheme()

// Determine if we're in an immersive view (games or media)
const isImmersiveView = computed(() => {
  return route.path.startsWith('/games') || route.path.startsWith('/media')
})

// Determine nav active view for highlighting
const navActiveView = computed(() => {
  if (route.path === '/resume') return ''
  if (route.path.startsWith('/articles')) return 'articles'
  if (route.path.startsWith('/games')) return 'games'
  if (route.path.startsWith('/media')) return 'media'
  if (route.path.startsWith('/about')) return 'about'
  if (route.path.startsWith('/friends')) return 'friends'
  return 'home'
})

// Show footer on most pages except resume, article detail, and immersive views
const showFooter = computed(() => {
  return (
    !isImmersiveView.value &&
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
    <BackgroundGlow v-if="!isImmersiveView" />

    <Navbar
      :current-view="navActiveView"
      :theme-override="navbarTheme"
      :is-dark="isDark"
      @toggle-theme="toggleTheme"
    />

    <main class="relative flex-1">
      <NuxtPage />
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
