<template>
  <section
    class="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 z-10 animate-fade-in"
  >
    <!-- Main Heading Group -->
    <div class="space-y-8 max-w-4xl mx-auto">
      <button
        @click="$emit('navigate', 'resume')"
        class="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/30 text-secondary text-sm font-medium mb-4 hover:bg-surface-container-high hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-pointer"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
          ></span>
        </span>
        {{ t('hero.available') }}
        <ArrowRight
          :size="14"
          class="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all"
        />
      </button>

      <h1
        class="text-6xl md:text-8xl font-bold tracking-tight text-on-background"
      >
        Hi, I'm{' '}
        <span
          class="text-primary underline decoration-primary/30 decoration-4 underline-offset-4"
        >
          XiaoMouz
        </span>
      </h1>

      <div
        class="text-2xl md:text-3xl font-normal text-on-surface-variant h-12 flex items-center justify-center gap-2"
      >
        <span class="hidden md:inline">{{ t('hero.building') }}</span>
        <Typewriter
          :words="[
            'Web Experiences',
            'Mobile Applications',
            'Open Source Tools',
            'Digital Solutions',
          ]"
          :typing-speed="80"
          :deleting-speed="40"
          :delay-between-words="2000"
        />
      </div>

      <!-- Social Icons -->
      <div class="flex items-center justify-center gap-4 mt-12">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="p-4 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant transition-all duration-300 group relative"
          aria-label="GitHub"
        >
          <Github :size="24" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          class="p-4 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant transition-all duration-300 group relative"
          aria-label="Discord"
        >
          <Bot :size="24" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="p-4 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant transition-all duration-300 group relative"
          aria-label="X (Twitter)"
        >
          <Twitter :size="24" />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          class="p-4 rounded-full bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant transition-all duration-300 group relative"
          aria-label="Telegram"
        >
          <Send :size="24" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Github, Twitter, Send, Bot, ArrowRight } from 'lucide-vue-next'
import Typewriter from './Typewriter.vue'

interface Props {
  onNavigate?: (view: string) => void
}

defineProps<Props>()

defineEmits<{
  navigate: [view: string]
}>()

const { t } = useLanguage()
</script>
