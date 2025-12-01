<script setup lang="ts">
import { ref, computed } from 'vue'
import { Map, Star, DollarSign, Radio, Users, Target, Shield, Zap, Skull, ChevronUp, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-vue-next'

interface CrewMember {
  name: string
  role: string
  side: 'left' | 'right'
  img: string
}

interface Character {
  id: number
  name: string
  fullName: string
  role: string
  color: string
  stats: {
    special: number
    stamina: number
    shooting: number
    strength: number
    stealth: number
    flying: number
    driving: number
    lung: number
  }
  bg: string
  hero: string
  crew: CrewMember[]
}

interface GTAVProps {
  id: string
}

const props = defineProps<GTAVProps>()

// Character Configuration
const CHARACTERS: Character[] = [
  {
    id: 0,
    name: 'Michael',
    fullName: 'Michael De Santa',
    role: 'The Professional',
    color: '#60a5fa', // Blue
    stats: { special: 80, stamina: 60, shooting: 100, strength: 60, stealth: 80, flying: 70, driving: 70, lung: 40 },
    bg: "https://images.unsplash.com/photo-1518640027989-a30d5d7e498e?q=80&w=2670&auto=format&fit=crop", // Modern/Rich Architecture
    hero: "https://ui-avatars.com/api/?name=Michael&background=000&color=60a5fa&size=512&font-size=0.33", // Placeholder for suit guy
    // Using avatars as placeholders for crew, in real app use transparent PNGs
    crew: [
        { name: 'Lester Crest', role: 'The Brains', side: 'left', img: 'https://ui-avatars.com/api/?name=Lester&background=1e3a8a&color=fff' },
        { name: 'Jimmy', role: 'The Son', side: 'right', img: 'https://ui-avatars.com/api/?name=Jimmy&background=1e3a8a&color=fff' },
    ]
  },
  {
    id: 1,
    name: 'Franklin',
    fullName: 'Franklin Clinton',
    role: 'The Driver',
    color: '#4ade80', // Green
    stats: { special: 90, stamina: 80, shooting: 60, strength: 70, stealth: 60, flying: 40, driving: 100, lung: 60 },
    bg: "https://images.unsplash.com/photo-1605218427306-635ba243971c?q=80&w=2669&auto=format&fit=crop", // Urban/Street
    hero: "https://ui-avatars.com/api/?name=Franklin&background=000&color=4ade80&size=512&font-size=0.33",
    crew: [
        { name: 'Lamar Davis', role: 'Homie', side: 'left', img: 'https://ui-avatars.com/api/?name=Lamar&background=064e3b&color=fff' },
        { name: 'Chop', role: 'The Dog', side: 'right', img: 'https://ui-avatars.com/api/?name=Chop&background=064e3b&color=fff' },
    ]
  },
  {
    id: 2,
    name: 'Trevor',
    fullName: 'Trevor Philips',
    role: 'The Maniac',
    color: '#fb923c', // Orange
    stats: { special: 100, stamina: 70, shooting: 80, strength: 90, stealth: 40, flying: 100, driving: 60, lung: 50 },
    bg: "https://images.unsplash.com/photo-1545134969-8debd725b007?q=80&w=2574&auto=format&fit=crop", // Desert
    hero: "https://ui-avatars.com/api/?name=Trevor&background=000&color=fb923c&size=512&font-size=0.33",
    crew: [
        { name: 'Ron Jakowski', role: 'CEO', side: 'left', img: 'https://ui-avatars.com/api/?name=Ron&background=7c2d12&color=fff' },
        { name: 'Wade', role: 'Cousin', side: 'right', img: 'https://ui-avatars.com/api/?name=Wade&background=7c2d12&color=fff' },
    ]
  },
  {
    id: 3,
    name: 'Online',
    fullName: 'GTA Online',
    role: 'The Kingpin',
    color: '#facc15', // Yellow/Teal mix usually, going Yellow
    stats: { special: 50, stamina: 100, shooting: 100, strength: 100, stealth: 100, flying: 100, driving: 100, lung: 100 },
    bg: "https://images.unsplash.com/photo-1577017040065-65052831a153?q=80&w=2664&auto=format&fit=crop", // Penthouse/City Night
    hero: "https://ui-avatars.com/api/?name=Online&background=000&color=facc15&size=512&font-size=0.33",
    crew: [
        { name: 'Agent 14', role: 'Handler', side: 'left', img: 'https://ui-avatars.com/api/?name=Agent14&background=ca8a04&color=fff' },
        { name: 'Pavel', role: 'Kapitan', side: 'right', img: 'https://ui-avatars.com/api/?name=Pavel&background=ca8a04&color=fff' },
    ]
  }
]

const activeCharIndex = ref(0)
const mousePos = ref({ x: 0, y: 0 })

const activeChar = computed(() => CHARACTERS[activeCharIndex.value])

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 20,
    y: (clientY / innerHeight - 0.5) * 20,
  }
}

const getCrewMember = (side: 'left' | 'right') => {
  return activeChar.value.crew.find(c => c.side === side)
}
</script>

