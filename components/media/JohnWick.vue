<script setup lang="ts">
import { ref, computed, type CSSProperties } from 'vue'
import {
  PlayCircle,
  Target,
  Skull,
  Image as ImageIcon,
  X,
  Crosshair,
  Fingerprint,
} from 'lucide-vue-next'

interface JohnWickProps {
  id: string
}

const props = defineProps<JohnWickProps>()

const CHAPTERS = [
  {
    id: 1,
    title: 'John Wick',
    subtitle: 'The Boogeyman',
    quote:
      "People keep asking if I'm back and I haven't really had an answer. But now, yeah, I'm thinkin' I'm back.",
    bg: '/media/johnwick/johnwick-1-bg.jpg',
    color: '#3b82f6',
    mainChar: '/media/johnwick/jw1-main.png',
    cast: [
      {
        name: 'Viggo Tarasov',
        role: 'Target',
        img: '/media/johnwick/viggotarasov.png',
      },
      {
        name: 'Iosef Tarasov',
        role: 'Target',
        img: '/media/johnwick/ioseftarasov.png',
      },
      {
        name: 'Marcus',
        role: 'Ally',
        img: '/media/johnwick/marcus.png',
      },
    ],
    gallery: [
      {
        src: '/media/johnwick/jw1-1.png',
        title: 'John Wick & The Puppy',
      },
      {
        src: '/media/johnwick/jw1-2.png',
        title: 'Mustang 1969',
      },
      {
        src: '/media/johnwick/jw1-3.png',
        title: 'The Red Circle',
      },
      {
        src: '/media/johnwick/jw1-4.png',
        title: 'Continental NY',
      },
    ],
  },
  {
    id: 2,
    title: 'Chapter 2',
    subtitle: 'Excommunicado',
    quote:
      "Whoever comes, whoever it is... I'll kill them. I'll kill them all.",
    bg: '/media/johnwick/johnwick-2-bg.png',
    color: '#a855f7',
    mainChar: '/media/johnwick/jw2-main.png',
    cast: [
      {
        name: 'Santino',
        role: 'Target',
        img: '/media/johnwick/santino.png',
      },
      {
        name: 'Cassian',
        role: 'Adversary',
        img: '/media/johnwick/cassian.png',
      },
      {
        name: 'Ares',
        role: 'Enforcer',
        img: '/media/johnwick/ares.png',
      },
    ],
    gallery: [
      {
        src: '/media/johnwick/jw2-1.png',
        title: 'Rome Catacombs',
      },
      {
        src: '/media/johnwick/jw2-2.png',
        title: 'Hall of Mirrors',
      },
      {
        src: '/media/johnwick/jw2-3.png',
        title: 'The Marker',
      },
      {
        src: '/media/johnwick/jw2-4.png',
        title: 'Sommelier',
      },
    ],
  },
  {
    id: 3,
    title: 'Parabellum',
    subtitle: 'Prepare for War',
    quote: 'Si vis pacem, para bellum.',
    bg: '/media/johnwick/johnwick-3-bg.png',
    color: '#eab308',
    mainChar: '/media/johnwick/jw3-main.png',
    cast: [
      {
        name: 'Sofia',
        role: 'Ally',
        img: '/media/johnwick/sofia.png',
      },
      {
        name: 'Zero',
        role: 'Adversary',
        img: '/media/johnwick/zero.png',
      },
      {
        name: 'Adjudicator',
        role: 'High Table',
        img: '/media/johnwick/adjudicator.png',
      },
    ],
    gallery: [
      {
        src: '/media/johnwick/jw3-1.png',
        title: 'Casablanca',
      },
      {
        src: '/media/johnwick/jw3-2.png',
        title: 'The Elder',
      },
      {
        src: '/media/johnwick/jw3-3.png',
        title: 'Glass House',
      },
      {
        src: '/media/johnwick/jw3-4.png',
        title: 'Library',
      },
    ],
  },
  {
    id: 4,
    title: 'Chapter 4',
    subtitle: 'Baba Yaga',
    quote: 'Those who cling to death, live. Those who cling to life, die.',
    bg: '/media/johnwick/johnwick-4-bg.png',
    color: '#ef4444',
    mainChar: '/media/johnwick/jw4-main.png',
    cast: [
      {
        name: 'Caine',
        role: 'Adversary',
        img: '/media/johnwick/caine.jpg',
      },
      {
        name: 'Marquis',
        role: 'Target',
        img: '/media/johnwick/marquis.jpg',
      },
      {
        name: 'Killa',
        role: 'Target',
        img: '/media/johnwick/killa.jpg',
      },
    ],
    gallery: [
      {
        src: '/media/johnwick/jw4-1.jpg',
        title: 'Osaka Continental',
      },
      {
        src: '/media/johnwick/jw4-2.jpg',
        title: 'Arc de Triomphe',
      },
      {
        src: '/media/johnwick/jw4-3.jpg',
        title: 'Sacre Coeur',
      },
      {
        src: '/media/johnwick/jw4-4.png',
        title: 'Radio Station',
      },
    ],
  },
]

