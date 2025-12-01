<script setup lang="ts">
import { contentData } from '~/data/content'

const route = useRoute()
const router = useRouter()
const { unlockedIds, unlockArticle } = usePortfolio()

const articleId = computed(() => Number(route.params.id))
const article = computed(() => contentData.find(c => c.id === articleId.value))
const isUnlocked = computed(() => unlockedIds.value.includes(articleId.value))

const handleBack = () => {
  router.push('/articles')
}

const handleUnlock = () => {
  unlockArticle(articleId.value)
}

// If article not found, redirect to articles
if (!article.value) {
  router.push('/articles')
}
</script>

<template>
  <ArticleView
    v-if="article"
    :item="article"
    :is-unlocked="isUnlocked"
    @back="handleBack"
    @unlock="handleUnlock"
  />
</template>
