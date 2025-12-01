<script setup lang="ts">
import { ref } from 'vue'
import { Flag } from 'lucide-vue-next'

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
</script>

<template>
  <section
    :id="id"
    class="media-section relative w-full h-screen snap-start overflow-hidden bg-[#1e2329] font-serif text-slate-200"
    @mousemove="handleMouseMove"
  >
    <!-- Cinematic Background - Parallax -->
    <div
      class="absolute inset-0 z-0 transition-transform duration-100 ease-out"
      :style="{ transform: `scale(1.05) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }"
    >
      <img
        src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop"
        alt="Washington DC"
        class="w-full h-full object-cover grayscale contrast-125 brightness-[0.4]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#1e2329] via-[#1e2329]/90 to-transparent" />
    </div>

    <!-- Main Content Grid -->
    <div class="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 px-8 md:px-20 pt-20">

      <!-- Left Column: Typography -->
      <div class="md:col-span-7 flex flex-col justify-center">
        <div
          class="max-w-2xl border-l-2 border-white/20 pl-8 md:pl-16 space-y-8 transition-transform duration-100 ease-out"
          :style="{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }"
        >

          <!-- Upside Down Flag Icon -->
          <div
            class="text-blue-900 drop-shadow-lg opacity-80 transform rotate-180 inline-block mb-4 transition-transform duration-300 ease-out"
            :style="{ transform: `rotate(180deg) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }"
          >
            <Flag :size="48" fill="currentColor" class="text-blue-900" />
          </div>

          <h1 class="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-sm">
            House<br>of Cards
          </h1>

          <div class="h-px w-24 bg-red-600" />

          <p class="text-xl md:text-2xl leading-relaxed text-slate-300 font-light italic opacity-90">
            "Democracy is so overrated."
          </p>

          <div class="space-y-1 text-sm md:text-base font-sans tracking-widest uppercase text-slate-400">
            <p>Kevin Spacey <span class="text-slate-600 mx-2">|</span> Robin Wright</p>
            <p class="text-xs text-slate-500 mt-2">Netflix Original Series</p>
          </div>

          <button class="mt-8 px-8 py-3 border border-slate-500 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold">
            Begin Chapter 1
          </button>
        </div>
      </div>

      <!-- Right Column: Character Portraits with Parallax -->
      <div class="md:col-span-5 hidden md:flex items-end justify-center relative h-full">

        <!-- Background Character (Claire) -->
        <div
          class="absolute bottom-0 right-10 w-[300px] h-[500px] transition-transform duration-100 ease-out z-10"
          :style="{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -5}px)` }"
        >
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
            alt="Claire"
            class="w-full h-full object-cover object-top grayscale contrast-125 brightness-75 mask-image-gradient"
            :style="{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1e2329] via-transparent to-transparent" />
          <!-- Name Tag -->
          <div class="absolute top-1/2 -left-10 text-4xl font-black text-white/5 uppercase tracking-tighter -rotate-90">
            Claire
          </div>
        </div>

        <!-- Foreground Character (Frank) -->
        <div
          class="absolute bottom-0 left-0 w-[380px] h-[600px] transition-transform duration-100 ease-out z-20"
          :style="{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -10}px)` }"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
            alt="Frank"
            class="w-full h-full object-cover object-top grayscale contrast-125 brightness-90 shadow-2xl"
            :style="{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1e2329] via-transparent to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-r from-[#1e2329]/50 via-transparent to-transparent" />
          <!-- Name Tag -->
          <div class="absolute top-1/2 -right-10 text-6xl font-black text-white/5 uppercase tracking-tighter rotate-90">
            Frank
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
