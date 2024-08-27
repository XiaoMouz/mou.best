<script setup lang="ts">
const menu = useHomeMeta()
const profile = await useProfile()
</script>
<template>
  <div
    class="absolute top-[80%] right-[20%] md:top-[40%] z-10 md:right-[10%] flex flex-row md:flex-col items-center justify-center"
  >
    <div
      class="space-x-4 md:space-x-0 md:space-y-4 flex items-center justify-center md:flex-col bg-[#99999970] dark:bg-[#00000070] p-3 rounded-3xl"
    >
      <HomeMenuItem v-for="item in menu" v-bind:item="item" />
    </div>

    <div
      class="ml-4 md:ml-0 md:mt-4 bg-[#99999970] dark:bg-[#00000070] p-2 rounded-full"
    >
      <div
        class="flex py-1 w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
      >
        <nuxt-link to="/service">
          <img class="w-8 h-8 rounded-full" :src="profile.avatarLink" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
