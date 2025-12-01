<template>
  <section class="relative z-10 py-20 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-on-background mb-4">
        {{ t('nav.articles') }}
      </h2>
      <p class="text-lg text-on-surface-variant">
        Thoughts, tutorials, and insights
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="article in contentData"
        :key="article.id"
        class="bg-surface-container rounded-2xl p-6 border border-outline-variant/20 hover:border-primary/50 transition-all cursor-pointer group"
        @click="$emit('view-article', article.id)"
      >
        <div class="flex items-start justify-between mb-4">
          <span class="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs">
            {{ article.category }}
          </span>
          <Lock v-if="article.isLocked" :size="16" class="text-outline" />
        </div>

        <h3 class="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
          {{ article.title }}
        </h3>

        <p class="text-on-surface-variant text-sm mb-4 line-clamp-2">
          {{ article.excerpt }}
        </p>

        <div class="flex items-center justify-between text-xs text-outline">
          <span>{{ article.date }}</span>
          <span>{{ article.readTime }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Lock } from 'lucide-vue-next'
import { contentData } from '~/data/content'

defineEmits<{
  'view-article': [id: number]
}>()

const { t } = useLanguage()
</script>
