<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-vue-next'

interface SevenNationArmyProps {
  id: string
}

const props = defineProps<SevenNationArmyProps>()

const isPlaying = ref(false)
const progress = ref(0)
const mousePos = ref({ x: 0, y: 0 })

let interval: ReturnType<typeof setInterval> | null = null

watch(isPlaying, (playing) => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }

  if (playing) {
    interval = setInterval(() => {
      progress.value = progress.value >= 100 ? 0 : progress.value + 0.5
    }, 100)
  }
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 2,
    y: (clientY / innerHeight - 0.5) * 2,
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

const currentTime = () => formatTime((progress.value / 100) * 258)
</script>

<template>
  <section
    :id="id"
    class="media-section relative w-full h-screen snap-start overflow-hidden bg-[#1a1815] font-display text-[#e6e6e6]"
    @mousemove="handleMouseMove"
  >
    <!-- Gritty Texture Overlay -->
    <div
      class="absolute inset-0 opacity-10 pointer-events-none z-0"
      style="backgroundImage: url('https://www.transparenttextures.com/patterns/aged-paper.png'); filter: contrast(150%)"
    ></div>

    <!-- Background Image Parallax -->
    <div
      class="absolute inset-0 z-0 transition-transform duration-100 ease-out"
      :style="{ transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }"
    >
      <img
        src="https://images.unsplash.com/photo-1596772719602-536442654496?q=80&w=2671&auto=format&fit=crop"
        alt="Battlefield"
        class="w-full h-full object-cover sepia-[0.5] contrast-125 brightness-50"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1a1815] via-transparent to-[#1a1815]/80"></div>
    </div>

    <!-- Glitch Overlay Effect -->
    <div class="absolute inset-0 z-0 opacity-5 pointer-events-none animate-glitch mix-blend-color-dodge bg-orange-500/20"></div>

    <!-- Main Content -->
    <div class="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 pt-32">

      <!-- Album Art / Visualizer Container with 3D Tilt -->
      <div
        class="relative w-full max-w-md aspect-square mb-12 group cursor-pointer transition-transform duration-100 ease-out"
        @click="isPlaying = !isPlaying"
        :style="{
          transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`
        }"
      >
        <!-- Border Elements -->
        <div :class="['absolute -inset-4 border-2 border-white/20 rounded-sm transition-all duration-700', isPlaying ? 'scale-105 opacity-50' : 'scale-100 opacity-100']"></div>
        <div :class="['absolute -inset-4 border-2 border-orange-500/50 rounded-sm transition-all duration-500', isPlaying ? 'scale-[1.08] opacity-100 rotate-1' : 'scale-[1.02] opacity-0']"></div>

        <div class="w-full h-full bg-black shadow-2xl relative overflow-hidden ring-1 ring-white/10">
          <img
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2670&auto=format&fit=crop"
            alt="The White Stripes"
            :class="['w-full h-full object-cover opacity-80 transition-transform duration-[20s] ease-linear will-change-transform', isPlaying ? 'scale-150 rotate-6' : 'scale-100 rotate-0']"
          />
          <div class="absolute inset-0 bg-orange-900/20 mix-blend-overlay"></div>

          <!-- Visualizer Overlay -->
          <div class="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center gap-1 p-4">
            <div
              v-for="i in 20"
              :key="i"
              class="w-3 bg-white/80 transition-all duration-75 ease-in-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              :style="{
                height: isPlaying ? `${Math.random() * 80 + 10}%` : '5%',
                opacity: isPlaying ? 0.9 : 0.2,
                backgroundColor: isPlaying && i % 3 === 0 ? '#f97316' : 'white'
              }"
            ></div>
          </div>
        </div>

        <!-- Song Info Overlay -->
        <div
          :class="['absolute top-4 left-[-2rem] bg-orange-600 text-black px-4 py-1 font-bold tracking-widest uppercase transform -rotate-2 shadow-lg z-20 transition-transform duration-300', isPlaying ? 'translate-x-2 scale-110' : '']"
          style="transform: translateZ(30px) rotate(-2deg)"
        >
          {{ isPlaying ? 'Now Playing' : 'Paused' }}
        </div>
      </div>

      <!-- Typography -->
      <div
        class="text-center space-y-2 mb-12 transition-transform duration-100 ease-out"
        :style="{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }"
      >
        <h1 class="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white drop-shadow-2xl">
          Seven Nation Army
        </h1>
        <h2 class="text-xl md:text-2xl font-serif text-orange-500 italic tracking-wider">
          The White Stripes — Glitch Mob Remix
        </h2>
      </div>

      <!-- Controls -->
      <div class="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-sm transition-colors hover:border-white/20">
        <!-- Progress Bar -->
        <div class="w-full h-1 bg-white/10 mb-6 cursor-pointer group relative rounded-full overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-100" :style="{ width: `${progress}%` }"></div>
          <div class="absolute top-0 left-0 h-full w-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div
            class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
            :style="{ left: `calc(${progress}% - 8px)` }"
          ></div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 text-sm font-mono text-white/50">
            <span>{{ currentTime() }}</span>
            <span>/</span>
            <span>4:18</span>
          </div>

          <div class="flex items-center gap-8">
            <button class="text-white/70 hover:text-orange-500 hover:scale-110 transition-all duration-300 active:scale-95">
              <SkipBack :size="24" />
            </button>
            <button
              @click="isPlaying = !isPlaying"
              class="w-16 h-16 bg-orange-600 hover:bg-orange-500 text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.8)] hover:scale-110 active:scale-95"
            >
              <Pause v-if="isPlaying" :size="28" fill="currentColor" />
              <Play v-else :size="28" fill="currentColor" class="ml-1" />
            </button>
            <button class="text-white/70 hover:text-orange-500 hover:scale-110 transition-all duration-300 active:scale-95">
              <SkipForward :size="24" />
            </button>
          </div>

          <div class="flex items-center gap-3 text-white/50 group hover:text-white transition-colors cursor-pointer">
            <Volume2 :size="20" class="group-hover:text-orange-400 transition-colors" />
            <div class="w-20 h-1 bg-white/10 rounded-full overflow-hidden group-hover:h-1.5 transition-all duration-300">
              <div class="w-3/4 h-full bg-current group-hover:bg-orange-500 transition-colors shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
