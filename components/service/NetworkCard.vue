<template>
  <div
    class="rounded-lg border bg-outcard text-card-foreground shadow-sm flex-nowarp md:w-56 h-32 md:h-32"
  >
    <div class="p-2 px-4 flex flex-col space-y-2">
      <div class="flex flow-row items-center justify-between">
        <div class="flex flow-row items-center space-x-2">
          <h1
            class="text-l text-outcard-foreground tracking-tight overflow-clip"
          >
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
          <IconChartLine
            class="fill-black dark:fill-white cursor-pointer"
            @click="showReport"
          />
        </div>
      </div>

      <div>
        <Transition name="fade">
          <div class="absolute" v-if="!showServerReport">
            <div class="flex flex-row items-center space-x-2">
              <span class="text-sm text-outcard-foreground">Address:</span>
              <span class="text-sm text-outcard-foreground">{{ address }}</span>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <span class="text-sm text-outcard-foreground">Status:</span>
              <ServiceNetStatusIndicator v-bind:status="pingStatus" />
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
            <div
              class="flex flex-row items-center space-x-2"
              v-if="serviceFrom"
            >
              <span class="text-sm text-outcard-foreground">Provider:</span>
              <span class="text-sm text-outcard-foreground">{{
                serviceFrom
              }}</span>
            </div>
          </div>
          <div v-else class="space-y-2 absolute flex flex-row md:flex-col">
            <div>
              <div class="flex flex-row items-center space-x-2">
                <span class="text-sm text-outcard-foreground">Status:</span>
                <ServiceNetStatusIndicator :status="controledStatus"/>
              </div>
            </div>
            <div>
              <LineChart
                v-if="remoteTest && remoteTest.results"
                :data="remoteTest?.results"
                index="time"
                class="w-52 h-12"
                :margin="{ top: 0, right: 0, bottom: 0, left: 0 }"
                :categories="['delay']"
                :custom-tooltip="CustomNetworkCardToolTips"
                :show-grid-line="false"
                :show-legend="false"
                :show-x-axis="false"
                :show-y-axis="false"
              />
              <div v-else class="flex justify-center items-center h-12">
                <LoadingCycle />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { CustomNetworkCardToolTips } from '#components'
import {
  type RemoteNetTestResults,
  type NetTestNode,
} from '~/types/overview/net-test-node'

const LineChart = defineAsyncComponent(() => import('../ui/chart-line/LineChart.vue'))

const props = defineProps<NetTestNode>()

const serverDelay = computed<number | undefined>(() => {
  if (!remoteTest.value) return undefined
  if (!remoteTest.value.results) return undefined
  return remoteTest.value.results[remoteTest.value.results.length - 1].delay
})

const showServerReport = ref(false)

const remoteTest = ref<RemoteNetTestResults | undefined>(undefined)

const { pingStatus, pingTime, ping } = usePing(props.address)


onMounted(async () => {
  ping()
  remoteTest.value = await fetch(`https://api.mou.best/node/record/${props.id}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => undefined)
})


function showReport() {
  showServerReport.value = !showServerReport.value
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
