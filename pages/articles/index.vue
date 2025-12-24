<script setup lang="ts">
const router = useRouter()

// Fetch Nuxt Content articles
const { data: contentArticles } = await useAsyncData('content-articles', async () => {
  try {
    return await queryCollection('articles').order('date', 'DESC').all()
  } catch (error) {
    console.error('Error fetching content articles:', error)
    return []
  }
})

// Fetch encrypted articles
const { data: encryptedArticlesData } = await useFetch('/api/articles/encrypted')

// Merge articles
const allArticles = computed(() => {
  const articles: any[] = []

  // Add content articles
  if (contentArticles.value) {
    articles.push(
      ...contentArticles.value.map((article: any) => ({
        slug: article.path?.replace('/articles/', '') || '',
        title: article.title,
        excerpt: article.excerpt || article.description,
        date: article.date,
        readTime: article.readTime,
        tags: article.tags || [],
        image: article.image,
        imageAlt: article.imageAlt,
        theme: article.theme,
        isEncrypted: false,
      }))
    )
  }

  // Add encrypted articles
  if (encryptedArticlesData.value?.success && encryptedArticlesData.value.articles) {
    articles.push(...encryptedArticlesData.value.articles)
  }

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime()
    const dateB = new Date(b.date || 0).getTime()
    return dateB - dateA
  })
})

const handleViewArticle = (slug: string) => {
  router.push(`/articles/${slug}`)
}
</script>

<template>
  <Articles :articles="allArticles" @view-article="handleViewArticle" />
</template>
