<template>
  <div
    class="flex flex-row space-x-4 bg-black-shadow py-3 px-6 rounded-full items-center backdrop-blur-[2px] hover:backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-150! shadow-gray-400 hover:shadow-gray-400 dark:shadow-zinc-700"
  >
    <div>
      <Avatar>
        <AvatarImage v-if="avatarLink" :src="avatarLink" />
        <AvatarFallback>{{ name?.charAt(0) }}</AvatarFallback>
      </Avatar>
    </div>
    <div>
      <h1 class="font-bold">Welcome back</h1>
      <span class="text-sm">{{ name }}</span>
    </div>
    <div>
      <nuxt-link to="/service">
        <Button class="p-2 rounded-2xl">
          <IconControl class="fill-slate-200 dark:fill-slate-800" />
        </Button>
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: String,
  avatarLink: String,
})
</script>
