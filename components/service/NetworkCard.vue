<template>
  <div class="rounded-lg border bg-outcard text-card-foreground shadow-sm">
    <div class="p-2 px-4 flex flex-col space-y-2">
      <div class="flex flow-row items-center space-x-2">
        <h1 class="text-l text-outcard-foreground tracking-tight">
          {{ title }}
        </h1>
        <HoverCard v-if="description">
          <HoverCardTrigger>
            <IconInfo class="fill-black dark:fill-white" />
          </HoverCardTrigger>
          <HoverCardContent>
            <p class="text-sm text-outcard-foreground">
              {{ description }}
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div>
        <div class="flex flex-row items-center space-x-2">
          <span class="text-sm text-outcard-foreground">Address:</span>
          <span class="text-sm text-outcard-foreground">{{ address }}</span>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <span class="text-sm text-outcard-foreground">Status:</span>
          <div
            @click="ping"
            class="flex flex-row items-center space-x-1 cursor-pointer"
          >
            <div
              class="text-outcard-foreground w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': pingStatus === 'up',
                'bg-red-500': pingStatus === 'down',
                'bg-yellow-500': pingStatus === 'pending',
              }"
            ></div>
            <span class="text-sm text-outcard-foreground">
              {{
                pingTime
                  ? pingTime + 'ms'
                  : pingStatus
                  ? {
                      up: 'Up',
                      down: 'Down',
                      pending: 'Pending',
                    }[pingStatus]
                  : 'Unknown'
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  description: string | undefined
  address: string
  serverSideStatus: 'up' | 'down' | 'unknown' | undefined
}>()

const pingStatus = ref<'up' | 'down' | 'pending' | undefined>('pending')
const pingTime = ref<number | undefined>(undefined)

onMounted(async () => {
  ping()
})

async function ping() {
  const start = new Date().getTime()
  fetch(`https://${props.address}`)
    .then(() => {
      const end = new Date().getTime()
      pingStatus.value = 'up'
      pingTime.value = end - start
    })
    .catch(() => {
      pingStatus.value = 'down'
      pingTime.value = undefined
    })
}
</script>
