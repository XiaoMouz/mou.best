<script setup lang="ts">
import { ref } from 'vue'
import { Star, Clock, ChevronDown } from 'lucide-vue-next'

const { t } = useLanguage()
const activeTimeline = ref<number | null>(null)
const isTimelineExpanded = ref(true)

// Mock Group Data
const groupFriends = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  label: `Friend ${String.fromCharCode(65 + i)}`,
  x: Math.random() * 80 + 10, // 10-90%
  y: Math.random() * 60 + 20,
  delay: Math.random() * 5,
  size: Math.random() * 40 + 50,
  color: ['bg-orange-400', 'bg-yellow-400', 'bg-red-400'][i % 3]
}))

const childhoodMemories = [
  { year: 2005, title: 'The First Encounter', desc: 'Met at the neighborhood park. Shared a bag of chips.' },
  { year: 2012, title: 'High School Duo', desc: 'Formed a band that never played a gig. Best times.' },
  { year: 2018, title: 'University Drift', desc: 'Different cities, but late night Discord calls kept us close.' },
  { year: 2024, title: 'Reunion', desc: 'Still the same jokes, just different jobs.' },
]
</script>

<template>
  <div class="bg-surface-container rounded-[3rem] p-8 md:p-10 border border-outline-variant/10 relative overflow-hidden min-h-[600px] flex flex-col">

    <!-- Header -->
    <div class="flex justify-between items-start relative z-20 mb-8">
      <h2 class="text-xl font-bold text-on-surface flex items-center gap-2">
        <Star :size="24" class="text-orange-400" /> {{ t('friends.group') }}
      </h2>
      <div class="bg-surface/50 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-on-surface-variant border border-white/10">
        Est. 2005
      </div>
    </div>

    <!-- 1. Interactive Bubble Area -->
    <div class="relative w-full h-[300px] mb-8 bg-surface-container-high/30 rounded-3xl border border-white/5 overflow-hidden">
      <div class="absolute inset-0 z-10">
        <div
          v-for="f in groupFriends"
          :key="f.id"
          :class="`absolute rounded-full ${f.color}/20 border ${f.color}/40 flex items-center justify-center text-[10px] text-on-surface font-bold uppercase tracking-tighter backdrop-blur-sm cursor-pointer hover:scale-110 hover:bg-opacity-40 transition-all duration-300 animate-blob shadow-lg`"
          :style="{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${10 + f.delay}s`
          }"
          :title="f.label"
        >
          <!-- Initial -->
          {{ f.label.split(' ')[1] }}
        </div>
      </div>
      <div class="absolute bottom-4 left-0 w-full text-center z-0 pointer-events-none opacity-40">
        <span class="text-[100px] font-black text-on-surface-variant/5 leading-none">ORIGIN</span>
      </div>
    </div>

    <!-- 2. Nested Timeline Section -->
    <div class="relative z-20 mt-auto bg-surface/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8">
      <button
        @click="isTimelineExpanded = !isTimelineExpanded"
        class="w-full flex items-center justify-between mb-6 group"
      >
        <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
          <Clock :size="20" class="text-tertiary" /> {{ t('friends.childhood') }}
        </h3>
        <ChevronDown :size="20" :class="`text-on-surface-variant transition-transform duration-300 ${isTimelineExpanded ? 'rotate-180' : ''}`" />
      </button>

      <div :class="`relative transition-all duration-700 ease-in-out overflow-hidden ${isTimelineExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`">
        <!-- Center Line -->
        <div class="absolute left-4 md:left-[19px] top-2 bottom-2 w-0.5 bg-outline-variant/20"></div>

        <div class="space-y-8 pl-12 md:pl-16">
          <div
            v-for="(mem, i) in childhoodMemories"
            :key="i"
            class="relative group cursor-pointer"
            @click="activeTimeline = (activeTimeline === i ? null : i)"
          >
            <!-- Timeline Dot -->
            <div :class="`absolute left-[-38px] md:left-[-54px] top-1 w-4 h-4 rounded-full border-4 border-surface transition-all duration-300 z-10 ${
              activeTimeline === i ? 'bg-tertiary scale-125 shadow-[0_0_0_4px_rgba(var(--tertiary),0.2)]' : 'bg-outline-variant/50 group-hover:bg-tertiary'}`"></div>

            <!-- Content -->
            <div :class="`transition-all duration-300 ${activeTimeline === i ? 'translate-x-2' : ''}`">
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-2xl font-black text-tertiary/20 group-hover:text-tertiary/40 transition-colors">{{ mem.year }}</span>
                <h4 class="text-base font-bold text-on-surface">{{ mem.title }}</h4>
              </div>
              <div :class="`text-sm text-on-surface-variant overflow-hidden transition-all duration-500 ${activeTimeline === i ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 md:max-h-20 md:opacity-60'}`">
                {{ mem.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
