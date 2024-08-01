<template>
  <div
    class="inset-0 flex items-center justify-center"
    :class="props.layoutClass"
  >
    <div
      class="animate-spin rounded-full border-4 border-muted-foreground border-t-transparent"
      :class="props.sizeClass?.length ? props.sizeClass : 'h-5 w-5 '"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sizeClass?: string
  layoutClass?: string
}>()
</script>
