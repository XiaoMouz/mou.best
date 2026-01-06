<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
  Moon,
  Sun,
  Home,
  BookOpen,
  Menu,
  X,
  Gamepad2,
  ChevronDown,
  User,
  Film,
  Languages,
  Users,
} from 'lucide-vue-next'
import type { NavItem } from '~/types'

interface NavbarProps {
  currentView: string
  themeOverride?: {
    bg: string
    text: string
    accent: string
    border: string
    font: string
  } | null
}

const props = withDefaults(defineProps<NavbarProps>(), {
  themeOverride: null,
})

// Composables
const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const { language, toggleLanguage, t } = useLanguage()

// State
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const dropdownTimeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)

// Navigation items
const navItems = computed<NavItem[]>(() => [
  { id: 'home', label: t('nav.home'), icon: Home },
  { id: 'articles', label: t('nav.articles'), icon: BookOpen },
  { id: 'about', label: t('nav.about'), icon: User },
  // { id: 'friends', label: t('nav.friends'), icon: Users },
  // {
  //   id: 'media',
  //   label: t('nav.media'),
  //   icon: Film,
  //   children: [
  //     { id: 'media-johnwick', label: 'John Wick', icon: Film },
  //     { id: 'media-seven', label: 'Seven Nation Army', icon: Film },
  //     { id: 'media-sao', label: 'Sword Art Online', icon: Film },
  //     { id: 'media-hoc', label: 'House of Cards', icon: Film },
  //     { id: 'media-ngnl', label: 'No Game No Life', icon: Film },
  //   ],
  // },
  // {
  //   id: 'games',
  //   label: t('nav.games'),
  //   icon: Gamepad2,
  //   children: [
  //     { id: 'games-gta5', label: 'GTA V', icon: Gamepad2 },
  //     { id: 'games-division', label: 'The Division', icon: Gamepad2 },
  //     { id: 'games-eve', label: 'EVE Online', icon: Gamepad2 },
  //     { id: 'games-wt', label: 'War Thunder', icon: Gamepad2 },
  //   ],
  // },
])

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Dropdown handlers
const handleMouseEnter = (itemId: string) => {
  if (dropdownTimeoutRef.value) clearTimeout(dropdownTimeoutRef.value)
  openDropdown.value = itemId
}

const handleMouseLeave = () => {
  dropdownTimeoutRef.value = setTimeout(() => {
    openDropdown.value = null
  }, 200)
}

// Navigation handlers using Nuxt Router
const handleNavClick = (item: NavItem) => {
  const path = item.id === 'home' ? '/' : `/${item.id}`
  router.push(path)
  isMobileMenuOpen.value = false
}

const handleChildClick = (childId: string) => {
  // Convert IDs like 'media-johnwick' to '/media/johnwick'
  const parts = childId.split('-')
  const path = `/${parts[0]}/${parts[1]}`
  router.push(path)
  openDropdown.value = null
  isMobileMenuOpen.value = false
}

// Style helpers
const navStyle = computed(() => {
  if (!props.themeOverride) return {}
  return {
    backgroundColor: isScrolled.value ? props.themeOverride.bg : 'transparent',
    color: props.themeOverride.text,
    borderColor: props.themeOverride.border,
    fontFamily: props.themeOverride.font,
  }
})

const buttonStyle = (isActive: boolean) => {
  if (!props.themeOverride) return {}

  // If active, use theme accent for background.
  // If NOT active, do NOT set background color inline so CSS hover classes can work.
  if (isActive) {
    return {
      backgroundColor: props.themeOverride.accent,
      color: props.themeOverride.bg,
    }
  }

  return {
    color: props.themeOverride.text,
  }
}

const logoBlurStyle = computed(() => {
  if (!props.themeOverride) return {}
  return { backgroundColor: props.themeOverride.accent, opacity: 0.5 }
})

const logoRingStyle = computed(() => {
  if (!props.themeOverride) return {}
  return { borderColor: props.themeOverride.accent }
})

