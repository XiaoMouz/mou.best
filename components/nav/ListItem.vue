<script setup lang="ts">
import { cn } from '@/utils/shadcn'

const $route = useRoute()

defineProps<{ title?: string; href?: string }>()
</script>

<template>
  <li>
    <div as-child>
      <a
        @click="() => $router.push(href ?? '/')"
        :class="
          cn(
            'block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            $route.path === href && ' bg-muted hover:bg-muted',
            $attrs.class ?? ''
          )
        "
      >
        <div class="text-sm font-medium leading-none">{{ title }}</div>
        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
          <slot />
        </p>
      </a>
    </div>
  </li>
</template>
