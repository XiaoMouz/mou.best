<script setup lang="ts">
import {
  MapPin,
  Github,
  Twitter,
  Mail,
  Gamepad2,
  Coffee,
  Camera,
  Code2,
  Cpu,
  Heart,
  Music,
  Send,
  Laptop,
  Monitor,
  Terminal,
  Command,
  AppWindow,
} from 'lucide-vue-next'

const { t } = useLanguage()

// Steam Gaming Status - Mock data (ready for API integration)
interface SteamStatus {
  isOnline: boolean
  currentGame: {
    name: string
    appId: number
    playTime: number
    artUrl: string
    details?: string
  } | null
  profileUrl: string
}

const steamStatus = ref<SteamStatus>({
  isOnline: false,
  currentGame: null,
  profileUrl: 'https://steamcommunity.com',
})

// Fetch Steam status from API
const fetchSteamStatus = async () => {
  try {
    const response = await $fetch<SteamStatus>('/api/steam/status')
    steamStatus.value = response
  } catch (error) {
    console.error('Failed to fetch Steam status:', error)
  }
}

interface NowPlaying {
  isPlaying: boolean
  track: {
    name: string
    artist: string
    albumArt?: string
    url?: string
  } | null
}

const nowPlaying = ref<NowPlaying>({
  isPlaying: false,
  track: null,
})

// Fetch music status from Discord API (via Lanyard)
const fetchNowPlaying = async () => {
  try {
    const response = await $fetch<NowPlaying>('/api/discord/music')
    nowPlaying.value = response
  } catch (error) {
    console.error('Failed to fetch now playing:', error)
  }
}

// Tech Stack
const techStack = [
  'TypeScript',
  'Vue.js',
  'React',
  'C#',
  'WinUI',
  'React Native',
  'Linux',
  'Docker',
  'PostgreSQL',
]

// Profile Stats
const stats = {
  yearsExp: '5+',
  projects: '20+',
  fueled: '90%+',
}

// Social Links
const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com',
    handle: '@XiaoMouz',
    color: 'text-on-surface',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com',
    handle: 'Latest thoughts',
    color: 'text-[#1DA1F2]',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:hello@example.com',
    handle: 'Email Me',
    color: 'text-on-primary-container',
    primary: true,
  },
]

// Dev Environment
const devEnvMacos = [
  {
    icon: Terminal,
    label: 'Warp Terminal',
    color: 'bg-gray-700',
    iconColor: 'text-green-400',
  },
  {
    icon: Code2,
    label: 'VS Code + Xcode',
    color: 'bg-blue-600/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Coffee,
    label: 'Homebrew',
    color: 'bg-orange-600/20',
    iconColor: 'text-orange-400',
  },
]

const devEnvWindows = [
  {
    icon: Code2,
    label: 'Visual Studio',
    color: 'bg-purple-600/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Terminal,
    label: 'WSL 2 (Arch)',
    color: 'bg-yellow-600/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Send,
    label: 'Scoop',
    color: 'bg-cyan-600/20',
    iconColor: 'text-cyan-400',
  },
]

