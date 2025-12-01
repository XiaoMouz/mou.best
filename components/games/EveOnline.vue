<script setup lang="ts">
import { ref, computed } from 'vue'
import { Crosshair, Navigation, Globe, Shield, Zap, CircleDot, Play, Database } from 'lucide-vue-next'

interface Props {
  id: string
}

defineProps<Props>()

const mousePos = ref({ x: 0, y: 0 })

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 2,
    y: (clientY / innerHeight - 0.5) * 2,
  }
}

const bgStyle = computed(() => ({
  backgroundImage: 'url("https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: `scale(1.1) translate(${mousePos.value.x * -10}px, ${mousePos.value.y * -10}px)`,
}))

const overviewData = [
  { icon: CircleDot, dist: '0 m', name: 'Caldari Navy Assembly', type: 'Station', color: 'text-white' },
  { icon: Crosshair, dist: '12 km', name: 'Jita 4-4 Undock', type: 'Beacon', color: 'text-cyan-400' },
  { icon: Navigation, dist: '24 AU', name: 'Stargate (Perimeter)', type: 'Gate', color: 'text-yellow-400' },
  { icon: Shield, dist: '145 km', name: 'Caldari Navy Raven', type: 'NPC', color: 'text-red-400' },
  { icon: Globe, dist: '35 km', name: 'Veldspar', type: 'Asteroid', color: 'text-gray-400' },
  { icon: Zap, dist: '2,500 m', name: 'Wreck (Heron)', type: 'Wreck', color: 'text-gray-500' },
]
</script>

