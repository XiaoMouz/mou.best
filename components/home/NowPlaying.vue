<script setup lang="ts">
import { NowPlayState } from '~/types/nowplay-state'

const status = ref<NowPlayState>(NowPlayState.PENDING)
const closed = ref(false)
onMounted(() => {
  setTimeout(() => {
    status.value = NowPlayState.ERROR
  }, 3000)
})
</script>
<template>
  <HomeCard class="backdrop-blur-sm w-full flex flex-col" v-if="!closed">
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl font-bold">Now Playing</h1>

      <div
        @click="closed = true"
        class="p-1 cursor-pointer rounded-lg border-2 border-gray-500 dark:border-gray-200 hover:dark:bg-[#ffffff30] hover:bg-[#00000030]"
      >
        <IconClose class=" fill- dark:fill-slate-200" />
      </div>
    </div>
    <section
      v-if="status === NowPlayState.PENDING"
      class="w-full"
      :class="status === NowPlayState.PENDING ? 'animate-pulse' : ''"
    >
      <div class="animate-pulse flex space-x-4 w-full">
        <div class="rounded-full bg-slate-700 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-700 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div class="h-2 w-full bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </section>
    <section v-else-if="status === NowPlayState.ERROR">
      <p class="text-lg font-bold">❌ Failed to fetch now playing data</p>
    </section>
  </HomeCard>
</template>
