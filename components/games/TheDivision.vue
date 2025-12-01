<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Shield, Target, Crosshair, Activity, Wifi } from 'lucide-vue-next'

interface Props {
  id: string
}

defineProps<Props>()

const glitch = ref(false)
const mousePos = ref({ x: 0, y: 0 })

let glitchInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  glitchInterval = setInterval(() => {
    glitch.value = true
    setTimeout(() => {
      glitch.value = false
    }, 200)
  }, 3000)
})

onUnmounted(() => {
  if (glitchInterval) {
    clearInterval(glitchInterval)
  }
})

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  // Calculate normalized position from -1 to 1
  const x = (clientX / innerWidth - 0.5) * 2
  const y = (clientY / innerHeight - 0.5) * 2
  mousePos.value = { x, y }
}

const bgStyle = computed(() => ({
  backgroundImage: 'url("https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: `scale(1.05) translate(${mousePos.value.x * -10}px, ${mousePos.value.y * -10}px)`,
}))
</script>

<template>
  <section
    :id="id"
    class="game-section relative w-full h-screen snap-start overflow-hidden bg-gray-900 font-mono text-orange-500"
    @mousemove="handleMouseMove"
  >
    <!-- Background with Overlay - Parallax Layer 1 (Back) -->
    <div
      class="absolute inset-0 z-0 transition-transform duration-100 ease-out"
      :style="bgStyle"
    >
      <div class="absolute inset-0 bg-gray-900/80 backdrop-grayscale"></div>
      <!-- Grid Overlay -->
      <div
        class="absolute inset-0 opacity-10"
        :style="{
          backgroundImage: 'linear-gradient(#ff9600 1px, transparent 1px), linear-gradient(90deg, #ff9600 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }"
      >
      </div>
    </div>

    <!-- Main ISAC UI Layer - Added pt-28 to push Top Bar below Navbar -->
    <div class="relative z-10 w-full h-full px-6 pb-6 pt-28 flex flex-col">

      <!-- Top Bar -->
      <div class="flex justify-between items-center border-b border-orange-500/30 pb-4 backdrop-blur-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(255,150,0,0.5)]">
            <Shield :size="24" />
          </div>
          <div>
            <div class="text-sm tracking-[0.3em] uppercase opacity-80 text-orange-100">Strategic Homeland Division</div>
            <div class="text-xs text-orange-300/60">ISAC SYSTEM: <span class="text-green-400">ONLINE</span></div>
          </div>
        </div>
        <div class="hidden md:flex gap-8 text-xs tracking-widest opacity-60">
          <span class="flex items-center gap-2"><Wifi :size="14"/> NETWORK: SECURE</span>
          <span class="flex items-center gap-2"><Activity :size="14"/> VITALS: STABLE</span>
        </div>
      </div>

      <!-- Center Content -->
      <div class="flex-grow flex items-center justify-center relative">

        <!-- Circular Holographic Element - Parallax Layer 2 (Mid) -->
        <div
          class="absolute pointer-events-none opacity-20 w-[600px] h-[600px] border border-orange-500/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite] transition-transform duration-200 ease-out"
          :style="{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }"
        >
          <div class="w-[500px] h-[500px] border border-dashed border-orange-500/30 rounded-full"></div>
          <div class="absolute w-full h-[1px] bg-orange-500/10"></div>
          <div class="absolute h-full w-[1px] bg-orange-500/10"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 max-w-6xl w-full items-center">

          <!-- Character/Gear Preview - Parallax Layer 3 (Front) -->
          <div
            :class="[
              'relative h-[600px] border-l border-orange-500/30 pl-8 flex flex-col justify-center transition-all duration-100 ease-out',
              glitch ? 'translate-x-1 opacity-80' : ''
            ]"
            :style="{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }"
          >
            <div class="absolute top-0 left-0 w-2 h-2 bg-orange-500 shadow-[0_0_10px_rgba(255,150,0,0.8)]"></div>
            <div class="absolute bottom-0 left-0 w-2 h-2 bg-orange-500 shadow-[0_0_10px_rgba(255,150,0,0.8)]"></div>

            <img
              src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop"
              alt="Agent"
              class="w-full h-full object-cover opacity-90 mix-blend-lighten drop-shadow-[0_0_20px_rgba(255,150,0,0.3)]"
            />

            <!-- Floating Tags -->
            <div class="absolute top-20 right-10 bg-black/80 border border-orange-500/50 px-3 py-1 text-xs backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              MASK LEVEL 4
            </div>
            <div class="absolute bottom-40 left-10 bg-black/80 border border-orange-500/50 px-3 py-1 text-xs backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              ARMOR: 1.2M
            </div>
          </div>

          <!-- Info Text - Parallax Layer 4 (Slight Depth) -->
          <div
            class="space-y-8 text-right md:text-left transition-transform duration-100 ease-out"
            :style="{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` }"
          >
            <h1
              class="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 tracking-tighter uppercase mb-4"
              style="text-shadow: 0 0 30px rgba(255, 150, 0, 0.3)"
            >
              The Division
            </h1>

            <div class="bg-orange-500/10 border-l-2 border-orange-500 p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(255,150,0,0.1)]">
              <h3 class="text-sm font-bold mb-2 tracking-widest uppercase flex items-center gap-2 text-orange-400">
                <Target :size="16" /> Mission Briefing
              </h3>
              <p class="text-orange-100/90 leading-relaxed text-sm md:text-base font-medium">
                A devastating pandemic sweeps through New York City, and one by one, basic services fail.
                The Division, an autonomous unit of tactical agents, is activated to save what remains.
              </p>
            </div>

            <div class="flex gap-4 pt-4 md:justify-start justify-end">
              <a
                href="https://store.steampowered.com/app/365590/Tom_Clancys_The_Division/"
                class="group relative px-8 py-3 bg-orange-500 text-black font-bold uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(255,150,0,0.4)] hover:shadow-[0_0_30px_rgba(255,150,0,0.6)] transition-all"
              >
                <span class="relative z-10 flex items-center gap-2"><Crosshair :size="18"/> Deploy</span>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </a>
              <button class="px-8 py-3 border border-orange-500 text-orange-500 font-bold uppercase tracking-widest hover:bg-orange-500/10 transition-colors shadow-[0_0_10px_rgba(255,150,0,0.2)]">
                Intel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Status -->
      <div class="border-t border-orange-500/30 pt-4 flex justify-between items-center text-xs opacity-60 font-bold">
        <div>COORDINATES: 40.7128° N, 74.0060° W</div>
        <div class="flex gap-4">
          <span class="text-red-500 animate-pulse">DARK ZONE: PROXIMITY ALERT</span>
          <span class="animate-pulse">TRANSMISSION: INCOMING...</span>
        </div>
      </div>
    </div>
  </section>
</template>
