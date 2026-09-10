<script setup lang="ts">
defineProps<{
  href: string
  label: string
}>()
</script>
<template>
  <a
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-on-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-[antiquewhite] hover:text-accent-foreground h-10 w-10"
    :href="href"
  >
    <slot />
    <span class="sr-only">{{ label }}</span>
  </a>
</template>
