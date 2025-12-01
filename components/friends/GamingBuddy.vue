<script setup lang="ts">
import { ref, computed } from 'vue'
import { Gamepad2, type LucideIcon } from 'lucide-vue-next'

export interface GamingHistoryItem {
  year: string
  event: string
  icon: LucideIcon
  image?: string // Background to switch to
}

interface GamingBuddyProps {
  name: string
  role: string
  level: string
  status: string
  mainGame: string
  mainGameImg: string
  defaultBg: string
  history: GamingHistoryItem[]
  className?: string
  themeColor?: string // hex color for accents
}

const props = withDefaults(defineProps<GamingBuddyProps>(), {
  className: '',
  themeColor: '#3b82f6' // default blue
})

const activeBg = ref(props.defaultBg)

// Collect all unique images to render as layers
const backgroundLayers = computed(() => {
  const images = new Set<string>()
  images.add(props.defaultBg)
  props.history.forEach(item => {
    if (item.image) images.add(item.image)
  })
  return Array.from(images)
})
</script>

<template>
  <div :class="`relative min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 group transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] ${className}`">
    <!-- Immersive Background Layers (Preloaded & Cross-fading) -->
    <div class="absolute inset-0 bg-black">
      <img
        v-for="imgSrc in backgroundLayers"
        :key="imgSrc"
        :src="imgSrc"
        alt="Background"
        :class="`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
          activeBg === imgSrc ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`"
      />

      <!-- Gradients for readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent mix-blend-multiply pointer-events-none"></div>
      <div class="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" :style="{ backgroundColor: `${themeColor}10` }"></div>
    </div>

    <!-- Floating HUD Elements -->
    <div class="absolute top-6 right-6 flex flex-col items-end gap-2 z-20 pointer-events-none">
      <div class="px-3 py-1 bg-black/60 backdrop-blur-md border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(74,222,128,0.2)] flex items-center gap-2">
        <div :class="`w-2 h-2 rounded-full ${status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`"></div>
        {{ status }}
      </div>
      <div class="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-blue-200 text-xs font-mono rounded" :style="{ color: `${themeColor}dd` }">
        {{ level }}
      </div>
    </div>

    <!-- Content Layer -->
    <div class="relative z-10 p-8 md:p-10 flex flex-col h-full justify-between">

      <!-- Header -->
      <div class="mt-4 pointer-events-none">
        <h2 class="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg leading-none">
          {{ name }}
        </h2>
        <p class="font-mono text-sm mt-3 flex items-center gap-2 font-bold" :style="{ color: themeColor }">
          <Gamepad2 :size="16" /> {{ role }}
        </p>
      </div>

      <!-- Timeline & Stats -->
      <div class="mt-auto space-y-8">

        <!-- Timeline -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest mb-4 opacity-80 border-b border-white/20 pb-2 inline-block pointer-events-none" :style="{ color: themeColor }">
            Shared Campaign
          </h4>
          <div class="space-y-4 pl-2 relative border-l border-white/10 ml-2">
            <div
              v-for="(item, i) in history"
              :key="i"
              class="relative pl-6 group/item cursor-pointer py-1"
              @mouseenter="item.image && (activeBg = item.image)"
              @mouseleave="activeBg = defaultBg"
            >
              <!-- Timeline Dot -->
              <div class="absolute -left-[5px] top-2.5 w-2.5 h-2.5 rounded-full bg-[#0f172a] border border-white/40 group-hover/item:bg-white group-hover/item:border-white transition-all shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10"></div>
              <!-- Connector Line Highlight -->
              <div class="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-white scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top"></div>

              <div class="flex items-center gap-3 transition-transform duration-300 group-hover/item:translate-x-2">
                <span class="text-xs font-mono text-white/40 group-hover/item:text-white/80 transition-colors">{{ item.year }}</span>
                <span class="text-sm font-bold text-gray-300 group-hover/item:text-white transition-colors flex items-center gap-2">
                  <component :is="item.icon" :size="14" class="opacity-50 group-hover/item:opacity-100 text-current" />
                  {{ item.event }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Game Card -->
        <div class="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group/game">
          <div class="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 border border-white/10 group-hover/game:border-white/50 transition-colors">
            <img :src="mainGameImg" class="w-full h-full object-cover" alt="Game" />
          </div>
          <div>
            <div class="text-[10px] uppercase tracking-wider font-bold mb-0.5" :style="{ color: themeColor }">Currently Playing</div>
            <div class="text-white font-bold group-hover/game:text-blue-200 transition-colors">{{ mainGame }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
