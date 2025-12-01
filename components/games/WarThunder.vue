<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plane, Crosshair, Target, ChevronRight, Wind, Mountain } from 'lucide-vue-next'

interface Props {
  id: string
}

defineProps<Props>()

type Mode = 'air' | 'ground'

const mode = ref<Mode>('air')
const mousePos = ref({ x: 0, y: 0 })

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 2,
    y: (clientY / innerHeight - 0.5) * 2,
  }
}

const content = {
  air: {
    title: "Air Superiority",
    desc: "Dominate the skies with legendary aircraft like the Su-35 and F/A-18C.",
    bg: "https://images.unsplash.com/photo-1629809804104-142273932e60?q=80&w=2670&auto=format&fit=crop",
    hero: "https://images.unsplash.com/photo-1549467794-b25867455d3e?q=80&w=2000&auto=format&fit=crop",
    accent: "text-sky-500",
    border: "border-sky-500",
    gradient: "from-sky-900/50",
    icon: Wind
  },
  ground: {
    title: "Ground Forces",
    desc: "Command heavy metal beasts like the M1A2 SEPv3 supported by AH-64E Apaches.",
    bg: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
    hero: "https://images.unsplash.com/photo-1542152865-c33a925642d2?q=80&w=1600&auto=format&fit=crop",
    accent: "text-orange-500",
    border: "border-orange-500",
    gradient: "from-orange-900/50",
    icon: Mountain
  }
}

const current = computed(() => content[mode.value])
</script>

