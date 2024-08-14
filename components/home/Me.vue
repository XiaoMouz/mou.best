<script setup lang="ts">
const snippets = [
  'A Gamer',
  'A Backend Developer',
  'A Frontend Developer',
  'An Android Developer',
]
</script>
<template>
  <div class="flex flex-col space-y-6">
    <div class="flex flex-col space-y-4 md:flex-row">
      <div>
        <img
          class="min-w-40 h-40 rounded-full"
          src="https://avatars.githubusercontent.com/u/54032212?v=4"
        />
      </div>
      <div class="md:ml-8 flex flex-col justify-start space-y-5 xl:min-w-48">
        <h1 class="text-4xl font-bold">Hej! 👋</h1>
        <p class="text-2xl font-bold md:mr-10">I'm XiaoMouz</p>
        <p class="text-lg">
          <HomeTypeWrite :snippets="snippets" />
        </p>
      </div>
    </div>
    <HomeButtonList />
  </div>
</template>
