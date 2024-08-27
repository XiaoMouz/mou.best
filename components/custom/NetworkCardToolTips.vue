<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '#components'

const props = defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
const date = ref()
const delay = props.data.find((d) => d.name === 'delay')?.value
const status = props.data[2].value

// title is timestamp, title to date
if (props.title) date.value = new Date(+props.title).toLocaleString()
</script>

<template>
  <div class="bg-black p-3 border rounded-lg absolute sm:-ml-10 md:ml-10 w-40">
    <span class="text-l font-bold">Delay : {{ delay }} ms</span>
    <div class="flex flex-row items-center space-x-1">
      <span>Status:</span>
      <div
        class="text-outcard-foreground w-2 h-2 rounded-full"
        :class="{
          'bg-green-500': status === 'up',
          'bg-red-500': status === 'down',
          'bg-yellow-500': status === 'unknown' || !status,
        }"
      ></div>
      <span class="text-sm text-outcard-foreground">
        {{
          status === 'up' ? 'Up' : status === 'down' ? 'Down' : 'Maintainance'
        }}
      </span>
    </div>
    <div>
      <span>Date : {{ date }}</span>
    </div>
  </div>
</template>
