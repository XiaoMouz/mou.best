<script setup lang="ts">
const menu = useHomeMeta().homeMeta
const { profile } = await useProfile()
</script>
<template>
  <div
    class="absolute top-[30%] z-10 right-[10%] flex flex-col items-center justify-center"
  >
    <div
      class="space-y-4 flex items-center justify-center flex-col bg-[#99999970] dark:bg-[#00000070] p-3 rounded-3xl"
    >
      <HomeMenuItem v-for="item in menu" v-bind:item="item" />
    </div>

    <div class="mt-4 bg-[#99999970] dark:bg-[#00000070] p-2 rounded-full">
      <div
        class="flex py-1 w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
      >
        <nuxt-link to="/service">
          <img
            v-if="profile.avatarLink"
            class="w-8 h-8 rounded-full"
            :src="profile.avatarLink"
          />
          <IconExit
            v-else-if="profile && !profile.avatarLink"
            class="w-6 h-6 rounded-full fill-black dark:fill-white"
          />
          <IconExit
            v-else
            class="w-6 h-6 rounded-full fill-black dark:fill-white"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
