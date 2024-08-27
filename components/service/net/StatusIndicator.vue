<template>
  <div class="flex flex-row items-center space-x-1">
    <div
      class="text-outcard-foreground w-2 h-2 rounded-full"
      :class="{
        'bg-green-500': status === 'up',
        'bg-red-500': status === 'down',
        'bg-yellow-500': status === 'pending' || status === 'unknown',
      }"
    ></div>
    <span class="text-sm text-outcard-foreground">
      {{ statusText }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: 'up' | 'down' | 'pending' | 'unknown' | 'maintenance'
}>()

const statusText = computed(() => {
  switch (props.status) {
    case 'up':
      return 'Up'
    case 'down':
      return 'Down'
    case 'pending':
      return 'Pending'
    case 'maintenance':
    case 'unknown':
    default:
      return 'Maintenance'
  }
})
</script>
