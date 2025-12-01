<script setup lang="ts">
import { ref } from 'vue'
import { Crown, Sparkles, Gamepad2 } from 'lucide-vue-next'

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
  backgroundImage: 'url("https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop")',
  transform: `scale(1.05) translate(${mousePos.value.x * -5}px, ${mousePos.value.y * -5}px)`
}))
</script>

<template>
  <section
    :id="id"
    class="media-section relative w-full h-screen snap-start overflow-hidden bg-[#2a0a2e] font-sans text-white"
    @mousemove="handleMouseMove"
  >
    <!-- Vibrant Background - Parallax -->
    <div
      class="absolute inset-0 z-0 bg-cover bg-center opacity-60 transition-transform duration-100 ease-out"
      :style="bgStyle"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-pink-600/40 via-purple-900/60 to-blue-900/80 mix-blend-overlay" />

    <!-- Checkerboard Floor Overlay with Perspective Tilt -->
    <div
      class="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 transition-transform duration-100 ease-out pointer-events-none"
      :style="{
        backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
        transform: `perspective(500px) rotateX(${60 + mousePos.y * 5}deg) scale(2) translateX(${mousePos.x * 20}px)`
      }"
    />

    <!-- Floating Orbs (Replaces Particles) -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/30 rounded-full blur-[60px] animate-blob" style="animation-duration: 12s" />
      <div class="absolute top-1/3 right-1/4 w-40 h-40 bg-cyan-500/30 rounded-full blur-[60px] animate-blob" style="animation-duration: 18s; animation-delay: 2s" />
      <div class="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-500/30 rounded-full blur-[50px] animate-blob" style="animation-duration: 15s; animation-delay: 5s" />
    </div>

    <!-- Character Portraits (Parallax Layer) -->
    <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-end justify-between px-0 md:px-10">

      <!-- Sora (Left) - Red Theme -->
      <div
        class="relative w-[30vh] md:w-[45vh] h-[60vh] md:h-[80vh] transition-transform duration-100 ease-out origin-bottom"
        :style="{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -5}px)` }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent mask-image-gradient"
          :style="{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)' }"
        >
          <img
            src="https://ui-avatars.com/api/?name=Sora&background=7f1d1d&color=fca5a5&size=512&font-size=0.4"
            alt="Sora"
            class="w-full h-full object-cover opacity-90 mix-blend-screen filter contrast-125"
          />
        </div>
        <!-- Character Glow -->
        <div class="absolute bottom-0 left-0 w-full h-1/2 bg-red-500/20 blur-3xl" />
        <div class="absolute bottom-20 left-10 text-6xl font-black text-red-200/10 uppercase tracking-tighter writing-vertical">
          Empty
        </div>
      </div>

      <!-- Shiro (Right) - Blue Theme -->
      <div
        class="relative w-[25vh] md:w-[40vh] h-[50vh] md:h-[70vh] transition-transform duration-100 ease-out origin-bottom"
        :style="{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -8}px)` }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent mask-image-gradient"
          :style="{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)' }"
        >
          <img
            src="https://ui-avatars.com/api/?name=Shiro&background=0c4a6e&color=bae6fd&size=512&font-size=0.4"
            alt="Shiro"
            class="w-full h-full object-cover opacity-90 mix-blend-screen filter contrast-125"
          />
        </div>
        <!-- Character Glow -->
        <div class="absolute bottom-0 right-0 w-full h-1/2 bg-blue-500/20 blur-3xl" />
        <div class="absolute bottom-20 right-10 text-6xl font-black text-blue-200/10 uppercase tracking-tighter writing-vertical">
          White
        </div>
      </div>

    </div>

    <!-- Main Content (Center) -->
    <div class="relative z-20 w-full h-full flex flex-col items-center justify-center p-6 pt-32 text-center pointer-events-none">

      <div class="pointer-events-auto">
        <!-- Logo Block -->
        <div
          class="relative mb-8 group cursor-pointer transition-transform duration-100 ease-out"
          :style="{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }"
        >
          <div class="absolute -inset-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <div class="relative border-4 border-white p-8 bg-black/30 backdrop-blur-sm rounded-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
            <h1
              class="text-5xl md:text-7xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 drop-shadow-[0_2px_0_rgba(0,0,0,1)]"
              style="-webkit-text-stroke: 1px white"
            >
              No Game<br>No Life
            </h1>
          </div>
          <div class="absolute -top-6 -right-6 text-yellow-400 animate-bounce">
            <Crown :size="48" fill="currentColor" />
          </div>
        </div>

        <!-- The 10 Pledges Card -->
        <div
          class="max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg text-left shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-transform duration-100 ease-out mx-auto"
          :style="{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }"
        >
          <div class="flex items-center gap-2 mb-4 text-pink-300 font-bold uppercase tracking-wider text-sm border-b border-white/10 pb-2">
            <Sparkles :size="16" /> Aschente
          </div>
          <p class="text-sm md:text-base leading-relaxed text-gray-100 font-medium">
            "In this world, everything is decided by games."
          </p>
          <p class="text-xs text-gray-300 mt-2 italic">
            The Ten Pledges apply to all sentient races in Disboard. Violence is forbidden. All conflicts are resolved through games.
          </p>
        </div>

        <!-- Action Button -->
        <button class="mt-12 group relative px-8 py-3 bg-transparent overflow-hidden rounded-full mx-auto block">
          <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity" />
          <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <span class="relative flex items-center gap-2 font-bold uppercase tracking-widest text-white justify-center">
            <Gamepad2 :size="20" /> Challenge
          </span>
        </button>
      </div>

    </div>
  </section>
</template>
