<template>
  <div class="min-h-screen bg-background text-on-background overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300">
    <BackgroundGlow v-if="!isImmersiveView" />

    <Navbar
      :current-view="navActiveView"
      :theme-override="navbarTheme"
      :is-dark="isDark"
      @navigate="handleNavigate"
      @toggle-theme="toggleTheme"
    />

    <main class="relative">
      <Hero v-if="currentView === 'home'" @navigate="handleNavigate" />
      <About v-else-if="currentView === 'about'" />
      <Articles v-else-if="currentView === 'articles'" @view-article="handleViewArticle" />

      <!-- Placeholder for other views -->
      <div v-else class="relative z-10 py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-on-background mb-4">
          {{ currentView }}
        </h2>
        <p class="text-on-surface-variant">
          This section is under construction
        </p>
        <button
          @click="handleNavigate('home')"
          class="mt-8 px-6 py-3 bg-primary text-on-primary rounded-full hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </main>

    <footer v-if="!isImmersiveView && currentView !== 'article' && currentView !== 'resume'" class="relative z-10 py-12 text-center border-t border-outline-variant/10 bg-surface/50 backdrop-blur-sm mt-12">
      <p class="text-on-surface-variant text-sm">© {{ new Date().getFullYear() }} XiaoMouz. All rights reserved.</p>
      <div class="mt-4 flex justify-center gap-4 text-xs text-outline">
        <span>Material Design 3</span>
        <span>•</span>
        <span>Nuxt 3</span>
        <span>•</span>
        <span>Tailwind</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { currentView, activeArticleId, navigate, viewArticle } = usePortfolio()
const { isDark, navbarTheme, initTheme, toggleTheme, resetNavbarTheme } = useTheme()

const isImmersiveView = computed(() => {
  return currentView.value.startsWith('games') || currentView.value.startsWith('media')
})

const navActiveView = computed(() => {
  if (currentView.value === 'resume') return ''
  if (activeArticleId.value) return 'articles'
  return currentView.value
})

const handleNavigate = (view: string) => {
  navigate(view)

  // Reset theme when leaving immersive views
  if (!view.startsWith('games') && !view.startsWith('media')) {
    resetNavbarTheme()
  }
}

const handleViewArticle = (id: number) => {
  viewArticle(id)
}

// Initialize theme on mount
onMounted(() => {
  initTheme()
})
</script>
