d
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useMediaQuery, useParallax } from '@vueuse/core'

definePageMeta({
  auth: false,
})

const snippets = [
  'A Gamer',
  'A Backend Developer',
  'A Frontend Developer',
  'An Android Developer',
]

const post = reactive({
  cid: 1,
  slug: '1',
  title: 'Hello World',
  views: 100,
  stars: 10,
  commentsNum: 5,
  headImage: 'https://mou.best/images/banner.jpg',
})
</script>

<template>
  <div class="relative dark:bg-black-shadow w-full h-full">
    <div class="bg-inner"></div>
    <div class="w-full h-full">
      <div
        class="md:items-center w-full h-full md:flex md:p-40 md:justify-between md:space-x-10"
      >
        <HomeCard class="flex">
          <div>
            <img
              class="w-40 h-40 rounded-full"
              src="https://avatars.githubusercontent.com/u/54032212?v=4"
            />
          </div>
          <div class="ml-8 flex flex-col space-y-5">
            <h1 class="text-4xl font-bold">Hej! 👋</h1>
            <p class="text-2xl font-bold md:mr-10">I'm XiaoMouz</p>
            <p class="text-lg">
              <HomeTypeWrite :snippets="snippets" />
            </p>
          </div>
        </HomeCard>
        <div class="flex flex-col space-y-8 justify-center mt-10 md:mt-0">
          <HomeCard class="rounded-2xl flex-col">
            <h1 class="text-2xl font-bold">You might want know</h1>
            <p>
              <HomeButtonList />
            </p>
          </HomeCard>
          <HomeCard class="rounded-2xl flex-col"
            ><h1 class="text-2xl font-bold">Latest update</h1>
            <PostCard v-bind="post"></PostCard>
          </HomeCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(https://mou.best/images/banner.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
</style>
