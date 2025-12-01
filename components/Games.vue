<template>
  <div
    ref="containerRef"
    class="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
  >
    <!--
       We manually render the game components here.
       They act as 'slides' in the full-screen scroller.
    -->
    <GamesGTAV id="games-gta5" />
    <GamesTheDivision id="games-division" />
    <GamesEveOnline id="games-eve" />
    <GamesWarThunder id="games-wt" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Props
interface GamesProps {
  targetGameId?: string | null
}

const props = defineProps<GamesProps>()

// Emits
const emit = defineEmits<{
  'theme-change': [theme: any]
}>()

// Configuration to map the component ID to the navbar theme style
const GAME_THEMES: Record<string, any> = {
  'games-gta5': {
    bg: 'rgba(0,0,0,0.85)',
    text: '#ffffff',
    accent: '#22c55e', // Green
    border: '#22c55e',
    font: 'sans-serif',
  },
  'games-division': {
    bg: 'rgba(17, 24, 39, 0.95)', // Gray 900
    text: '#f97316', // Orange 500
    accent: '#f97316',
    border: '#f97316',
    font: 'monospace',
  },
  'games-eve': {
    bg: 'rgba(0, 5, 16, 0.9)', // Deep Space Blue/Black
    text: '#22d3ee', // Cyan 400
    accent: '#22d3ee',
    border: 'rgba(34, 211, 238, 0.3)',
    font: 'sans-serif',
  },
  'games-wt': {
    bg: 'rgba(30, 30, 30, 0.9)',
    text: '#ffffff',
    accent: '#ea580c', // Orange for Ground/War
    border: '#ffffff',
    font: 'sans-serif',
  }
}

// Refs
const containerRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null

// Scroll to target game on mount/update
watch(() => props.targetGameId, (newTargetGameId) => {
  if (newTargetGameId && containerRef.value) {
    const element = document.getElementById(newTargetGameId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}, { immediate: true })

// Observer to detect active game and switch Navbar theme
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const gameId = entry.target.id
          const theme = GAME_THEMES[gameId]
          if (theme) {
            emit('theme-change', theme)
          }
        }
      })
    },
    { threshold: 0.5 }
  )

  const sections = document.querySelectorAll('.game-section')
  sections.forEach(s => observer?.observe(s))
})

onBeforeUnmount(() => {
  emit('theme-change', null) // Reset on unmount
  if (observer) {
    const sections = document.querySelectorAll('.game-section')
    sections.forEach(s => observer?.unobserve(s))
    observer = null
  }
})
</script>
