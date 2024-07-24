<template>
  <nuxt-link :to="`/post/${slug || cid}`">
    <div
      class="article-card"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div
        class="header-image"
        :style="{ backgroundImage: 'url(' + headImage + ')' }"
      >
        <div class="overlay" :class="{ 'overlay-hover': hover }"></div>
        <h2 class="title" :class="{ 'title-hover': hover }">{{ title }}</h2>
        <div class="stats" :class="{ 'stats-hover': hover }">
          <span class="likes">{{ stars }} Likes</span>
          <span class="views">{{ views }} Views</span>
          <span class="comments">{{ commentsNum }} Comments</span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  cid: number
  slug: string | null
  title: string
  headImage?: string
  views: number
  stars: number
  commentsNum: number
}>()

const hover = ref(false)
</script>

<style scoped>
.article-card {
  width: 300px;
  height: 200px;
  margin: 20px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}

.header-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.overlay-hover {
  background: rgba(0, 0, 0, 0.5);
}

.title {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  transition: top 0.3s ease;
  z-index: 1;
}

.title-hover {
  top: 10px;
  transform: translateY(0);
}

.stats {
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  transition: bottom 0.3s ease;
  z-index: 1;
}

.stats-hover {
  bottom: 10px;
}

.likes,
.views,
.comments {
  display: inline-block;
  margin: 0 10px;
}
</style>
