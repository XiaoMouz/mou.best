<script setup lang="ts">
const props = defineProps<{
  title: string
  excerpt?: string
  publishDate: string
  readTime?: string
  imageUrl: string
  imageAlt: string
  category?: string
  href?: string
}>()
</script>

<template>
  <NuxtLink
    :href="href"
    class="rounded-lg bg-card hover:border-primary/50 duration-300 border border-transparent text-card-foreground overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
  >
    <div class="relative overflow-hidden">
      <NuxtImg
        :alt="imageAlt"
        loading="lazy"
        width="400"
        height="240"
        decoding="async"
        class="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        :src="imageUrl"
        style="color: transparent"
        v-slot="{ src, isLoaded, imgAttrs }"
      >
        <img v-if="isLoaded" :src="src" :alt="imageAlt" v-bind="imgAttrs" />
        <div
          v-else
          class="w-full h-48 sm:h-56 object-cover transition-transform duration-300 animate-pulse bg-black/15 dark:bg-white/15 group-hover:scale-105"
        ></div>
      </NuxtImg>

      <div class="absolute top-4 left-4">
        <div
          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-white/90 text-gray-800 hover:bg-white"
        >
          {{ category }}
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-1.5 p-6 pb-2">
      <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div class="flex items-center gap-1">
          <Icon name="mdi:calendar-outline" size-4 />
          <span>{{ publishDate }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mdi:clock-outline" size-4 />
          <span>{{ readTime }}</span>
        </div>
      </div>
      <h3
        class="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2"
      >
        <a :href="href" class="hover:underline">{{ title }}</a>
      </h3>
    </div>
    <div class="p-6 pt-0">
      <p class="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
        {{ excerpt }}
      </p>
      <a
        :href="href"
        class="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
      >
        Read more
        <Icon name="mdi:arrow-right" size-4 />
      </a>
    </div>
  </NuxtLink>
</template>
