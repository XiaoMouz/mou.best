<template>
  <div class="absolute top-4 left-[50%] z-10 translate-x-[-50%]" v-if="info">
    <div
      class="animate-slide-in-from-top flex flex-row space-x-4 bg-[#00000070] py-3 px-6 rounded-full items-center backdrop-blur-[2px] hover:backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-150! shadow-gray-400 hover:shadow-gray-400 dark:shadow-zinc-700"
    >
      <div>
        <Avatar>
          <AvatarImage v-if="info.avatarLink" :src="info.avatarLink" />
          <AvatarFallback>{{ info.name?.charAt(0) }}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 class="font-bold">Welcome back</h1>
        <span class="text-sm">{{ info.name }}</span>
      </div>
      <div>
        <nuxt-link to="/service">
          <Button class="p-2 rounded-2xl">
            <IconControl class="fill-slate-200 dark:fill-slate-800" />
          </Button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const info = await useProfile()
</script>
