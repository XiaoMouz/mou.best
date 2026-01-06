<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  User,
  Shield,
  Sword,
  ChevronDown,
  Activity,
  AlertCircle,
  Map as MapIcon,
  Box,
  Zap,
  Users,
  Settings,
  LogOut,
  Navigation,
} from 'lucide-vue-next'

interface SwordArtOnlineProps {
  id: string
}

const props = defineProps<SwordArtOnlineProps>()

type MenuType = 'equipment' | 'skills' | 'items' | 'map' | 'party' | 'system'

const activeMenu = ref<MenuType>('equipment')
const rotation = ref(0)
const mousePos = ref({ x: 0, y: 0 })

const menuItems = [
  { id: 'equipment' as MenuType, icon: User, label: 'Equipment' },
  { id: 'skills' as MenuType, icon: Sword, label: 'Skills' },
  { id: 'items' as MenuType, icon: Box, label: 'Items' },
  { id: 'map' as MenuType, icon: MapIcon, label: 'Map' },
  { id: 'party' as MenuType, icon: Users, label: 'Party' },
  { id: 'system' as MenuType, icon: Settings, label: 'System' },
]

watch(activeMenu, (newMenu) => {
  const index = menuItems.findIndex((item) => item.id === newMenu)
  rotation.value = index * 60
})

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e
  const { innerWidth, innerHeight } = window
  mousePos.value = {
    x: (clientX / innerWidth - 0.5) * 2,
    y: (clientY / innerHeight - 0.5) * 2,
  }
}

const bgStyle = computed(() => ({
  backgroundImage: 'url("/media/swordartonline/bg.png")',
  transform: `scale(1.1) translate(${mousePos.value.x * -5}px, ${
    mousePos.value.y * -5
  }px)`,
}))

const cardContent = computed(() => {
  switch (activeMenu.value) {
    case 'equipment':
      return {
        title: 'Equipment Status',
        badge: 'Dual Wielding',
        content: 'equipment',
      }
    case 'skills':
      return {
        title: 'Sword Skills',
        content: 'skills',
      }
    case 'items':
      return {
        title: 'Inventory',
        subtitle: '45/100',
        content: 'items',
      }
    case 'map':
      return {
        title: 'Floor 74 - Kamdej',
        content: 'map',
      }
    case 'party':
      return {
        title: 'Party Members',
        badge: 'Leader',
        badgeColor: 'green',
        content: 'party',
      }
    case 'system':
      return {
        title: 'System Menu',
        content: 'system',
      }
    default:
      return {
        content: 'default',
      }
  }
})
</script>