const activeChapter = ref(0)
const showGallery = ref(false)
const mousePos = ref({ x: 0, y: 0 })

const current = computed(() => CHAPTERS[activeChapter.value])

const sectionStyle = computed(
  (): CSSProperties => ({
    '--theme-color': current.value.color,
  })
)

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 20,
    y: (clientY / innerHeight - 0.5) * 20,
  }
}
</script>

<template>
  <section
    :id="id"
    class="media-section relative w-full h-screen snap-start overflow-hidden bg-black font-sans transition-colors duration-1000"
    :style="sectionStyle"
    @mousemove="handleMouseMove"
  >
    <!-- Background Transition Group -->
    <div
      v-for="(chapter, index) in CHAPTERS"
      :key="chapter.id"
      :class="[
        'absolute inset-0 transition-opacity duration-1000',
        index === activeChapter ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear scale-110"
        :style="{
          backgroundImage: `url(${chapter.bg})`,
          transform: `translate(${mousePos.x * -1}px, ${
            mousePos.y * -1
          }px) scale(1.1)`,
        }"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-90"
      />
    </div>

    <!-- Neon Overlay -->
    <div
      class="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay bg-gradient-to-tr from-[var(--theme-color)] to-transparent transition-colors duration-1000"
    />

    <!-- Main Grid Content -->
    <div
      class="relative z-10 w-full h-full flex flex-col justify-between p-8 pt-32 md:p-12 md:pt-32"
    >
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="flex flex-col">
          <span
            class="text-white/60 text-sm tracking-[0.5em] uppercase font-bold mb-2"
            >The Continental Database</span
          >
          <div
            class="flex gap-2 items-center text-[var(--theme-color)] transition-colors duration-500"
          >
            <Target :size="20" />
            <span class="font-mono text-sm">STATUS: ACTIVE</span>
          </div>
        </div>
        <div class="hidden md:block">
          <span
            class="text-[var(--theme-color)] font-display text-6xl opacity-20 font-bold transition-colors duration-500"
            >JW-{{ current.id }}</span
          >
        </div>
      </div>

      <!-- Center Section: 2 Columns -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow items-center"
      >
        <!-- Left Column: Typography -->
        <div
          class="lg:col-span-7 space-y-8 transition-transform duration-100 ease-out"
          :style="{
            transform: `translate(${mousePos.x * 0.5}px, ${
              mousePos.y * 0.5
            }px)`,
          }"
        >
          <h1
            class="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase leading-[0.8] tracking-tighter drop-shadow-lg"
          >
            {{ current.title }}
          </h1>
          <h2
            class="text-2xl md:text-4xl text-[var(--theme-color)] font-serif italic tracking-wider transition-colors duration-500 pl-4 border-l-4 border-[var(--theme-color)]"
          >
            {{ current.subtitle }}
          </h2>
          <p
            class="text-xl md:text-2xl text-gray-300 font-serif max-w-xl leading-relaxed opacity-90 italic"
          >
            "{{ current.quote }}"
          </p>
        </div>

        <!-- Right Column: Character Visuals -->
        <div
          class="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative h-full"
        >
          <!-- Supporting Cast Strip -->
          <div
            class="absolute -bottom-8 -right-8 flex gap-4 transition-transform duration-200"
            :style="{
              transform: `translate(${mousePos.x * -0.5}px, ${
                mousePos.y * -0.5
              }px)`,
            }"
          >
            <div
              v-for="(char, i) in current.cast"
              :key="i"
              class="relative group w-24 h-32 border border-white/20 bg-black/80 backdrop-blur-md overflow-hidden hover:border-[var(--theme-color)] hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img
                :src="char.img"
                :alt="char.name"
                class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div
                class="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/90 to-transparent"
              >
                <span
                  class="text-[10px] text-[var(--theme-color)] font-bold uppercase truncate"
                  >{{ char.role }}</span
                >
                <span
                  class="text-xs text-white font-display uppercase leading-none truncate"
                  >{{ char.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Navigation -->
      <div
        class="flex flex-col md:flex-row items-end md:items-center justify-between gap-8 mt-auto z-20"
      >
        <!-- Chapter Selectors -->
        <div class="flex gap-4">
          <button
            v-for="(chapter, index) in CHAPTERS"
            :key="chapter.id"
            @click="activeChapter = index"
            :class="[
              'group relative w-16 h-24 md:w-20 md:h-28 rounded border transition-all duration-300 overflow-hidden',
              index === activeChapter
                ? 'border-[var(--theme-color)] scale-110 shadow-[0_0_20px_var(--theme-color)]'
                : 'border-white/10 hover:border-white/30 grayscale hover:grayscale-0',
            ]"
          >
            <img
              :src="chapter.bg"
              :alt="chapter.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors"
            />
            <span
              class="absolute bottom-2 right-2 text-xl font-display font-bold text-white"
              >{{ chapter.id }}</span
            >
          </button>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button
            @click="showGallery = true"
            class="flex items-center gap-2 md:gap-4 px-6 py-4 border border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)] hover:text-black font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
          >
            <ImageIcon :size="20" />
            <span class="hidden md:inline">Archives</span>
          </button>

          <button
            class="flex items-center gap-2 md:gap-4 px-6 md:px-8 py-4 bg-[var(--theme-color)] text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
          >
            <PlayCircle
              :size="24"
              class="group-hover:scale-110 transition-transform"
            />
            <span>Trailer</span>
          </button>

          <div
            class="p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
          >
            <Crosshair :size="24" />
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Overlay -->
    <div
      v-if="showGallery"
      class="absolute inset-0 z-50 bg-black/95 flex flex-col animate-[fadeIn_0.3s_ease-out] p-6 md:p-16"
    >
      <div
        class="flex justify-between items-center mb-8 pb-4 border-b border-white/20"
      >
        <div>
          <h2
            class="text-4xl font-display font-bold text-white uppercase tracking-tighter"
          >
            Visual Archives
            <span class="text-[var(--theme-color)] mx-2">//</span>
            {{ current.title }}
          </h2>
          <p
            class="text-[var(--theme-color)] font-mono text-sm tracking-widest"
          >
            ACCESS LEVEL: HIGH TABLE
          </p>
        </div>
        <button
          @click="showGallery = false"
          class="p-3 hover:bg-white/10 rounded-full transition-colors text-white group"
        >
          <X
            :size="32"
            class="group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full pr-2 custom-scrollbar pb-10"
      >
        <div
          v-for="(item, idx) in current.gallery"
          :key="idx"
          class="group relative aspect-video bg-gray-900 border border-white/10 hover:border-[var(--theme-color)] transition-all duration-300 overflow-hidden rounded-sm cursor-pointer shadow-lg"
        >
          <img
            :src="item.src"
            :alt="item.title"
            class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"
          ></div>

          <!-- Label Animation -->
          <div
            class="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <span
              class="text-white font-display uppercase tracking-widest text-lg border-l-4 border-[var(--theme-color)] pl-3 drop-shadow-md"
            >
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
