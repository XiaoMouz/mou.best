<script setup lang="ts">
const menu = useHomeMeta()
const profile = useProfile()
</script>
<template>
  <div class="absolute md:top-[50%] z-10 md:right-[10%]">
    <div
      class="md:space-y-4 bg-[#99999970] dark:bg-[#00000070] p-3 rounded-3xl"
    >
      <HomeMenuItem v-for="item in menu" v-bind:item="item" />
    </div>

    <div
      class="mt-4 md:space-y-4 bg-[#99999970] dark:bg-[#00000070] p-2 rounded-full"
    >
      <div
        class="p-3 rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-600 fill-gray-900 dark:fill-slate-100 ease-in-out"
      >
        <IconExit />
      </div>
    </div>
  </div>
</template>
