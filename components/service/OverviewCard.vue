<script setup lang="ts">
defineProps<{
  title: String
  description: String
}>()
</script>
<template>
  <div class="space-y-4">
    <h1 class="text-xl font-bold tracking-tight">{{ title }}</h1>
    <span class="text-sm text-gray-500">{{ description }}</span>
    <div>
      <slot />
    </div>
  </div>
</template>
