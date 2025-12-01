<script setup lang="ts">
import { computed } from 'vue'
import { MessageSquarePlus } from 'lucide-vue-next'
import { useArticle } from '~/composables/useArticle'
import { useLanguage } from '~/composables/useLanguage'

const props = withDefaults(defineProps<{
  id: string
  articleId: number
  className?: string
}>(), {
  className: ''
})

const { config, openSection, activeSection } = useArticle()
const { t } = useLanguage()

const isActive = computed(() => activeSection.value === props.id)

const handleClick = (e: Event) => {
  e.stopPropagation()
  openSection(props.id, props.articleId)
}
</script>

<template>
  <div
    v-if="!config.allowSectionComments"
    :class="className"
  >
    <slot />
  </div>

  <div
    v-else
    :class="[
      'relative group/comment-block rounded-lg transition-colors duration-300 -mx-2 px-2',
      isActive ? 'bg-primary/5' : 'hover:bg-surface-container-high/50',
      className
    ]"
  >
    <slot />

    <!-- Trigger Button (Desktop: visible on hover, Mobile: visible on tap) -->
    <button
      @click="handleClick"
      :class="[
        'absolute right-0 top-0 translate-x-full ml-2 p-2 rounded-full bg-surface-container shadow-md border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:scale-110 transition-all z-10',
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 group-hover/comment-block:opacity-100 group-hover/comment-block:scale-100 pointer-events-none group-hover/comment-block:pointer-events-auto'
      ]"
      :title="t('comments.viewSection')"
      :aria-label="t('comments.viewSection')"
    >
      <MessageSquarePlus :size="16" />
    </button>
  </div>
</template>
