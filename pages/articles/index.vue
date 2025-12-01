<script setup lang="ts">
const router = useRouter()
const { unlockedIds } = usePortfolio()

const handleViewArticle = (id: number) => {
  router.push(`/articles/${id}`)
}
</script>

<template>
  <Articles @view-article="handleViewArticle" />
</template>
