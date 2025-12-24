<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.id as string)

const { getUnlockedArticle } = useEncryptedArticles()

// Try to fetch from Nuxt Content first
const { data: contentArticle } = await useAsyncData(
  `article-${slug.value}`,
  async () => {
    try {
      return await queryCollection('articles')
        .path(`/articles/${slug.value}`)
        .first()
    } catch (error) {
      console.error('Error fetching article:', error)
      return {}
    }
  }
)

// If not found in content, check if it's an encrypted article
const isEncryptedArticle = ref(false)
const article = ref<any>(null)

if (!contentArticle.value) {
  // Check if unlocked in localStorage
  const unlockedData = getUnlockedArticle(slug.value)

  if (unlockedData) {
    isEncryptedArticle.value = true
    article.value = unlockedData
  } else {
    // Check if the article exists in encrypted articles
    const { data: encryptedList } = await useFetch('/api/articles/encrypted')
    const encryptedArticle = encryptedList.value?.articles?.find(
      (a: any) => a.slug === slug.value
    )

    if (encryptedArticle) {
      isEncryptedArticle.value = true
    } else {
      // Article not found anywhere, redirect to articles list
      router.push('/articles')
    }
  }
} else {
  article.value = contentArticle.value
}

const handleBack = () => {
  router.push('/articles')
}

const handleUnlocked = () => {
  // Reload the unlocked article
  const unlockedData = getUnlockedArticle(slug.value)
  if (unlockedData) {
    article.value = unlockedData
  }
}

// Compute theme styles
const themeStyles = computed(() => {
  if (!article.value?.theme) return {}

  const theme = article.value.theme
  const fontSizeMap = {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  }

  const fontFamilyMap = {
    sans: 'ui-sans-serif, system-ui, sans-serif',
    serif: 'ui-serif, Georgia, serif',
    mono: 'ui-monospace, monospace',
    custom: theme.customFontFamily || 'inherit',
  }

  const fontWeightMap = {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }

  const lineHeightMap = {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  }

  return {
    '--article-primary-color': theme.primaryColor || 'inherit',
    '--article-bg-color': theme.backgroundColor || 'inherit',
    '--article-text-color': theme.textColor || 'inherit',
    fontSize: theme.fontSize ? fontSizeMap[theme.fontSize] : undefined,
    fontFamily: theme.fontFamily ? fontFamilyMap[theme.fontFamily] : undefined,
    fontWeight: theme.fontWeight ? fontWeightMap[theme.fontWeight] : undefined,
    lineHeight: theme.lineHeight ? lineHeightMap[theme.lineHeight] : undefined,
  }
})

console.log('🚀 ~ article:', article.value)
</script>

<template>
  <div class="article-detail-page">
    <ClientOnly>
      <!-- Password unlock screen for encrypted articles -->
      <PasswordUnlock
        v-if="isEncryptedArticle && !article"
        :slug="slug"
        :title="slug"
        @unlocked="handleUnlocked"
      />

      <!-- Article content for unlocked or public articles -->
      <div v-else-if="article" class="max-w-4xl mx-auto px-4 py-12">
        <!-- Header Image -->
        <div
          v-if="article.image"
          class="article-header-image mb-8 -mx-4 md:mx-0 rounded-xl overflow-hidden"
        >
          <img
            :src="article.image"
            :alt="article.imageAlt || article.title"
            class="w-full h-64 md:h-96 object-cover"
          >
        </div>

        <button
          class="mb-8 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
          @click="handleBack"
        >
          ← Back to Articles
        </button>

        <article
          class="prose prose-lg dark:prose-invert max-w-none article-themed"
          :style="themeStyles"
        >
          <h1 class="text-4xl font-bold text-on-background mb-4">
            {{ article.title }}
          </h1>

          <div
            class="flex items-center gap-4 text-sm text-on-surface-variant mb-8"
          >
            <span v-if="article.date">{{ article.date }}</span>
            <span v-if="article.readTime">{{ article.readTime }}</span>
          </div>

          <div
            v-if="article.tags && article.tags.length > 0"
            class="flex gap-2 mb-8"
          >
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs"
            >
              {{ tag }}
            </span>
          </div>

          <!-- For Nuxt Content articles -->
          <ContentRenderer
            v-if="contentArticle"
            :value="contentArticle"
            class="article-content"
          />

          <!-- For encrypted articles (markdown string) -->
          <div
            v-else-if="isEncryptedArticle && article.content"
            class="article-content"
          >
            <MDC class="article-content" :value="article.content" />
          </div>
        </article>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  padding-top: 4rem;
}

.prose {
  color: var(--color-text);
}

/* Theme-aware styling */
.article-themed {
  color: var(--article-text-color, var(--color-text));
  background-color: var(--article-bg-color, transparent);
}

.article-themed :deep(h1),
.article-themed :deep(h2),
.article-themed :deep(h3) {
  color: var(--article-primary-color, var(--color-text));
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  color: var(--color-text);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.article-content :deep(code) {
  background: var(--color-surface);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  background: var(--color-surface);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.article-content :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
}

.article-header-image {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
</style>
