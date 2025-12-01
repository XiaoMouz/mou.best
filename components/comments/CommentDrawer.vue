<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Send, MessageSquare } from 'lucide-vue-next'
import { useArticle } from '~/composables/useArticle'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps<{
  articleId: number
}>()

const { isDrawerOpen, activeSection, comments, closeComments, addComment, config } = useArticle()
const { t } = useLanguage()

const inputValue = ref('')

const isGeneral = computed(() => activeSection.value === null)

const shouldShow = computed(() => {
  if (!isDrawerOpen.value) return false
  // If section comments are disabled globally and this is a section, don't show
  if (!isGeneral.value && !config.value.allowSectionComments) return false
  // If general comments disabled and this is general, don't show
  if (isGeneral.value && !config.value.allowGeneralComments) return false
  return true
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!inputValue.value.trim()) return
  addComment(inputValue.value, props.articleId, activeSection.value)
  inputValue.value = ''
}
</script>

<template>
  <Teleport to="body">
    <template v-if="shouldShow">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        @click="closeComments"
      />

      <!-- Drawer -->
      <div class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface-container border-l border-outline-variant/20 shadow-2xl z-50 animate-[slideUp_0.3s_ease-out_horizontal] flex flex-col">

        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-outline-variant/10">
          <h3 class="text-lg font-bold text-on-surface flex items-center gap-2">
            <MessageSquare :size="18" class="text-primary" />
            {{ isGeneral ? t('comments.general') : t('comments.section') }}
          </h3>
          <button
            @click="closeComments"
            class="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Comment List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div
            v-if="comments.length === 0"
            class="h-full flex flex-col items-center justify-center text-on-surface-variant/50 text-center p-8"
          >
            <MessageSquare :size="48" class="mb-4 opacity-20" />
            <p>{{ t('comments.noComments') }}</p>
          </div>

          <div
            v-else
            v-for="comment in comments"
            :key="comment.id"
            class="group animate-fade-in"
          >
            <div class="flex gap-3">
              <div class="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high shrink-0">
                <img :src="comment.avatar" :alt="comment.author" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 space-y-1">
                <div class="flex items-baseline justify-between">
                  <span class="font-bold text-sm text-on-surface">{{ comment.author }}</span>
                  <span class="text-xs text-on-surface-variant/60">{{ comment.timestamp }}</span>
                </div>
                <p class="text-sm text-on-surface-variant leading-relaxed">
                  {{ comment.content }}
                </p>
                <button class="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                  {{ t('comments.reply') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 border-t border-outline-variant/10 bg-surface">
          <form @submit="handleSubmit" class="relative">
            <textarea
              v-model="inputValue"
              :placeholder="t('comments.placeholder')"
              class="w-full bg-surface-container-high rounded-xl p-3 pr-12 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
            />
            <button
              type="submit"
              :disabled="!inputValue.trim()"
              class="absolute bottom-3 right-3 p-2 rounded-lg bg-primary text-on-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
            >
              <Send :size="16" />
            </button>
          </form>
        </div>

      </div>
    </template>
  </Teleport>
</template>