// Auto-refresh for Steam status and music
onMounted(() => {
  fetchSteamStatus()
  fetchNowPlaying()

  // Refresh every 5 minutes (300 seconds)
  const interval = setInterval(() => {
    fetchSteamStatus()
    fetchNowPlaying()
  }, 300000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
@keyframes albumPulse {
  0%,
  100% {
    transform: scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
}
</style>

<template>
  <section
    class="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto animate-fade-in"
  >
    <!-- Page Header -->
    <div class="mb-12">
      <h1
        class="text-5xl md:text-7xl font-bold text-on-background mb-4 tracking-tight"
      >
        {{ t('about.title') }}
        <span class="text-primary">{{ t('about.me') }}</span>
      </h1>
      <p class="text-xl text-on-surface-variant max-w-2xl">
        {{ t('about.subtitle') }}
      </p>
    </div>

    <!-- Material You Bento Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]"
    >
      <!-- 1. Main Profile Card - Large -->
      <div
        class="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-surface-container-high rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group border border-outline-variant/10"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-primary/20"
        ></div>

        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-full overflow-hidden border-4 border-surface mb-6 shadow-xl"
          >
            <img
              src="https://picsum.photos/200/200"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <h2 class="text-3xl font-bold text-on-surface mb-2">XiaoMouz</h2>
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-sm font-medium mb-6"
          >
            <Code2 :size="16" /> {{ t('about.role') }}
          </div>
          <p class="text-on-surface-variant text-lg leading-relaxed">
            {{ t('about.bio') }}
          </p>
        </div>

        <div class="mt-8 pt-6 border-t border-outline-variant/20 flex gap-4">
          <div class="flex flex-col">
            <span class="text-3xl font-bold text-primary">{{
              stats.yearsExp
            }}</span>
            <span class="text-sm text-on-surface-variant">{{
              t('about.yearsExp')
            }}</span>
          </div>
          <div class="flex flex-col border-l border-outline-variant/20 pl-4">
            <span class="text-3xl font-bold text-primary">{{
              stats.projects
            }}</span>
            <span class="text-sm text-on-surface-variant">{{
              t('about.projects')
            }}</span>
          </div>
          <div class="flex flex-col border-l border-outline-variant/20 pl-4">
            <span class="text-3xl font-bold text-primary">{{
              stats.fueled
            }}</span>
            <span class="text-sm text-on-surface-variant">{{
              t('about.poweredBy')
            }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Location Widget - Map Style -->
      <div
        class="col-span-1 md:col-span-1 row-span-1 bg-surface-container rounded-[2.5rem] relative overflow-hidden group border border-outline-variant/10 min-h-[200px]"
      >
        <img
          src="https://images.unsplash.com/photo-1554913508-d017a4c7c813?q=80&w=1000&auto=format&fit=crop"
          alt="Location"
          class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6 right-6">
          <div
            class="flex items-center gap-2 text-primary-container bg-primary/90 backdrop-blur-md px-4 py-2 rounded-xl w-fit mb-1"
          >
            <MapPin :size="18" />
            <span class="font-bold">{{ t('about.location') }}</span>
          </div>
          <p class="text-xs text-white/70 pl-1">
            GMT+8 • {{ t('about.remote') }}
          </p>
        </div>
      </div>

      <!-- 3. Social Stack - Vertical Buttons -->
      <div class="col-span-1 md:col-span-1 row-span-2 flex flex-col gap-4">
        <template v-for="social in socialLinks" :key="social.name">
          <a
            v-if="social.primary"
            :href="social.url"
            class="flex-1 bg-primary-container hover:bg-primary/90 rounded-[2rem] p-6 flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 border border-outline-variant/10 group text-on-primary-container"
          >
            <component
              :is="social.icon"
              :size="40"
              class="mb-2 group-hover:scale-110 transition-transform"
            />
            <span class="font-medium">{{ social.handle }}</span>
          </a>
          <a
            v-else
            :href="social.url"
            target="_blank"
            rel="noreferrer"
            class="flex-1 bg-surface-container hover:bg-surface-container-high rounded-[2rem] p-6 flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 border border-outline-variant/10 group"
          >
            <component
              :is="social.icon"
              :size="40"
              :class="[
                social.color,
                'mb-2 group-hover:scale-110 transition-transform',
              ]"
            />
            <span class="font-medium text-on-surface">{{ social.name }}</span>
            <span class="text-xs text-on-surface-variant">{{
              social.handle
            }}</span>
          </a>
        </template>
      </div>

      <!-- 4. Tech Stack -->
      <div
        class="col-span-1 md:col-span-2 lg:col-span-1 row-span-1 bg-surface-container rounded-[2.5rem] p-6 border border-outline-variant/10"
      >
        <div class="flex items-center gap-2 mb-4 text-on-surface-variant">
          <Cpu :size="20" />
          <span class="font-bold uppercase tracking-wider text-xs">{{
            t('about.techStack')
          }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in techStack"
            :key="tech"
            class="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-medium border border-outline-variant/20 hover:border-primary/50 transition-colors"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- 5. Gaming Status Card (Steam) -->
      <div
        class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-[#1b2838] rounded-[2.5rem] p-6 relative overflow-hidden group border border-outline-variant/10"
      >
        <div
          class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"
        ></div>
        <div
          class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 h-full"
        >
          <div>
            <div class="flex items-center gap-2 text-blue-300 mb-2">
              <Gamepad2 :size="20" />
              <span class="font-bold uppercase tracking-wider text-xs">{{
                t('about.playing')
              }}</span>
            </div>
            <template v-if="steamStatus.currentGame">
              <h3 class="text-2xl font-bold text-white mb-1">
                {{ steamStatus.currentGame.name }}
              </h3>
              <p class="text-blue-200/60 text-sm">
                {{ steamStatus.currentGame.details }} •
                {{ steamStatus.currentGame.playTime }} hrs
              </p>
            </template>
            <div v-else class="flex flex-col gap-2">
              <p class="text-xl text-blue-200/80">
                {{ t('about.notPlaying') }}
              </p>
              <p class="text-blue-200/40 text-xs">
                {{ t('about.checkBackLater') }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden md:block">
              <div class="text-xs text-blue-200/60 font-mono">
                {{ t('about.steamStatus') }}
              </div>
              <div
                :class="[
                  steamStatus.isOnline ? 'text-green-400' : 'text-gray-400',
                  'font-bold flex items-center justify-end gap-2',
                ]"
              >
                <span
                  v-if="steamStatus.isOnline"
                  class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                ></span>
                <span v-else class="w-2 h-2 rounded-full bg-gray-500"></span>
                {{ steamStatus.isOnline ? t('about.online') : 'OFFLINE' }}
              </div>
            </div>
            <div
              v-if="steamStatus.currentGame"
              class="w-16 h-16 rounded-xl bg-black/50 overflow-hidden border border-white/10 shadow-lg"
            >
              <img
                :src="steamStatus.currentGame.artUrl"
                alt="Game Art"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-16 h-16 rounded-xl bg-black/20 overflow-hidden border border-white/5 flex items-center justify-center"
            >
              <Gamepad2 :size="32" class="text-blue-200/20" />
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Life / Music (Spotify/Last.fm) -->
      <div
        class="col-span-1 row-span-1 text-on-tertiary-container rounded-[2.5rem] p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden"
      >
        <!-- Album Art Background with Blur & Animation -->
        <div
          v-if="nowPlaying.track?.albumArt"
          class="absolute inset-0 opacity-40"
        >
          <img
            :src="nowPlaying.track.albumArt"
            :alt="nowPlaying.track.name"
            class="w-full h-full object-cover blur-xl scale-110 animate-[pulse_8s_ease-in-out_infinite]"
          />
        </div>

        <!-- Gradient Overlay -->
        <div
          v-else
          class="absolute inset-0 bg-gradient-to-br from-tertiary-container/80 via-tertiary-container/60 to-tertiary-container/80"
        ></div>

        <!-- Original blur decoration (fallback when no album art) -->
        <div
          v-if="!nowPlaying.track?.albumArt"
          class="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"
        ></div>

        <div class="flex items-center justify-between mb-4 relative z-10">
          <span
            class="p-2 rounded-full bg-white/10 backdrop-blur-sm"
            :class="nowPlaying.isPlaying ? 'animate-pulse' : ''"
          >
            <Music
              :size="20"
              :class="
                nowPlaying.isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
              "
            />
          </span>
          <div v-if="nowPlaying.isPlaying" class="flex gap-1">
            <div
              class="w-1 h-3 bg-white/40 rounded-full animate-bounce animate-[bounce_1s_infinite]"
            ></div>
            <div
              class="w-1 h-4 bg-white/60 rounded-full animate-[bounce_1.2s_infinite]"
            ></div>
            <div
              class="w-1 h-2 bg-white/40 rounded-full animate-[bounce_0.8s_infinite]"
            ></div>
          </div>
        </div>
        <div class="relative z-10">
          <div class="text-xs opacity-70 uppercase tracking-widest mb-1">
            <template v-if="nowPlaying.isPlaying">
              {{ t('about.onPlaying') }}
            </template>
            <template v-else>
              {{ t('about.pause') }}
            </template>
          </div>
          <template v-if="nowPlaying.track">
            <div class="font-bold text-lg leading-tight">
              {{ nowPlaying.track.name }}
            </div>
            <div class="text-sm opacity-80">{{ nowPlaying.track.artist }}</div>
          </template>
          <div v-else class="flex flex-col gap-1">
            <div class="text-sm opacity-60">{{ t('about.noMusic') }}</div>
            <div class="text-xs opacity-40">{{ t('about.silence') }}</div>
          </div>
        </div>
      </div>

      <!-- 7. Photography -->
      <div
        class="col-span-1 row-span-1 bg-surface-container-high rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center border border-outline-variant/10 group cursor-pointer hover:bg-surface-container transition-colors"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
        >
          <Camera :size="24" />
        </div>
        <div class="font-bold text-on-surface">
          {{ t('about.photography') }}
        </div>
        <div class="text-xs text-on-surface-variant">
          {{ t('about.checkGallery') }}
        </div>
      </div>

      <!-- 8. Development Environment (Software) -->
      <div
        class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-surface-container rounded-[2.5rem] overflow-hidden border border-outline-variant/10 flex flex-col md:flex-row"
      >
        <!-- macOS Side -->
        <div class="flex-1 p-8 bg-[#1e293b]/50 relative group">
          <div class="absolute top-0 right-0 p-3 opacity-20">
            <Laptop :size="100" />
          </div>
          <div class="flex items-center gap-2 text-white mb-4">
            <Command :size="20" />
            <span class="font-bold">{{ t('about.devEnv.macos') }}</span>
          </div>
          <div class="space-y-3 relative z-10">
            <div
              v-for="(item, index) in devEnvMacos"
              :key="index"
              class="flex items-center gap-3"
            >
              <div :class="['p-1.5 rounded-lg', item.color]">
                <component :is="item.icon" :size="14" :class="item.iconColor" />
              </div>
              <span class="text-sm text-gray-300">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Windows Side -->
        <div
          class="flex-1 p-8 bg-[#0f172a]/80 relative border-t md:border-t-0 md:border-l border-white/5"
        >
          <div class="absolute top-0 right-0 p-3 opacity-10">
            <Monitor :size="100" />
          </div>
          <div class="flex items-center gap-2 text-blue-400 mb-4">
            <AppWindow :size="20" />
            <span class="font-bold">{{ t('about.devEnv.windows') }}</span>
          </div>
          <div class="space-y-3 relative z-10">
            <div
              v-for="(item, index) in devEnvWindows"
              :key="index"
              class="flex items-center gap-3"
            >
              <div :class="['p-1.5 rounded-lg', item.color]">
                <component :is="item.icon" :size="14" :class="item.iconColor" />
              </div>
              <span class="text-sm text-gray-400">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Quote or Signoff -->
    <div class="mt-12 text-center p-8 border-t border-outline-variant/10">
      <Heart
        :size="24"
        class="mx-auto text-error mb-4 animate-pulse"
        fill="currentColor"
      />
      <p class="text-2xl font-serif italic text-on-surface-variant">
        {{ t('about.quote') }}
      </p>
    </div>
  </section>
</template>
