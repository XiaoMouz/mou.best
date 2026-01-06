<template>
  <section
    class="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 z-10 animate-fade-in"
  >
    <!-- Main Heading Group -->
    <div class="space-y-8 max-w-4xl mx-auto">
      <!-- <button
        @click="router.push('/resume')"
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
      </button> -->

      <h1
        class="text-6xl md:text-8xl font-bold tracking-tight text-on-background"
      >
        Hi, I'm
        <span
          class="text-primary underline decoration-primary/30 decoration-4 underline-offset-4"
        >
          XiaoMouz
        </span>
      </h1>

      <div
        class="text-2xl md:text-3xl font-normal text-on-surface-variant h-12 flex items-center justify-center gap-2"
      >
        <!-- <span class="hidden md:inline">{{ t('hero.building') }}</span> -->
        <Typewriter
          :words="[
            'A Developer',
            'Heavy gaming addiction',
            'Hopeless',
            'Human',
          ]"
        />
      </div>

      <!-- Social Icons -->
      <div class="flex items-center justify-center gap-4 mt-12">
        <HeroSoicalButton href="https://github.com/XiaoMouz" label="GitHub">
          <IconGithub class="fill-foreground size-5" />
        </HeroSoicalButton>
        <HeroSoicalButton
          href="https://space.bilibili.com/64110204"
          label="Bilibili"
        >
          <IconBilibili class="fill-foreground size-5" />
        </HeroSoicalButton>
        <HeroSoicalButton href="https://x.com/XiaoMouz" label="Twitter">
          <IconTwitter class="fill-foreground size-5" />
        </HeroSoicalButton>
        <HeroSoicalButton href="https://t.me/XiaoMouz" label="Telegram">
          <IconTelegram class="fill-foreground size-5" />
        </HeroSoicalButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import Typewriter from './Typewriter.vue'

const router = useRouter()
const { t } = useLanguage()
</script>