<template>
  <section
    :id="id"
    class="media-section relative w-full h-screen snap-start overflow-hidden bg-gray-900 font-sans"
    @mousemove="handleMouseMove"
  >
    <!-- Background - Aincrad Sky (Slowest Parallax) -->
    <div
      class="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-100 ease-out"
      :style="bgStyle"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-transparent mix-blend-multiply"
      ></div>
      <!-- Hexagon Grid Pattern (Medium Parallax) -->
      <div
        class="absolute inset-0 opacity-20 transition-transform duration-100 ease-out"
        style="
          backgroundimage: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l25.98 15v30L30 60 4.02 45V15z\' fill-opacity=\'0.2\' fill=\'%23ffffff\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');
          backgroundsize: 60px 60px;
        "
        :style="{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        }"
      ></div>
    </div>

    <!-- Dual Portrait Background Visual (Absolute Layer - Fastest Parallax) -->
    <div
      class="absolute inset-y-0 right-0 w-full md:w-3/4 flex items-end justify-end pointer-events-none z-0 opacity-90 mask-image-gradient"
    >
      <!-- Eugeo (Blue Theme) -->
      <div
        class="w-1/3 h-[75%] bg-gradient-to-t from-blue-900/80 to-transparent relative transform translate-x-8 translate-y-8 md:translate-y-0 transition-transform duration-100 ease-out hover:-translate-y-4"
        :style="{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        }"
      >
        <div
          class="absolute bottom-0 left-0 w-full h-full flex items-end justify-center overflow-hidden"
        >
          <img
            src="https://ui-avatars.com/api/?name=Eugeo&background=1e3a8a&color=fff&size=512"
            alt="Eugeo"
            class="w-[140%] h-auto opacity-50 mix-blend-overlay filter grayscale brightness-150"
          />
        </div>
        <div
          class="absolute bottom-10 left-10 text-6xl font-black text-blue-200/20 uppercase tracking-tighter writing-vertical"
        >
          Eugeo
        </div>
      </div>

      <!-- Kirito (Black Theme) -->
      <div
        class="w-1/3 h-[80%] bg-gradient-to-t from-black/90 to-transparent relative z-10 transform -translate-x-4 transition-transform duration-100 ease-out hover:-translate-y-4"
        :style="{
          transform: `translate(${mousePos.x * 20 - 16}px, ${
            mousePos.y * 20
          }px)`,
        }"
      >
        <div
          class="absolute bottom-0 left-0 w-full h-full flex items-end justify-center overflow-hidden"
        >
          <img
            src="https://ui-avatars.com/api/?name=Kirito&background=000&color=fff&size=512"
            alt="Kirito"
            class="w-[140%] h-auto opacity-60 mix-blend-overlay filter grayscale brightness-125"
          />
        </div>
        <div
          class="absolute bottom-10 right-10 text-6xl font-black text-gray-200/20 uppercase tracking-tighter writing-vertical"
        >
          Kirito
        </div>
      </div>
    </div>

    <!-- Main Grid Layout -->
    <div
      class="relative z-10 w-full h-full pt-20 md:pt-24 px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 pointer-events-none"
    >
      <!-- LEFT COL: Circular Menu (Interactive) -->
      <div
        class="md:col-span-4 flex items-center justify-center md:justify-start pointer-events-auto relative"
      >
        <div
          class="relative group scale-75 md:scale-90 origin-center md:origin-left transition-transform duration-100 ease-out"
          :style="{
            transform: `translate(${mousePos.x * 5}px, ${
              mousePos.y * 5
            }px) scale(0.9)`,
          }"
        >
          <!-- Glow Effect -->
          <div
            class="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          ></div>

          <!-- The Main Menu Circle -->
          <div class="relative w-96 h-96 flex items-center justify-center">
            <!-- Center Content -->
            <div
              class="z-10 text-center text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] pointer-events-none"
            >
              <h1 class="text-5xl font-fantasy font-bold mb-2">SAO</h1>
              <div class="text-sm tracking-widest uppercase opacity-80">
                Link Start
              </div>
            </div>

            <!-- Rotating Container for Revolver Effect -->
            <div
              class="absolute inset-0 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
              :style="{ transform: `rotate(${rotation}deg)` }"
            >
              <!-- Floating Menu Icons -->
              <button
                v-for="(item, i) in menuItems"
                :key="item.id"
                @click="activeMenu = item.id"
                :class="[
                  'absolute w-16 h-16 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center cursor-pointer transition-all duration-300 z-20 group/icon',
                  activeMenu === item.id
                    ? 'bg-yellow-400 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.8)]'
                    : 'bg-gray-200/90 hover:bg-yellow-100 hover:scale-110',
                ]"
                :style="{
                  top: '50%',
                  left: '50%',
                  marginTop: '-32px',
                  marginLeft: '-32px',
                  transform: `translate(${
                    140 * Math.cos((-i * 60 * Math.PI) / 180)
                  }px, ${
                    140 * Math.sin((-i * 60 * Math.PI) / 180)
                  }px) rotate(${-rotation}deg)`,
                }"
              >
                <component
                  :is="item.icon"
                  :size="28"
                  :class="
                    activeMenu === item.id ? 'text-black' : 'text-gray-700'
                  "
                />
                <div
                  :class="[
                    'absolute -bottom-8 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity pointer-events-none whitespace-nowrap',
                    activeMenu === item.id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover/icon:opacity-100',
                  ]"
                >
                  {{ item.label }}
                </div>
              </button>
            </div>

            <!-- Connecting Rings (Decorative) -->
            <div
              class="absolute inset-0 rounded-full border border-white/20 scale-75 animate-[spin_10s_linear_infinite] pointer-events-none"
            ></div>
            <div
              class="absolute inset-0 rounded-full border border-dashed border-white/10 scale-90 animate-[spin_20s_linear_infinite_reverse] pointer-events-none"
            ></div>
          </div>
        </div>
      </div>

      <!-- CENTER-LEFT COL: Content Card (Moved Closer to Left) -->
      <div
        class="md:col-span-5 flex items-center justify-start pointer-events-auto z-20 relative animate-fade-in md:-ml-20 scale-90 origin-left"
        style="perspective: 1000px"
      >
        <!-- Holographic Content Card -->
        <div
          class="relative w-full max-w-sm bg-gray-50/60 backdrop-blur-md rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/40 transition-transform duration-75 ease-out hover:bg-white/40"
          :style="{
            transform: `
              rotateY(${-15 + mousePos.x * 8}deg)
              rotateX(${mousePos.y * -5}deg)
              translateX(${mousePos.x * 10}px)
              translateY(${mousePos.y * 20}px)
            `,
          }"
        >
          <!-- Card Header -->
          <div
            class="h-14 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-between px-6 shadow-md relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 p-2 opacity-10 transform rotate-12"
            >
              <Sword :size="80" class="text-white" />
            </div>
            <div class="flex items-center gap-3 relative z-10">
              <div
                :class="[
                  'w-3 h-3 rounded-full',
                  activeMenu === 'skills'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-green-500',
                ]"
              ></div>
              <h2 class="text-xl font-bold text-white capitalize tracking-wide">
                {{ activeMenu }} Window
              </h2>
            </div>
            <div class="text-white/40 font-mono text-xs">ID: 459-22-90</div>
          </div>

          <!-- Card Body -->
          <div class="p-6 min-h-[300px] relative">
            <div
              class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"
            ></div>

            <!-- Equipment Content -->
            <div
              v-if="activeMenu === 'equipment'"
              key="equipment"
              class="space-y-4 animate-slide-up"
            >
              <div
                class="flex items-center gap-4 mb-4 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">
                  Equipment Status
                </h3>
                <span
                  class="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded font-bold"
                  >Dual Wielding</span
                >
              </div>

              <div class="space-y-3">
                <div
                  class="flex justify-between items-center group cursor-pointer"
                >
                  <span
                    class="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-600"
                    >Main Hand</span
                  >
                  <span class="font-bold text-gray-800 text-sm"
                    >Elucidator +50</span
                  >
                </div>
                <div
                  class="flex justify-between items-center group cursor-pointer"
                >
                  <span
                    class="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-600"
                    >Off Hand</span
                  >
                  <span class="font-bold text-gray-800 text-sm"
                    >Dark Repulser +45</span
                  >
                </div>
                <div
                  class="flex justify-between items-center group cursor-pointer"
                >
                  <span
                    class="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-600"
                    >Coat</span
                  >
                  <span class="font-bold text-gray-800 text-sm"
                    >Black Wyrm Coat</span
                  >
                </div>
              </div>

              <div class="pt-4 space-y-2">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-xs font-bold text-gray-500">STR</span>
                    <span class="text-xs font-bold text-gray-800">852</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-300 rounded-full">
                    <div
                      class="w-[85%] h-full bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                    ></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-xs font-bold text-gray-500">AGI</span>
                    <span class="text-xs font-bold text-gray-800">960</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-300 rounded-full">
                    <div
                      class="w-[95%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skills Content -->
            <div
              v-else-if="activeMenu === 'skills'"
              key="skills"
              class="space-y-2 animate-slide-up"
            >
              <div
                class="flex items-center gap-4 mb-4 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">Sword Skills</h3>
              </div>
              <div
                v-for="(skill, i) in [
                  {
                    name: 'Starburst Stream',
                    type: '16-Hit Combo',
                    cost: 'High',
                  },
                  { name: 'Horizontal Square', type: '4-Hit AoE', cost: 'Med' },
                  { name: 'Vorpal Strike', type: 'Heavy Thrust', cost: 'High' },
                  { name: 'Sonic Leap', type: 'Charge', cost: 'Low' },
                ]"
                :key="i"
                class="flex justify-between items-center p-2 hover:bg-blue-50 rounded transition-colors cursor-pointer group"
              >
                <div class="flex items-center gap-2">
                  <Zap :size="14" class="text-yellow-500" />
                  <span
                    class="font-bold text-gray-700 text-sm group-hover:text-blue-600"
                    >{{ skill.name }}</span
                  >
                </div>
                <span class="text-xs text-gray-400">{{ skill.type }}</span>
              </div>
            </div>

            <!-- Items Content -->
            <div
              v-else-if="activeMenu === 'items'"
              key="items"
              class="space-y-2 animate-slide-up"
            >
              <div
                class="flex items-center gap-4 mb-4 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">Inventory</h3>
                <span class="text-xs text-gray-500">45/100</span>
              </div>
              <div
                v-for="(item, i) in [
                  { name: 'Healing Crystal', qty: 12, color: 'text-green-500' },
                  { name: 'Teleport Crystal', qty: 3, color: 'text-blue-500' },
                  { name: 'Antidote Potion', qty: 5, color: 'text-yellow-500' },
                  {
                    name: 'Map Data: Floor 74',
                    qty: 1,
                    color: 'text-purple-500',
                  },
                ]"
                :key="i"
                class="flex justify-between items-center p-2 hover:bg-gray-100 rounded border-b border-gray-200 cursor-pointer"
              >
                <div class="flex items-center gap-3">
                  <Box :size="14" :class="item.color" />
                  <span class="font-medium text-gray-700 text-sm">{{
                    item.name
                  }}</span>
                </div>
                <span class="text-xs font-bold text-gray-500"
                  >x{{ item.qty }}</span
                >
              </div>
            </div>

            <!-- Map Content -->
            <div
              v-else-if="activeMenu === 'map'"
              key="map"
              class="animate-slide-up h-full flex flex-col"
            >
              <div
                class="flex items-center gap-4 mb-2 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">
                  Floor 74 - Kamdej
                </h3>
              </div>
              <div
                class="flex-grow bg-gray-900 rounded-lg relative overflow-hidden border border-gray-600 group"
              >
                <!-- Simulated Grid Map -->
                <div
                  class="absolute inset-0 opacity-20"
                  style="
                    backgroundimage: radial-gradient(
                      circle,
                      #3b82f6 1px,
                      transparent 1px
                    );
                    backgroundsize: 20px 20px;
                  "
                ></div>

                <!-- Rooms -->
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-blue-500/50 bg-blue-900/20"
                ></div>
                <div
                  class="absolute top-1/2 left-1/2 translate-x-16 -translate-y-4 w-24 h-8 border-2 border-blue-500/30"
                ></div>
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-40 -translate-y-4 w-24 h-8 border-2 border-blue-500/30"
                ></div>
                <div
                  class="absolute top-1/4 left-1/2 -translate-x-16 -translate-y-1/2 w-32 h-24 border-2 border-blue-500/50 bg-blue-900/10"
                ></div>

                <!-- Player Marker -->
                <div
                  class="absolute top-1/2 left-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-green-400 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_lime]"
                ></div>

                <!-- Boss Room Marker -->
                <div
                  class="absolute top-[20%] left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-red-500 rounded-full flex items-center justify-center animate-pulse"
                >
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>

                <div
                  class="absolute bottom-2 right-2 text-[10px] font-mono text-blue-300"
                >
                  X: 402 Y: 892 Z: 74
                </div>
              </div>
              <div class="mt-2 text-xs text-gray-500 flex justify-between">
                <span>Safe Zone</span>
                <span class="text-blue-600 font-bold">Mapping: 82%</span>
              </div>
            </div>

            <!-- Party Content -->
            <div
              v-else-if="activeMenu === 'party'"
              key="party"
              class="animate-slide-up space-y-3"
            >
              <div
                class="flex items-center gap-4 mb-4 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">Party Members</h3>
                <span
                  class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold"
                  >Leader</span
                >
              </div>

              <div
                v-for="(member, i) in [
                  { name: 'Kirito', lvl: 96, hp: 100, role: 'Beater' },
                  { name: 'Asuna', lvl: 94, hp: 100, role: 'Vice Commander' },
                  { name: 'Klein', lvl: 88, hp: 75, role: 'Samurai' },
                  { name: 'Agil', lvl: 85, hp: 90, role: 'Merchant' },
                  { name: 'Lisbeth', lvl: 86, hp: 100, role: 'Blacksmith' },
                ]"
                :key="i"
                class="bg-white/50 p-2 rounded border border-gray-200 flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-gray-300 overflow-hidden">
                    <img
                      :src="`https://ui-avatars.com/api/?name=${member.name}&background=random`"
                      :alt="member.name"
                    />
                  </div>
                  <div>
                    <div class="text-sm font-bold text-gray-800 leading-none">
                      {{ member.name }}
                    </div>
                    <div class="text-[10px] text-gray-500">
                      Lv. {{ member.lvl }} • {{ member.role }}
                    </div>
                  </div>
                </div>
                <div class="w-24">
                  <div
                    class="h-1.5 w-full bg-red-900/20 rounded-full overflow-hidden"
                  >
                    <div
                      :class="[
                        'h-full',
                        member.hp > 80
                          ? 'bg-green-500'
                          : member.hp > 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500',
                      ]"
                      :style="{ width: `${member.hp}%` }"
                    ></div>
                  </div>
                  <div class="text-[10px] text-right text-gray-400 mt-0.5">
                    {{ member.hp }}/100
                  </div>
                </div>
              </div>
            </div>

            <!-- System Content -->
            <div
              v-else-if="activeMenu === 'system'"
              key="system"
              class="animate-slide-up space-y-2"
            >
              <div
                class="flex items-center gap-4 mb-4 pb-2 border-b border-gray-400/30"
              >
                <h3 class="text-lg font-bold text-gray-800">System Menu</h3>
              </div>

              <button
                class="w-full text-left px-4 py-3 bg-white/50 hover:bg-blue-50 rounded border border-gray-200 text-gray-700 font-medium text-sm flex items-center gap-3 transition-colors"
              >
                <Settings :size="16" /> Options
              </button>
              <button
                class="w-full text-left px-4 py-3 bg-white/50 hover:bg-blue-50 rounded border border-gray-200 text-gray-700 font-medium text-sm flex items-center gap-3 transition-colors"
              >
                <AlertCircle :size="16" /> Help
              </button>

              <!-- Disabled Log Out Button -->
              <div class="relative group cursor-not-allowed opacity-60 mt-8">
                <button
                  disabled
                  class="w-full text-left px-4 py-3 bg-gray-200 rounded border border-gray-300 text-gray-400 font-medium text-sm flex items-center gap-3 grayscale"
                >
                  <LogOut :size="16" /> Log Out
                </button>
                <div
                  class="absolute top-0 right-2 bottom-0 flex items-center text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse"
                >
                  Unavailable
                </div>
              </div>

              <div
                class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 leading-relaxed"
              >
                <span class="font-bold">Notice:</span> Server disconnect is
                currently disabled by the game administrator.
              </div>
            </div>

            <!-- Default Content -->
            <div
              v-else
              key="default"
              class="h-48 flex flex-col items-center justify-center text-gray-400 animate-slide-up"
            >
              <Activity :size="32" class="mb-2 opacity-50" />
              <span class="text-sm font-medium">No Data Available</span>
            </div>
          </div>

          <!-- Card Footer -->
          <div
            class="bg-gray-200/80 p-2 text-center border-t border-gray-300/50"
          >
            <div class="flex justify-center gap-1">
              <div class="w-8 h-1 bg-gray-400 rounded-full"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COL: Empty space for Portraits visibility -->
      <div class="md:col-span-3"></div>
    </div>

    <!-- Alert Notification -->
    <!-- <div
      class="absolute top-24 right-4 md:right-8 bg-red-500/90 text-white px-4 md:px-6 py-2 rounded shadow-lg animate-pulse flex items-center gap-3 z-50 border border-red-400"
    >
      <AlertCircle :size="20" />
      <span class="font-bold tracking-wider uppercase text-xs md:text-sm"
        >Floor 74 Boss Detected</span
      >
    </div> -->
  </section>
</template>
