<script setup lang="ts">
const snippets = [
  'A Gamer',
  'A Backend Developer',
  'A Frontend Developer',
  'An Android Developer',
]
</script>

<template>
  <div class="relative bg-[#aeaeae1a] dark:bg-black-shadow w-full h-full">
    <div class="bg-inner"></div>
    <div class="mx-auto flex flex-col items-center justify-center h-screen px-4">
      <Me />
    </div>
  </div>
</template>

<style scoped>
.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(/images/banner.png) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
</style>