<template>
  <section
    :id="id"
    class="game-section relative w-full h-screen snap-start overflow-hidden bg-black font-sans text-cyan-500"
    @mousemove="handleMouseMove"
  >
    <!-- Parallax Background Layers -->
    <div
      class="absolute inset-0 z-0 transition-transform duration-200 ease-out"
      :style="bgStyle"
    >
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Dust/Stars Foreground Layer -->
    <div
      class="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none transition-transform duration-300 ease-out"
      :style="{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
      }"
    ></div>

    <!-- Main UI Container - pt-28 to clear navbar -->
    <div class="relative z-10 w-full h-full px-6 pb-6 pt-28 flex flex-col justify-between">

      <!-- Top Header: Location Info -->
      <div class="flex justify-between items-start">
        <div class="backdrop-blur-md bg-black/60 border border-cyan-500/30 p-2 pl-4 pr-8 clip-path-slant relative group">
           <!-- Decorative Corner -->
           <div class="absolute top-0 left-0 w-1 h-full bg-cyan-600"></div>

           <div class="text-2xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
             Jita IV - Moon 4
           </div>
           <div class="text-cyan-400/80 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
             <span class="text-cyan-200">Caldari Navy Assembly Plant</span>
             <span class="px-1.5 py-0.5 bg-cyan-900/50 border border-cyan-500/50 rounded text-xs text-cyan-300">0.9</span>
           </div>
        </div>

        <div class="hidden md:flex flex-col items-end gap-1">
           <div class="flex items-center gap-2 text-cyan-400 font-mono text-sm bg-black/40 px-3 py-1 rounded border border-cyan-900/50">
             <Database :size="14" /> 144,293 PILOTS ONLINE
           </div>
           <div class="text-xs text-cyan-600 font-mono">Tranquility Server</div>
        </div>
      </div>

      <!-- Center Content Area -->
      <div class="flex-grow flex items-center justify-center relative w-full">

          <!-- Tactical Overlay Circles -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <div class="w-[80vh] h-[80vh] border border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
             <div class="w-[60vh] h-[60vh] border border-dashed border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
          </div>

          <div class="grid lg:grid-cols-12 w-full max-w-7xl gap-8 items-center">

             <!-- Left: Ship Display & Actions -->
             <div class="lg:col-span-8 flex flex-col justify-center relative">
                <!-- Ship Image with floating animation -->
                <div
                  class="relative z-10 animate-[float_6s_ease-in-out_infinite]"
                  :style="{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }"
                >
                   <img
                     src="https://images.unsplash.com/photo-1614728853975-666304c954fc?q=80&w=1974&auto=format&fit=crop"
                     alt="Spaceship"
                     class="w-full max-w-2xl h-auto object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.2)] mask-image-gradient"
                     style="mask-image: linear-gradient(to bottom, black 80%, transparent 100%)"
                   />

                   <!-- HUD Reticles around ship -->
                   <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-cyan-500/10 rounded-full pointer-events-none"></div>
                   <div class="absolute top-[20%] right-[10%] flex flex-col items-end gap-1 pointer-events-none">
                       <div class="h-px w-16 bg-cyan-500/50"></div>
                       <div class="text-xs text-cyan-300 font-mono bg-black/50 px-1">SHIELD: 100%</div>
                   </div>
                </div>

                <div class="mt-8 space-y-6 max-w-xl backdrop-blur-sm bg-black/30 p-6 border-l-2 border-cyan-500/50 rounded-r-xl">
                    <h1 class="text-6xl font-bold text-white tracking-tighter mb-2" style="text-shadow: 0 0 20px cyan">
                      EVE <span class="font-thin text-cyan-400">ONLINE</span>
                    </h1>
                    <p class="text-cyan-100/80 leading-relaxed">
                      Dive into the world's largest living work of science fiction.
                      Shape your own destiny in a persistent universe of incredible depth and complexity.
                    </p>

                    <div class="flex gap-4 pt-2">
                      <button class="px-8 py-3 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black text-cyan-300 font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        <Play :size="18" class="fill-current group-hover:text-black" />
                        Undock
                      </button>
                      <button class="px-6 py-3 bg-black/40 border border-cyan-800 hover:border-cyan-500 text-cyan-500 hover:text-cyan-300 font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                        <Navigation :size="18" />
                        Set Dest.
                      </button>
                    </div>
                </div>
             </div>

             <!-- Right: The "Overview" Panel -->
             <div class="hidden lg:block lg:col-span-4 self-center justify-self-end">
                <div
                  class="w-80 backdrop-blur-md bg-black/70 border border-cyan-900/50 text-xs font-mono shadow-2xl transition-transform duration-100 ease-out"
                  :style="{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)` }"
                >
                   <!-- Window Header -->
                   <div class="bg-cyan-900/30 px-2 py-1 flex justify-between items-center border-b border-cyan-500/20 cursor-move">
                      <span class="font-bold text-cyan-100 tracking-wider">OVERVIEW</span>
                      <div class="flex gap-1">
                         <div class="w-2 h-2 bg-cyan-500/50 rounded-full"></div>
                         <div class="w-2 h-2 bg-cyan-500/50 rounded-full"></div>
                      </div>
                   </div>

                   <!-- Table Headers -->
                   <div class="grid grid-cols-12 px-2 py-1 text-cyan-600 font-bold border-b border-cyan-500/10">
                      <div class="col-span-2 text-center">Icon</div>
                      <div class="col-span-3 text-right pr-2">Dist</div>
                      <div class="col-span-5">Name</div>
                      <div class="col-span-2 text-center">Type</div>
                   </div>

                   <!-- Table Rows -->
                   <div class="h-64 overflow-y-auto custom-scrollbar">
                      <div
                        v-for="(row, i) in overviewData"
                        :key="i"
                        :class="[
                          'grid grid-cols-12 px-2 py-1 items-center hover:bg-cyan-500/10 cursor-pointer transition-colors',
                          i === 0 ? 'bg-cyan-500/20' : ''
                        ]"
                      >
                        <div :class="['col-span-2 flex justify-center', row.color]">
                          <component :is="row.icon" :size="12" />
                        </div>
                        <div class="col-span-3 text-right pr-2 text-cyan-200/70">{{ row.dist }}</div>
                        <div class="col-span-5 truncate text-cyan-100">{{ row.name }}</div>
                        <div class="col-span-2 text-center text-cyan-600/80">{{ row.type }}</div>
                      </div>
                   </div>

                   <!-- Window Footer -->
                   <div class="px-2 py-1 border-t border-cyan-500/20 flex justify-between text-cyan-700">
                      <span>Default</span>
                      <span>...</span>
                   </div>
                </div>
             </div>
          </div>
      </div>

      <!-- Bottom HUD Strip -->
      <div class="flex items-center gap-1 opacity-80">
          <div class="w-16 h-16 rounded-full border border-cyan-500/50 bg-black/60 relative overflow-hidden group cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center font-bold text-cyan-300 text-xs text-center leading-none">
                  CAP<br/>100%
              </div>
              <!-- Simulated Capacitor ring -->
              <svg class="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="cyan" stroke-width="2" stroke-dasharray="188" stroke-dashoffset="0" class="opacity-50"/>
              </svg>
          </div>

          <!-- Module Strip -->
          <div class="flex gap-1 ml-2">
              <div
                v-for="i in 4"
                :key="i"
                class="w-12 h-12 bg-black/60 border border-cyan-900/50 rounded-full flex items-center justify-center hover:border-cyan-400 hover:shadow-[0_0_10px_cyan] transition-all cursor-pointer group"
              >
                  <div :class="[
                    'w-8 h-8 rounded-full border border-cyan-800 bg-cyan-900/20',
                    i === 1 ? 'bg-green-500/20 border-green-500/50 animate-pulse' : ''
                  ]"></div>
              </div>
          </div>

          <div class="ml-auto text-right">
              <div class="text-xl font-mono font-bold text-cyan-100 tracking-widest">
                  1,240,500,000 <span class="text-cyan-600 text-sm">ISK</span>
              </div>
          </div>
      </div>

    </div>
  </section>
</template>