<template>
  <section
    :id="props.id"
    class="game-section relative w-full h-screen snap-start overflow-hidden bg-black font-sans transition-colors duration-700"
    @mousemove="handleMouseMove"
    :style="{ '--char-color': activeChar.color }"
  >
    <!-- ================= BACKGROUND LAYERS ================= -->
    <div class="absolute inset-0 z-0">
        <div
          v-for="(char, index) in CHARACTERS"
          :key="char.id"
          :class="[
            'absolute inset-0 transition-opacity duration-700 ease-in-out',
            index === activeCharIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          ]"
        >
            <!-- BG Image with Parallax -->
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
              :style="{
                  backgroundImage: `url(${char.bg})`,
                  transform: `scale(1.1) translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`
              }"
            />
            <!-- Tint Overlay -->
            <div
              class="absolute inset-0 opacity-40 mix-blend-multiply transition-colors duration-700"
              :style="{ backgroundColor: char.color }"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
    </div>

    <!-- ================= 3D SCENE CONTENT ================= -->
    <div class="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">

        <!-- Active Character Scene Container -->
        <div class="relative w-full max-w-7xl h-full flex items-end justify-center pb-0 md:pb-10">

            <!-- LEFT CREW MEMBER -->
            <div
              class="absolute left-[10%] bottom-[10%] md:bottom-[15%] w-48 md:w-64 transition-all duration-700 ease-in-out transform origin-bottom"
              :style="{
                  transform: `translateX(${mousePos.x * -2}px) scale(${activeCharIndex === activeChar.id ? 1 : 0.9})`,
                  opacity: 1
              }"
            >
                <div class="relative group cursor-pointer">
                    <img
                      :src="getCrewMember('left')?.img"
                      alt="Crew Left"
                      class="w-full h-auto drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-300 mask-image-gradient"
                      :style="{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }"
                    />
                    <div class="absolute -top-12 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-2 rounded border-l-4 border-[var(--char-color)]">
                        <div class="font-bold uppercase text-sm">{{ getCrewMember('left')?.name }}</div>
                        <div class="text-xs text-[var(--char-color)]">{{ getCrewMember('left')?.role }}</div>
                    </div>
                </div>
            </div>

            <!-- RIGHT CREW MEMBER -->
            <div
              class="absolute right-[10%] bottom-[10%] md:bottom-[15%] w-48 md:w-64 transition-all duration-700 ease-in-out transform origin-bottom"
              :style="{
                  transform: `translateX(${mousePos.x * -2}px) scale(${activeCharIndex === activeChar.id ? 1 : 0.9})`,
                  opacity: 1
              }"
            >
                <div class="relative group cursor-pointer">
                     <img
                      :src="getCrewMember('right')?.img"
                      alt="Crew Right"
                      class="w-full h-auto drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-300 mask-image-gradient"
                      :style="{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }"
                    />
                    <div class="absolute -top-12 right-0 text-right opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white p-2 rounded border-r-4 border-[var(--char-color)]">
                        <div class="font-bold uppercase text-sm">{{ getCrewMember('right')?.name }}</div>
                        <div class="text-xs text-[var(--char-color)]">{{ getCrewMember('right')?.role }}</div>
                    </div>
                </div>
            </div>

            <!-- CENTER HERO CHARACTER -->
            <div
               class="relative z-20 w-[400px] md:w-[600px] transition-all duration-500 ease-out"
               :style="{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * 1}px)` }"
            >
                <img
                  :key="activeChar.id"
                  :src="activeChar.hero"
                  :alt="activeChar.name"
                  class="w-full h-full object-cover drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slide-up"
                  :style="{ filter: 'drop-shadow(0 0 10px var(--char-color))' }"
                />
                <!-- Name Overlay -->
                <div class="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <h1
                      class="text-8xl md:text-9xl font-black italic text-white uppercase tracking-tighter drop-shadow-lg scale-y-110"
                      :style="{ WebkitTextStroke: '2px black' }"
                    >
                        {{ activeChar.name }}
                    </h1>
                </div>
            </div>

        </div>
    </div>

    <!-- ================= UI OVERLAY (HUD) ================= -->
    <div class="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-12 pt-28 md:pt-32">

        <!-- Top Row: Logo & Location -->
        <div class="flex justify-between items-start pointer-events-auto">
            <div class="w-48 md:w-64">
                 <img
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Grand_Theft_Auto_V_logo.png/1200px-Grand_Theft_Auto_V_logo.png"
                   alt="Grand Theft Auto V"
                   class="w-full h-auto drop-shadow-2xl filter brightness-110"
                 />
            </div>

            <div class="text-right text-white drop-shadow-md">
                 <div class="text-3xl font-black italic uppercase tracking-widest">
                   {{ activeChar.name === 'Trevor' ? 'Sandy Shores' : 'Los Santos' }}
                 </div>
                 <div class="text-sm font-bold uppercase tracking-wide opacity-80 flex justify-end gap-2 items-center">
                     <Map :size="16" /> Current Location
                 </div>
            </div>
        </div>

        <!-- Bottom Row: Stats & Wheel -->
        <div class="flex justify-between items-end pointer-events-auto">

            <!-- Left: Stats Bars -->
            <div class="hidden md:block bg-black/60 p-4 rounded-lg backdrop-blur-sm w-64 space-y-2 border-l-2 border-white/20">
                <h3 class="text-white font-bold uppercase text-sm mb-2 border-b border-white/20 pb-1 flex justify-between">
                    Skills <span :style="{ color: activeChar.color }">{{ activeChar.role }}</span>
                </h3>
                <div
                  v-for="[stat, val] in Object.entries(activeChar.stats)"
                  :key="stat"
                  class="flex items-center gap-2"
                >
                    <div class="w-20 text-[10px] font-bold text-white/70 uppercase text-right">{{ stat }}</div>
                    <div class="flex-1 h-1.5 bg-gray-700 rounded-sm overflow-hidden">
                        <div
                          class="h-full transition-all duration-1000 ease-out"
                          :style="{
                              width: `${val}%`,
                              backgroundColor: activeChar.color
                          }"
                        />
                    </div>
                </div>
            </div>

            <!-- Right: Character Switch Wheel -->
            <div class="relative w-48 h-48 md:w-64 md:h-64 group rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <!-- Decorative Ring -->
                <div class="absolute inset-0 rounded-full border-[12px] border-black/80 backdrop-blur-sm pointer-events-none z-20" />

                <!-- Wheel Segments - Using Clip Path for 4-Slice Pie -->

                <!-- TOP: Franklin (Index 1) -->
                <button
                  @click="activeCharIndex = 1"
                  :class="[
                    'absolute inset-0 w-full h-full transition-all duration-200 hover:bg-white/10 z-10 flex items-start justify-center pt-2',
                    activeCharIndex === 1 ? 'bg-green-500/20' : 'bg-black/40'
                  ]"
                  :style="{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }"
                >
                   <div
                     :class="[
                       'mt-2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 overflow-hidden bg-black',
                       activeCharIndex === 1 ? 'scale-110 border-green-500' : 'border-gray-500 grayscale opacity-60'
                     ]"
                   >
                      <img :src="CHARACTERS[1].hero" class="w-full h-full object-cover" alt="Franklin" />
                   </div>
                </button>

                <!-- LEFT: Michael (Index 0) -->
                <button
                  @click="activeCharIndex = 0"
                  :class="[
                    'absolute inset-0 w-full h-full transition-all duration-200 hover:bg-white/10 z-10 flex items-center justify-start pl-2',
                    activeCharIndex === 0 ? 'bg-blue-500/20' : 'bg-black/40'
                  ]"
                  :style="{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }"
                >
                   <div
                     :class="[
                       'ml-2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 overflow-hidden bg-black',
                       activeCharIndex === 0 ? 'scale-110 border-blue-500' : 'border-gray-500 grayscale opacity-60'
                     ]"
                   >
                      <img :src="CHARACTERS[0].hero" class="w-full h-full object-cover" alt="Michael" />
                   </div>
                </button>

                <!-- RIGHT: Trevor (Index 2) -->
                <button
                  @click="activeCharIndex = 2"
                  :class="[
                    'absolute inset-0 w-full h-full transition-all duration-200 hover:bg-white/10 z-10 flex items-center justify-end pr-2',
                    activeCharIndex === 2 ? 'bg-orange-500/20' : 'bg-black/40'
                  ]"
                  :style="{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }"
                >
                   <div
                     :class="[
                       'mr-2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 overflow-hidden bg-black',
                       activeCharIndex === 2 ? 'scale-110 border-orange-500' : 'border-gray-500 grayscale opacity-60'
                     ]"
                   >
                       <img :src="CHARACTERS[2].hero" class="w-full h-full object-cover" alt="Trevor" />
                   </div>
                </button>

                <!-- BOTTOM: Online (Index 3) -->
                <button
                  @click="activeCharIndex = 3"
                  :class="[
                    'absolute inset-0 w-full h-full transition-all duration-200 hover:bg-white/10 z-10 flex items-end justify-center pb-2',
                    activeCharIndex === 3 ? 'bg-yellow-500/20' : 'bg-black/40'
                  ]"
                  :style="{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }"
                >
                   <div
                     :class="[
                       'mb-2 w-10 h-10 md:w-14 md:h-14 rounded-full border-2 overflow-hidden bg-black',
                       activeCharIndex === 3 ? 'scale-110 border-yellow-500' : 'border-gray-500 grayscale opacity-60'
                     ]"
                   >
                       <img :src="CHARACTERS[3].hero" class="w-full h-full object-cover" alt="Online" />
                   </div>
                </button>

                <!-- Center Hub -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-black/90 rounded-full border-4 border-gray-700 z-20 flex items-center justify-center pointer-events-none shadow-lg">
                    <span class="text-[10px] text-white/50 font-bold uppercase">Switch</span>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>