<template>
  <section
    :id="id"
    class="game-section relative w-full h-screen snap-start overflow-hidden bg-[#1e1e1e] font-sans text-white transition-colors duration-500"
    @mousemove="handleMouseMove"
  >
    <!-- --- Dual Backgrounds for Cross-fade --- -->
    <div class="absolute inset-0 z-0">
        <!-- Air BG -->
        <div
          :class="[
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out',
            mode === 'air' ? 'opacity-100' : 'opacity-0'
          ]"
          :style="{
            backgroundImage: `url(${content.air.bg})`,
            transform: `scale(1.1) translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
            transition: 'opacity 1s ease-in-out, transform 0.1s ease-out'
          }"
        />
        <!-- Ground BG -->
        <div
          :class="[
            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out',
            mode === 'ground' ? 'opacity-100' : 'opacity-0'
          ]"
          :style="{
            backgroundImage: `url(${content.ground.bg})`,
            transform: `scale(1.1) translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
            transition: 'opacity 1s ease-in-out, transform 0.1s ease-out'
          }"
        />

        <!-- Unified Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#1e1e1e] via-[#1e1e1e]/80 to-transparent mix-blend-multiply opacity-80" />
    </div>

    <!-- Main Container - pt-28 to clear navbar -->
    <div class="relative z-10 w-full h-full px-8 md:px-20 pt-28 flex flex-col md:flex-row items-center gap-12">

      <!-- LEFT COLUMN: Title & Controls -->
      <div
        class="flex-1 space-y-8 transition-transform duration-100 ease-out"
        :style="{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }"
      >
          <!-- Logo Area -->
          <div class="mb-8 relative">
             <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.85] drop-shadow-2xl relative z-10">
               War<br/>
               <span :class="[
                 'text-transparent bg-clip-text bg-gradient-to-r transition-all duration-700',
                 mode === 'air' ? 'from-sky-400 to-white' : 'from-orange-500 to-yellow-500'
               ]">
                 Thunder
               </span>
             </h1>
          </div>

          <!-- Mode Switcher -->
          <div class="flex gap-4 p-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 w-fit">
             <button
               @click="mode = 'air'"
               :class="[
                 'flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase tracking-wider transition-all duration-300',
                 mode === 'air'
                   ? 'bg-sky-600 text-white shadow-[0_0_20px_rgba(2,132,199,0.5)]'
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
               ]"
             >
                <Plane :size="20" :class="mode === 'air' ? 'animate-pulse' : ''" /> Air
             </button>
             <button
               @click="mode = 'ground'"
               :class="[
                 'flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase tracking-wider transition-all duration-300',
                 mode === 'ground'
                   ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.5)]'
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
               ]"
             >
                <Crosshair :size="20" :class="mode === 'ground' ? 'animate-pulse' : ''" /> Ground
             </button>
          </div>

          <!-- Contextual Text -->
          <div :class="['border-l-4 pl-6 bg-black/20 p-4 backdrop-blur-sm max-w-lg transition-all duration-500', current.border]">
              <h3 :class="['text-2xl font-bold uppercase mb-2 flex items-center gap-2', current.accent]">
                 <component :is="current.icon" :size="20" />
                 <span :key="mode" class="animate-fade-in">{{ current.title }}</span>
              </h3>
              <p :key="mode + 'desc'" class="text-gray-300 leading-relaxed font-medium animate-fade-in">
                 {{ current.desc }}
              </p>
          </div>

          <button :class="['group px-8 py-4 border font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2', current.border, current.accent]">
             Play for Free <ChevronRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

      <!-- RIGHT COLUMN: Hero Visuals -->
      <div class="flex-1 w-full h-[50vh] md:h-auto relative flex items-center justify-center">

          <!-- Parallax Container -->
          <div
            class="relative w-full max-w-2xl aspect-video transition-transform duration-100 ease-out"
            :style="{ transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }"
          >
              <!-- 3D Card Container -->
              <div class="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 group bg-black/50">

                  <!-- Air Hero Image Layer -->
                  <div
                    :class="[
                      'absolute inset-0 transition-all duration-700 ease-in-out',
                      mode === 'air' ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
                    ]"
                  >
                       <img
                         :src="content.air.hero"
                         alt="Air Mode"
                         class="w-full h-full object-cover"
                      />
                      <div :class="['absolute inset-0 bg-gradient-to-t to-transparent opacity-60', content.air.gradient]"></div>
                  </div>

                  <!-- Ground Hero Image Layer -->
                  <div
                    :class="[
                      'absolute inset-0 transition-all duration-700 ease-in-out',
                      mode === 'ground' ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
                    ]"
                  >
                       <img
                         :src="content.ground.hero"
                         alt="Ground Mode"
                         class="w-full h-full object-cover"
                      />
                      <div :class="['absolute inset-0 bg-gradient-to-t to-transparent opacity-60', content.ground.gradient]"></div>
                  </div>

                  <!-- HUD Elements Overlay - Static or Dynamic based on mode -->
                  <div class="absolute top-4 right-4 flex flex-col items-end gap-1 z-20">
                     <div class="bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-green-400 border border-green-500/30">
                        THR: 100%
                     </div>
                     <div class="bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-mono text-green-400 border border-green-500/30">
                        SPD: {{ mode === 'air' ? 'MACH 1.2' : '45 KM/H' }}
                     </div>
                  </div>

                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                     <Target :size="64" class="text-green-500/50" />
                  </div>
              </div>

              <!-- Decorative Elements - Floating secondary vehicle simulation -->
              <!-- Secondary Air Card -->
              <div
                 :class="[
                   'absolute -bottom-10 -left-10 w-48 h-32 rounded-lg overflow-hidden border border-sky-500/50 shadow-xl transition-all duration-500',
                   mode === 'air' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                 ]"
              >
                 <div class="w-full h-full relative animate-[float_4s_ease-in-out_infinite]" style="animation-delay: 1s">
                    <img src="https://images.unsplash.com/photo-1552086445-5381a17926e3?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 w-full bg-black/70 text-[10px] text-sky-400 p-1 text-center font-mono">F/A-18C HORNET</div>
                 </div>
              </div>

              <!-- Secondary Ground Card -->
              <div
                 :class="[
                   'absolute -top-10 -right-10 w-48 h-32 rounded-lg overflow-hidden border border-orange-500/50 shadow-xl transition-all duration-500',
                   mode === 'ground' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
                 ]"
              >
                  <div class="w-full h-full relative animate-[float_5s_ease-in-out_infinite]" style="animation-delay: 0.5s">
                    <img src="https://images.unsplash.com/photo-1542300058-b94b8ab7411b?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover" />
                     <div class="absolute bottom-0 w-full bg-black/70 text-[10px] text-orange-400 p-1 text-center font-mono">AH-64E APACHE</div>
                 </div>
              </div>

          </div>
      </div>

    </div>
  </section>
</template>
