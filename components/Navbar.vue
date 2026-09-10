<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { BookOpen, Home, Menu, Moon, Sun, User, Users, X } from '@lucide/vue'
import type { NavItem } from '~/types'

defineProps<{ currentView: string }>()

const { isDark, toggleTheme } = useTheme()
const { language, toggleLanguage, t } = useLanguage()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed<NavItem[]>(() => [
  { id: 'home', label: t('nav.home'), icon: Home },
  { id: 'articles', label: t('nav.articles'), icon: BookOpen },
  { id: 'about', label: t('nav.about'), icon: User },
  { id: 'friends', label: t('nav.friends'), icon: Users },
])

const navPath = (id: string) => (id === 'home' ? '/' : `/${id}`)
const handleScroll = () => (isScrolled.value = window.scrollY > 20)

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-surface/80 backdrop-blur-md py-2 border-b border-outline-variant/20 shadow-sm'
        : 'py-4',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <NuxtLink
        to="/"
        aria-label="Home"
        class="flex items-center gap-4"
        @click="isMobileMenuOpen = false"
      >
        <div class="relative group">
          <div
            class="absolute inset-0 rounded-full blur-md transition-all duration-500 bg-primary/20 group-hover:bg-primary/40"
          />
          <div
            class="rounded-full border border-c-white w-10 h-10 flex items-center relative me-logo-animation"
          >
            <img
              src="/me.gif"
              alt="Avatar"
              class="absolute p-[2px] w-10 h-10 rounded-full object-cover transition duration-200 hover:rotate-10 ring-outline-variant/50"
            />
          </div>
        </div>
        <span class="font-medium text-xl tracking-tight hidden sm:block">
          XiaoMouz
        </span>
      </NuxtLink>

      <div
        class="hidden md:flex items-center gap-2 p-1 rounded-full border backdrop-blur-sm transition-colors bg-surface-container/50 border-outline-variant/20"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="navPath(item.id)"
          :aria-current="currentView === item.id ? 'page' : undefined"
          :class="[
            'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
            currentView === item.id
              ? 'bg-secondary-container text-on-secondary-container shadow-sm'
              : 'text-on-surface hover:bg-surface-container-high',
          ]"
        >
          <component
            :is="item.icon"
            :size="18"
            :class="
              currentView === item.id
                ? 'text-primary'
                : 'text-on-surface-variant'
            "
          />
          {{ item.label }}
        </NuxtLink>

        <div class="w-px h-6 mx-1 bg-outline-variant/30" />

        <button
          type="button"
          class="p-2 rounded-full transition-colors font-medium text-xs flex items-center justify-center w-8 h-8 hover:bg-surface-container-high text-on-surface-variant"
          aria-label="Toggle Language"
          @click="toggleLanguage"
        >
          {{ language === 'en' ? 'EN' : '中' }}
        </button>
        <button
          type="button"
          class="p-2 rounded-full transition-colors hover:bg-surface-container-high text-on-surface-variant"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        >
          <Moon v-if="isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
      </div>

      <div class="md:hidden flex items-center gap-2">
        <button
          type="button"
          class="p-3 rounded-full transition-colors font-bold text-sm hover:bg-surface-container text-on-surface"
          aria-label="Toggle Language"
          @click="toggleLanguage"
        >
          {{ language === 'en' ? 'EN' : '中' }}
        </button>
        <button
          type="button"
          class="p-3 rounded-full transition-colors hover:bg-surface-container text-on-surface"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        >
          <Moon v-if="isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
        <button
          type="button"
          class="p-3 rounded-full transition-colors hover:bg-surface-container text-on-surface"
          :aria-label="
            isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          "
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-4 rounded-3xl border shadow-xl flex flex-col gap-2 overflow-hidden bg-surface-container border-outline-variant/20"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="navPath(item.id)"
          :aria-current="currentView === item.id ? 'page' : undefined"
          :class="[
            'w-full px-4 py-4 rounded-2xl font-medium text-left flex items-center gap-4 transition-colors',
            currentView === item.id
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface hover:bg-surface-container-high',
          ]"
          @click="isMobileMenuOpen = false"
        >
          <component :is="item.icon" :size="20" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active {
  transition:
    opacity 0.16s ease-out,
    transform 0.16s ease-out;
}

.mobile-menu-leave-active {
  transition:
    opacity 0.12s ease-in,
    transform 0.12s ease-in;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
