<template>
    <div class="flex flex-row items-center space-x-1">
      <div
        class="text-outcard-foreground w-2 h-2 rounded-full"
        :class="{
          'bg-green-500': status === 'online',
          'bg-red-500': status === 'offline',
          'bg-yellow-500': status === 'maintenance',
          'bg-gray-500': status === 'expired' || status === 'error' || status === undefined,
        }"
      ></div>
      <span class="text-sm text-outcard-foreground">
        {{ statusText }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    status: 'online' | 'offline' | 'maintenance' | 'expired' | 'error' | undefined
  }>()
  
  const statusText = computed(() => {
    switch (props.status) {
      case 'online':
        return 'Online'
      case 'offline':
        return 'Offline'
      case 'maintenance':
        return 'Maintenance'
      case 'expired':
        return 'Expired'
      case 'error':
        return 'Error'
      case undefined:
      default:
        return '未知'
    }
  })
  </script>
  