const logoTextStyle = computed(() => {
  if (!props.themeOverride) return {}
  return { fontFamily: props.themeOverride.font }
})

const desktopActionsStyle = computed(() => {
  if (!props.themeOverride) return {}
  return {
    borderColor: props.themeOverride.border,
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
})

const dropdownStyle = computed(() => {
  if (!props.themeOverride) return {}
  return {
    backgroundColor: props.themeOverride.bg,
    borderColor: props.themeOverride.accent,
    border: '1px solid',
  }
})

const dropdownItemStyle = computed(() => {
  if (!props.themeOverride) return {}
  return { color: props.themeOverride.text }
})

const mobileMenuStyle = computed(() => {
  if (!props.themeOverride) return {}
  return {
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderColor: props.themeOverride.accent,
  }
})

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (dropdownTimeoutRef.value) clearTimeout(dropdownTimeoutRef.value)
})
</script>

<template>
  <nav
    :style="navStyle"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled && !themeOverride
        ? 'bg-surface/80 backdrop-blur-md py-2 border-b border-outline-variant/20 shadow-sm'
        : 'py-4',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <!-- Logo Area -->
      <div
        class="flex items-center gap-4 cursor-pointer"
        @click="router.push('/')"
      >
        <div class="relative group">
          <div
            :class="[
              'absolute inset-0 rounded-full blur-md transition-all duration-500',
              themeOverride ? '' : 'bg-primary/20 group-hover:bg-primary/40',
            ]"
            :style="logoBlurStyle"
          />
          <div
            class="rounded-full border border-c-white w-10 h-10 flex items-center relative me-logo-animation"
          >
            <img
              src="/me.gif"
              alt="Avatar"
              style="object-fit: cover"
              :class="[
                'absolute p-[2px] w-10 h-10 rounded-full object-cover transition duration-200 hover:rotate-10',
                themeOverride ? '' : 'ring-outline-variant/50',
              ]"
              :style="logoRingStyle"
            />
          </div>
        </div>
        <span
          class="font-medium text-xl tracking-tight hidden sm:block"
          :style="logoTextStyle"
        >
          XiaoMouz
        </span>
      </div>

      <!-- Desktop Actions -->
      <div
        :class="[
          'hidden md:flex items-center gap-2 p-1 rounded-full border backdrop-blur-sm transition-colors',
          themeOverride
            ? ''
            : 'bg-surface-container/50 border-outline-variant/20',
        ]"
        :style="desktopActionsStyle"
      >
        <div
          v-for="item in navItems"
          :key="item.id"
          class="relative"
          @mouseenter="
            item.children &&
              item.children.length > 0 &&
              handleMouseEnter(item.id)
          "
          @mouseleave="handleMouseLeave"
        >
          <button
            @click="handleNavClick(item)"
            :style="
              buttonStyle(
                currentView === item.id ||
                  (item.children && currentView.startsWith(item.id))
              )
            "
            :class="[
              'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
              !themeOverride &&
              (currentView === item.id ||
                (item.children && currentView.startsWith(item.id)))
                ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                : !themeOverride
                ? 'text-on-surface hover:bg-surface-container-high'
                : 'hover:bg-white/10',
            ]"
          >
            <component
              :is="item.icon"
              :size="18"
              :class="[
                themeOverride
                  ? ''
                  : currentView === item.id ||
                    (item.children && currentView.startsWith(item.id))
                  ? 'text-primary'
                  : 'text-on-surface-variant',
              ]"
            />
            {{ item.label }}
            <ChevronDown
              v-if="item.children && item.children.length > 0"
              :size="14"
              :class="[
                'transition-transform',
                openDropdown === item.id ? 'rotate-180' : '',
              ]"
            />
          </button>

          <!-- Dropdown -->
          <div
            v-if="
              item.children &&
              item.children.length > 0 &&
              openDropdown === item.id
            "
            :class="[
              'absolute top-full left-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden animate-fade-in',
              themeOverride
                ? ''
                : 'bg-surface-container border border-outline-variant/20',
            ]"
            :style="dropdownStyle"
          >
            <button
              v-for="child in item.children"
              :key="child.id"
              @click.stop="handleChildClick(child.id)"
              :class="[
                'w-full text-left px-4 py-3 text-sm flex items-center gap-2 transition-colors',
                themeOverride
                  ? 'hover:bg-white/10'
                  : 'hover:bg-surface-container-high text-on-surface',
              ]"
              :style="dropdownItemStyle"
            >
              {{ child.label }}
            </button>
          </div>
        </div>

        <div
          :class="[
            'w-px h-6 mx-1',
            themeOverride ? 'bg-white/20' : 'bg-outline-variant/30',
          ]"
        />

        <!-- Lang Switch -->
        <button
          @click="toggleLanguage"
          :class="[
            'p-2 rounded-full transition-colors font-medium text-xs flex items-center justify-center w-8 h-8',
            themeOverride
              ? 'hover:bg-white/10'
              : 'hover:bg-surface-container-high text-on-surface-variant',
          ]"
          aria-label="Toggle Language"
        >
          {{ language === 'en' ? 'EN' : '中' }}
        </button>

        <!-- Theme Switch -->
        <button
          @click="toggleTheme"
          :class="[
            'p-2 rounded-full transition-colors',
            themeOverride
              ? 'hover:bg-white/10'
              : 'hover:bg-surface-container-high text-on-surface-variant',
          ]"
          aria-label="Toggle Theme"
        >
          <Moon v-if="isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
      </div>

      <!-- Mobile Toggle -->
      <div class="md:hidden flex items-center gap-2">
        <button
          @click="toggleLanguage"
          :class="[
            'p-3 rounded-full transition-colors font-bold text-sm',
            themeOverride
              ? 'hover:bg-white/10'
              : 'hover:bg-surface-container text-on-surface',
          ]"
        >
          {{ language === 'en' ? 'EN' : '中' }}
        </button>
        <button
          @click="toggleTheme"
          :class="[
            'p-3 rounded-full transition-colors',
            themeOverride
              ? 'hover:bg-white/10'
              : 'hover:bg-surface-container text-on-surface',
          ]"
        >
          <Moon v-if="isDark" :size="20" />
          <Sun v-else :size="20" />
        </button>
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :class="[
            'p-3 rounded-full transition-colors',
            themeOverride
              ? 'hover:bg-white/10'
              : 'hover:bg-surface-container text-on-surface',
          ]"
        >
          <X v-if="isMobileMenuOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      :class="[
        'md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-4 rounded-3xl border shadow-xl flex flex-col gap-2 overflow-hidden animate-fade-in',
        themeOverride
          ? 'backdrop-blur-xl'
          : 'bg-surface-container border-outline-variant/20',
      ]"
      :style="mobileMenuStyle"
    >
      <div v-for="item in navItems" :key="item.id">
        <button
          @click="handleNavClick(item)"
          :class="[
            'w-full px-4 py-4 rounded-2xl font-medium text-left flex items-center gap-4 transition-colors',
            currentView === item.id
              ? themeOverride
                ? 'bg-white/10'
                : 'bg-secondary-container text-on-secondary-container'
              : themeOverride
              ? 'text-white'
              : 'text-on-surface hover:bg-surface-container-high',
          ]"
        >
          <component :is="item.icon" :size="20" />
          {{ item.label }}
        </button>
        <div
          v-if="item.children"
          class="ml-8 border-l border-white/10 pl-2 mt-1 space-y-1"
        >
          <button
            v-for="child in item.children"
            :key="child.id"
            @click="handleChildClick(child.id)"
            :class="[
              'w-full px-4 py-3 rounded-xl font-medium text-left flex items-center gap-4 transition-colors',
              themeOverride
                ? 'text-white/70 hover:text-white'
                : 'text-on-surface-variant hover:text-on-surface',
            ]"
          >
            {{ child.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
