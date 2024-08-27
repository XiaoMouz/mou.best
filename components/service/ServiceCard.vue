<template>
  <div
    class="rounded-lg border border-gray-300 dark:border-gray-800 bg-outcard text-card-foreground shadow-sm flex-nowarp md:w-60 md:h-34"
  >
  <div class="card-bg-inner">

  </div>
    <div class="p-2 px-4 flex flex-col space-y-2">
      <div class="flex flow-row items-center justify-between">
        <div class="flex flow-row items-center space-x-2">
          <h1
            class="text-l text-outcard-foreground tracking-tight overflow-clip"
          >
            {{ name }}
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
      </div>

      <div>
        <div class="flex flex-col space-y-1">
          <div class="flex flex-row items-center space-x-2">
            <span class="text-sm text-outcard-foreground">Address:</span>
            <a :href="linkTo" target="_blank" class="text-sm text-outcard-foreground hover:underline">{{ address }}</a>
          </div>
          <div class="flex flex-row items-center space-x-2">
            <span class="text-sm text-outcard-foreground">Status:</span>
            <ServiceNetServiceIndicator :status="status" />
          </div>
          <div class="flex flex-row items-center space-x-2" v-if="provide">
            <span class="text-sm text-outcard-foreground">Deployed on:</span>
            <span class="text-sm text-outcard-foreground">{{ provide }}</span>
          </div>
          <div class="flex flex-row items-center space-x-2">
            <span class="text-sm text-outcard-foreground">Due Date:</span>
            <span v-if="props.dueTimestamp" class="text-sm text-outcard-foreground">{{ new Date(props.dueTimestamp * 1000).toLocaleString() }}</span>
            <span v-else class="text-sm text-outcard-foreground">N/A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { NetService } from '~/types/overview/service-info';

const props = defineProps<NetService>()
</script>


<style scoped>
.card-bg-inner{
  position: absolute;
  background: url(https://mou.best/images/banner.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
</style>