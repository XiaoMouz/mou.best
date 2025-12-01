<script setup lang="ts">
import { computed } from 'vue'
import { Heart, MessageCircle, Twitter } from 'lucide-vue-next'

interface SoulmateCardProps {
  image: string
  category: string
  quote: string
  description: string
  theme?: 'pink' | 'blue' | 'purple' | 'orange'
}

const props = withDefaults(defineProps<SoulmateCardProps>(), {
  theme: 'pink'
})

// Theme configurations
const themes = {
  pink: {
    badge: 'bg-pink-500/30 text-pink-100 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    overlay: 'bg-pink-900/10',
    glow: 'from-pink-500/10 to-purple-600/10',
    text: 'text-pink-100/90',
    btn: 'hover:bg-pink-600',
    heart: 'text-pink-400'
  },
  blue: {
    badge: 'bg-blue-500/30 text-blue-100 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    overlay: 'bg-blue-900/10',
    glow: 'from-blue-500/10 to-cyan-600/10',
    text: 'text-blue-100/90',
    btn: 'hover:bg-blue-600',
    heart: 'text-blue-400'
  },
  purple: {
    badge: 'bg-purple-500/30 text-purple-100 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    overlay: 'bg-purple-900/10',
    glow: 'from-purple-500/10 to-indigo-600/10',
    text: 'text-purple-100/90',
    btn: 'hover:bg-purple-600',
    heart: 'text-purple-400'
  },
  orange: {
    badge: 'bg-orange-500/30 text-orange-100 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    overlay: 'bg-orange-900/10',
    glow: 'from-orange-500/10 to-red-600/10',
    text: 'text-orange-100/90',
    btn: 'hover:bg-orange-600',
    heart: 'text-orange-400'
  }
}

const t = computed(() => themes[props.theme])
</script>

<template>
  <div class="relative group min-h-[250px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl h-full flex flex-col">
    <!-- Immersive Background Image -->
    <div class="absolute inset-0">
      <img
        :src="image"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        :alt="category"
      />
      <!-- Gradient Overlays for Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
      <div :class="`absolute inset-0 ${t.overlay} mix-blend-overlay`"></div>
    </div>

    <!-- Floating Particles/Glow -->
    <div :class="`absolute inset-0 bg-gradient-to-tr ${t.glow} opacity-50 animate-pulse-slow pointer-events-none`"></div>

    <!-- Content -->
    <div class="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full gap-6 flex-grow">

      <!-- Main Text Area -->
      <div class="flex flex-col gap-4">
        <div :class="`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest backdrop-blur-md border w-fit ${t.badge}`">
          <Heart :size="10" fill="currentColor" /> {{ category }}
        </div>

        <div>
          <h3 class="text-2xl md:text-3xl font-serif italic text-white leading-tight drop-shadow-lg mb-3">
            {{ quote }}
          </h3>

          <p :class="`leading-relaxed text-sm md:text-base font-medium drop-shadow-md ${t.text}`">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 shrink-0 pt-4 md:pt-0">
        <button :class="`p-2.5 rounded-full bg-white/10 ${t.btn} text-white transition-all backdrop-blur-md border border-white/20 hover:scale-110 shadow-lg group/btn`">
          <MessageCircle :size="18" class="group-hover/btn:fill-current" />
        </button>
        <button class="p-2.5 rounded-full bg-white/10 hover:bg-sky-500 text-white transition-all backdrop-blur-md border border-white/20 hover:scale-110 shadow-lg">
          <Twitter :size="18" />
        </button>
      </div>
    </div>

    <!-- Decorative Hearts -->
    <div :class="`absolute top-6 right-6 ${t.heart} opacity-20 text-4xl animate-bounce`" style="animation-duration: 3s">♥</div>
  </div>
</template>
