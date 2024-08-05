<script setup lang="ts">
import { cn } from '@/utils/shadcn'
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
      href="/service/"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconOverview /> <span>Overview</span>
      </div>
    </a>
    <a
      href="/service/proxy"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconWeb /> <span>Proxy</span>
      </div>
    </a>
    <a
      href="/service/link"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconLink /> <span>Friend Link</span>
      </div>
    </a>
    <a
      href="/service/manage"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconConnect /> <span>Manager</span>
      </div>
    </a>
  </nav>
</template>
