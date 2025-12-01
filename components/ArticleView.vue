<script setup lang="ts">
import { ref, computed, onMounted, watch, type CSSProperties } from 'vue'
import { ArrowLeft, Calendar, Clock, Lock, Unlock, MessageSquare, Bookmark, Share2 } from 'lucide-vue-next'
import type { ContentItem } from '~/types'

// Props
interface Props {
  item: ContentItem
  isUnlocked: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  back: []
  unlock: []
}>()

// Scroll to top on mount or when item changes
onMounted(() => {
  window.scrollTo(0, 0)
})

watch(() => props.item.id, () => {
  window.scrollTo(0, 0)
})

// Custom theme CSS variables
const customStyle = computed<CSSProperties>(() => {
  if (!props.item.theme) return {}

  return {
    '--article-primary': props.item.theme.primaryColor,
    '--article-bg': props.item.theme.backgroundColor,
    '--article-border': props.item.theme.borderColor,
    fontFamily: props.item.theme.fontFamily,
  } as CSSProperties
})

// Render body based on access level
const shouldShowLockedContent = computed(() => {
  return props.item.access === 'locked' && !props.isUnlocked
})

const shouldShowUnlockedContent = computed(() => {
  return props.item.access === 'locked' && props.isUnlocked
})

// Helper component for CheckCircle icon
const CheckCircle = (size: number) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
`
</script>

<template>
  <!-- Note Layout -->
  <div
    v-if="item.type === 'note'"
    class="min-h-screen pt-24 pb-20 px-4 flex flex-col items-center justify-center animate-fade-in relative"
    :style="customStyle"
  >
    <button
      @click="emit('back')"
      class="absolute top-24 left-4 md:left-10 p-3 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface z-20 group"
    >
      <ArrowLeft :size="24" class="group-hover:-translate-x-1 transition-transform" />
    </button>

    <article class="max-w-2xl w-full bg-surface-container p-8 md:p-12 rounded-3xl shadow-2xl border border-outline-variant/20 relative overflow-hidden">
      <!-- Decorative Elements for Note -->
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-tertiary opacity-70"></div>

      <div class="flex items-center gap-3 mb-6 text-on-surface-variant/60 text-sm">
        <span class="px-2 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-medium uppercase text-xs">Note</span>
        <span>{{ item.date }}</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-bold text-on-surface mb-8 leading-tight">
        {{ item.title }}
      </h1>

      <div class="prose prose-invert prose-lg max-w-none text-on-surface-variant/90">
        <!-- Locked Content -->
        <div v-if="shouldShowLockedContent" class="relative">
          <component :is="item.body" v-if="typeof item.body !== 'string'" />
          <div v-else v-html="item.body" />
          <div class="flex justify-center mt-6">
            <button
              @click="emit('unlock')"
              class="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Unlock :size="18" />
              Decrypt Content
            </button>
          </div>
        </div>

        <!-- Unlocked Content -->
        <div v-else-if="shouldShowUnlockedContent" class="prose prose-invert prose-lg max-w-none text-on-surface-variant/90 animate-fade-in">
          <div class="p-4 bg-success/10 border border-success/30 rounded-lg text-success mb-6 flex items-center gap-3">
            <div v-html="CheckCircle(24)" />
            <span>Identity Verified. Decryption Complete.</span>
          </div>
          <h3>System Architecture: Nebula</h3>
          <p>
            The Nebula project focuses on a decentralized event bus architecture. By decoupling the producer and consumer
            services, we achieve higher fault tolerance.
          </p>
          <pre>
interface EventBus {
  publish(topic: string, message: any): void;
  subscribe(topic: string, handler: Handler): Subscription;
}</pre>
        </div>

        <!-- Normal Content -->
        <template v-else>
          <component :is="item.body" v-if="typeof item.body !== 'string'" />
          <div v-else v-html="item.body" />
        </template>
      </div>

      <div class="mt-8 pt-6 border-t border-outline-variant/10 flex flex-wrap gap-2">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-xs font-mono text-primary px-2 py-1 bg-primary/5 rounded"
        >
          #{{ tag }}
        </span>
      </div>
    </article>
  </div>

  <!-- Article & Showcase Layout -->
  <article
    v-else
    class="min-h-screen animate-fade-in bg-background"
    :style="customStyle"
  >
    <!-- TODO: Add CommentDrawer component when available -->

    <!-- Hero Header -->
    <div class="relative w-full h-[60vh] min-h-[400px]">
      <template v-if="item.image">
        <div class="absolute inset-0 bg-black/40 z-10" />
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img
          :src="item.image"
          :alt="item.title"
          :class="`absolute inset-0 w-full h-full object-cover ${item.access === 'locked' && !isUnlocked ? 'blur-md' : ''}`"
        />
      </template>
      <div v-else class="absolute inset-0 bg-gradient-to-br from-surface-container to-surface z-0" />

      <!-- Navigation & Actions -->
      <div class="absolute top-24 left-0 w-full px-6 z-20 flex justify-between max-w-7xl mx-auto left-0 right-0">
        <button
          @click="emit('back')"
          class="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all border border-white/10 group"
        >
          <ArrowLeft :size="24" class="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div class="flex gap-2">
          <!-- General Comments Button (if enabled) -->
          <button
            v-if="item.allowGeneralComments"
            class="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all border border-white/10"
            title="General Comments"
          >
            <MessageSquare :size="20" />
          </button>
          <button class="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all border border-white/10">
            <Bookmark :size="20" />
          </button>
          <button class="p-3 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all border border-white/10">
            <Share2 :size="20" />
          </button>
        </div>
      </div>

      <!-- Title Block -->
      <div class="absolute bottom-0 left-0 w-full p-6 pb-12 z-20">
        <div class="max-w-4xl mx-auto">
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-primary/80 text-on-primary shadow-lg"
              :style="item.theme ? { backgroundColor: 'var(--article-primary)', color: '#000' } : {}"
            >
              {{ tag }}
            </span>
          </div>
          <h1
            class="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
            :style="item.theme ? { color: 'var(--article-primary)' } : {}"
          >
            {{ item.title }}
          </h1>
          <div class="flex items-center gap-6 text-white/80 font-medium">
            <span class="flex items-center gap-2">
              <Calendar :size="18" /> {{ item.date }}
            </span>
            <span v-if="item.readTime" class="flex items-center gap-2">
              <Clock :size="18" /> {{ item.readTime }}
            </span>
            <span
              v-if="item.access === 'locked'"
              :class="`flex items-center gap-2 px-3 py-1 rounded-full ${isUnlocked ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`"
            >
              <Unlock v-if="isUnlocked" :size="16" />
              <Lock v-else :size="16" />
              {{ isUnlocked ? 'Unlocked' : 'Encrypted' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Body -->
    <div class="relative z-20 max-w-4xl mx-auto px-6 py-12">
      <div
        class="prose prose-invert prose-lg max-w-none text-on-surface-variant/90 prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface"
        :style="item.theme ? {
          '--tw-prose-headings': 'var(--article-primary)',
          '--tw-prose-links': 'var(--article-primary)',
        } as CSSProperties : {}"
      >
        <!-- Locked Content -->
        <div v-if="shouldShowLockedContent" class="relative">
          <component :is="item.body" v-if="typeof item.body !== 'string'" />
          <div v-else v-html="item.body" />
          <div class="flex justify-center mt-6">
            <button
              @click="emit('unlock')"
              class="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Unlock :size="18" />
              Decrypt Content
            </button>
          </div>
        </div>

        <!-- Unlocked Content -->
        <div v-else-if="shouldShowUnlockedContent" class="prose prose-invert prose-lg max-w-none text-on-surface-variant/90 animate-fade-in">
          <div class="p-4 bg-success/10 border border-success/30 rounded-lg text-success mb-6 flex items-center gap-3">
            <div v-html="CheckCircle(24)" />
            <span>Identity Verified. Decryption Complete.</span>
          </div>
          <h3>System Architecture: Nebula</h3>
          <p>
            The Nebula project focuses on a decentralized event bus architecture. By decoupling the producer and consumer
            services, we achieve higher fault tolerance.
          </p>
          <pre>
interface EventBus {
  publish(topic: string, message: any): void;
  subscribe(topic: string, handler: Handler): Subscription;
}</pre>
        </div>

        <!-- Normal Content -->
        <template v-else>
          <component :is="item.body" v-if="typeof item.body !== 'string'" />
          <div v-else v-html="item.body" />
        </template>
      </div>

      <!-- Footer / Author Block -->
      <div class="mt-20 pt-10 border-t border-outline-variant/20 flex items-center gap-4">
        <img src="https://picsum.photos/100/100" alt="Author" class="w-16 h-16 rounded-full border-2 border-primary/20" />
        <div>
          <div class="font-bold text-on-surface text-lg">XiaoMouz</div>
          <div class="text-on-surface-variant text-sm">Full Stack Developer • UI/UX Enthusiast</div>
        </div>
      </div>
    </div>
  </article>
</template>
