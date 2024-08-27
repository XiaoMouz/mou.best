<script setup lang="ts">
import { cn } from '@/utils/shadcn'

interface Item {
  title: string
  href: string
}

const $route = useRoute()

const props = defineProps<{
  itemList: Item[]
}>()
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in props.itemList"
      :key="item.title"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          $route.path === `${item.href}` && 'bg-muted hover:bg-muted'
        )
      "
      @click="() => $router.push(item.href)"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
