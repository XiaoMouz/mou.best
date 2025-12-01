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
    bg: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop',
    color: '#3b82f6',
    mainChar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200',
    cast: [
      {
        name: 'Viggo Tarasov',
        role: 'Target',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200',
      },
      {
        name: 'Iosef Tarasov',
        role: 'Target',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      },
      {
        name: 'Marcus',
        role: 'Ally',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=800',
        title: 'The Puppy',
      },
      {
        src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800',
        title: 'Mustang 1969',
      },
      {
        src: 'https://images.unsplash.com/photo-1514820402329-de527fdd2d7d?q=80&w=800',
        title: 'The Red Circle',
      },
      {
        src: 'https://images.unsplash.com/photo-1596484552885-6bb04b77f9c2?q=80&w=800',
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
    bg: 'https://images.unsplash.com/photo-1542259681-d4cd7193bc70?q=80&w=2669&auto=format&fit=crop',
    color: '#a855f7',
    mainChar:
      'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1200',
    cast: [
      {
        name: 'Santino',
        role: 'Target',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
      },
      {
        name: 'Cassian',
        role: 'Adversary',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200',
      },
      {
        name: 'Ares',
        role: 'Enforcer',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1517604931442-710c8ef555c9?q=80&w=800',
        title: 'Rome Catacombs',
      },
      {
        src: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800',
        title: 'Hall of Mirrors',
      },
      {
        src: 'https://images.unsplash.com/photo-1533109721025-d1ae7ee7c1e1?q=80&w=800',
        title: 'The Marker',
      },
      {
        src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800',
        title: 'Sommelier',
      },
    ],
  },
  {
    id: 3,
    title: 'Parabellum',
    subtitle: 'Prepare for War',
    quote: 'Si vis pacem, para bellum.',
    bg: 'https://images.unsplash.com/photo-1517604931442-710c8ef555c9?q=80&w=2669&auto=format&fit=crop',
    color: '#eab308',
    mainChar:
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200',
    cast: [
      {
        name: 'Sofia',
        role: 'Ally',
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
      },
      {
        name: 'Zero',
        role: 'Adversary',
        img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=200',
      },
      {
        name: 'Adjudicator',
        role: 'High Table',
        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=800',
        title: 'Casablanca',
      },
      {
        src: 'https://images.unsplash.com/photo-1514820402329-de527fdd2d7d?q=80&w=800',
        title: 'The Elder',
      },
      {
        src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800',
        title: 'Glass House',
      },
      {
        src: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=800',
        title: 'Library',
      },
    ],
  },
  {
    id: 4,
    title: 'Chapter 4',
    subtitle: 'Baba Yaga',
    quote: 'Those who cling to death, live. Those who cling to life, die.',
    bg: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop',
    color: '#ef4444',
    mainChar:
      'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=1200',
    cast: [
      {
        name: 'Caine',
        role: 'Adversary',
        img: 'https://images.unsplash.com/photo-1506803682991-6f72481f663c?q=80&w=200',
      },
      {
        name: 'Marquis',
        role: 'Target',
        img: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=200',
      },
      {
        name: 'Killa',
        role: 'Target',
        img: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=800',
        title: 'Osaka Continental',
      },
      {
        src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800',
        title: 'Arc de Triomphe',
      },
      {
        src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800',
        title: 'Sacre Coeur',
      },
      {
        src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
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
          <!-- Main Character Hero Image -->
          <div
            class="relative w-80 h-[450px] transition-transform duration-300 ease-out"
            :style="{
              transform: `translate(${mousePos.x * -1}px, ${
                mousePos.y * -1
              }px)`,
            }"
          >
            <div
              class="absolute inset-0 border border-[var(--theme-color)]/30 bg-[var(--theme-color)]/5 backdrop-blur-sm transform rotate-3 transition-colors duration-500"
            ></div>
            <div
              class="absolute inset-0 border border-white/10 transform -rotate-2 bg-black/40 overflow-hidden shadow-2xl"
            >
              <img
                :key="current.id"
                :src="current.mainChar"
                alt="John Wick"
                class="w-full h-full object-cover grayscale contrast-125 brightness-90 animate-[fadeIn_0.5s_ease-out]"
              />
              <!-- Scanline Effect -->
              <div
                class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"
              ></div>

              <!-- Overlay Info -->
              <div
                class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent"
              >
                <div
                  class="font-display font-bold text-2xl text-white uppercase tracking-tighter"
                >
                  Baba Yaga
                </div>
                <div
                  class="flex items-center gap-2 text-xs text-[var(--theme-color)] font-mono mt-1"
                >
                  <Fingerprint :size="12" />
                  <span>ID: 994-001-JW</span>
                </div>
              </div>
            </div>
          </div>

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
