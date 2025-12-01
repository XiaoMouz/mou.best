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
      <!-- Home -->
      <Hero v-if="currentView === 'home'" @navigate="handleNavigate" />

      <!-- About Page -->
      <AboutPage v-else-if="currentView === 'about'" />

      <!-- Friends Page -->
      <FriendsPage v-else-if="currentView === 'friends'" />

      <!-- Resume Page -->
      <Resume v-else-if="currentView === 'resume'" @back="() => handleNavigate('home')" />

      <!-- Articles List -->
      <Articles v-else-if="currentView === 'articles'" @view-article="handleViewArticle" />

      <!-- Article View -->
      <ArticleView
        v-else-if="currentView === 'article' && activeArticle"
        :item="activeArticle"
        :is-unlocked="isArticleUnlocked"
        @back="() => handleNavigate('articles')"
        @unlock="handleUnlockArticle"
      />

      <!-- Games View -->
      <Games
        v-else-if="isGameView"
        :target-game-id="currentView === 'games' ? null : currentView"
        @theme-change="handleThemeChange"
      />

      <!-- Media View -->
      <Media
        v-else-if="isMediaView"
        :target-media-id="currentView === 'media' ? null : currentView"
        @theme-change="handleThemeChange"
      />
    </main>

    <footer v-if="!isImmersiveView && currentView !== 'article' && currentView !== 'resume'" class="relative z-10 py-12 text-center border-t border-outline-variant/10 bg-surface/50 backdrop-blur-sm mt-12">
      <p class="text-on-surface-variant text-sm">© {{ new Date().getFullYear() }} XiaoMouz. All rights reserved.</p>
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

<script setup lang="ts">
import { contentData } from '~/data/content'

const { currentView, activeArticleId, unlockedIds, navigate, viewArticle, unlockArticle } = usePortfolio()
const { isDark, navbarTheme, initTheme, toggleTheme, setNavbarTheme, resetNavbarTheme } = useTheme()

const isImmersiveView = computed(() => {
  return currentView.value.startsWith('games') || currentView.value.startsWith('media')
})

const isGameView = computed(() => {
  return currentView.value.startsWith('games')
})

const isMediaView = computed(() => {
  return currentView.value.startsWith('media')
})

const navActiveView = computed(() => {
  if (currentView.value === 'resume') return ''
  if (activeArticleId.value) return 'articles'
  return currentView.value
})

const activeArticle = computed(() => {
  return activeArticleId.value ? contentData.find(c => c.id === activeArticleId.value) : null
})

const isArticleUnlocked = computed(() => {
  return activeArticleId.value ? unlockedIds.value.includes(activeArticleId.value) : false
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

const handleUnlockArticle = () => {
  if (activeArticleId.value) {
    unlockArticle(activeArticleId.value)
  }
}

const handleThemeChange = (theme: any) => {
  setNavbarTheme(theme)
}

// Initialize theme on mount
onMounted(() => {
  initTheme()
})
</script>
