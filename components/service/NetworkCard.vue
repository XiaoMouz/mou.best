<template>
  <div
    class="rounded-lg border bg-outcard text-card-foreground shadow-sm flex-nowarp md:w-56 md:h-32"
  >
    <div class="p-2 px-4 flex flex-col space-y-2">
      <div class="flex flow-row items-center space-x-2">
        <h1 class="text-l text-outcard-foreground tracking-tight overflow-clip">
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
          <div class="flex flex-row items-center space-x-1">
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
                pingStatus === 'up'
                  ? 'Up'
                  : pingStatus === 'down'
                  ? 'Down'
                  : 'Pending'
              }}
            </span>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-2" v-if="pingStatus">
          <span class="text-sm text-outcard-foreground">Delay:</span>
          <span
            class="text-sm text-outcard-foreground cursor-pointer"
            @click="ping"
          >
            {{ pingTime ? pingTime + 'ms' : 'Unknown' }}
          </span>
        </div>
        <div class="flex flex-row items-center space-x-2" v-if="serviceFrom">
          <span class="text-sm text-outcard-foreground">Provider:</span>
          <span class="text-sm text-outcard-foreground">{{ serviceFrom }}</span>
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
  serviceFrom: string | undefined
}>()

const pingStatus = ref<'up' | 'down' | 'pending' | undefined>('pending')
const pingTime = ref<number | undefined>(undefined)

onMounted(async () => {
  ping()
})

async function ping() {
  pingStatus.value = 'pending'
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
