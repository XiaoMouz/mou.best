<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface MediaTheme {
  bg: string
  text: string
  accent: string
  border: string
  font: string
}

interface MediaProps {
  targetMediaId?: string | null
}

const props = defineProps<MediaProps>()

const emit = defineEmits<{
  'theme-change': [theme: MediaTheme | null]
}>()

// Configuration to map the component ID to the navbar theme style
const MEDIA_THEMES: Record<string, MediaTheme> = {
  'media-johnwick': {
    bg: 'rgba(0,0,0,0.8)',
    text: '#ffffff',
    accent: '#3b82f6', // Dynamic based on chapter usually, but default blue
    border: '#ffffff',
    font: 'Oswald, sans-serif',
  },
  'media-seven': {
    bg: 'rgba(26, 24, 21, 0.95)',
    text: '#e6e6e6',
    accent: '#ea580c', // Orange
    border: '#ea580c',
    font: 'Oswald, sans-serif',
  },
  'media-sao': {
    bg: 'rgba(17, 24, 39, 0.9)',
    text: '#ffffff',
    accent: '#3b82f6', // Blue
    border: '#ffffff',
    font: 'sans-serif',
  },
  'media-hoc': {
    bg: 'rgba(30, 35, 41, 0.95)',
    text: '#cbd5e1',
    accent: '#ffffff',
    border: '#94a3b8',
    font: 'Playfair Display, serif',
  },
  'media-ngnl': {
    bg: 'rgba(42, 10, 46, 0.8)',
    text: '#ffffff',
    accent: '#ec4899', // Pink
    border: '#ec4899',
    font: 'sans-serif',
  }
}

const containerRef = ref<HTMLDivElement | null>(null)

// Scroll to target on mount
onMounted(() => {
  if (props.targetMediaId && containerRef.value) {
    const element = document.getElementById(props.targetMediaId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Observer to detect active section and switch Navbar theme
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mediaId = entry.target.id
          const theme = MEDIA_THEMES[mediaId]
          if (theme) {
            emit('theme-change', theme)
          }
        }
      })
    },
    { threshold: 0.5 }
  )

  const sections = document.querySelectorAll('.media-section')
  sections.forEach(s => observer.observe(s))

  // Cleanup on unmount
  onUnmounted(() => {
    emit('theme-change', null) // Reset on unmount
    sections.forEach(s => observer.unobserve(s))
  })
})

// Watch for targetMediaId changes
watch(() => props.targetMediaId, (newId) => {
  if (newId && containerRef.value) {
    const element = document.getElementById(newId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
  >
    <MediaJohnWick id="media-johnwick" />
    <MediaSevenNationArmy id="media-seven" />
    <MediaSwordArtOnline id="media-sao" />
    <MediaHouseOfCards id="media-hoc" />
    <MediaNoGameNoLife id="media-ngnl" />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
