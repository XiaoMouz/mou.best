<script setup lang="ts">
import { cn } from '@/utils/shadcn'
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <nuxt-link
      to="/service/overview"
      class="text-sm font-medium text-muted-foreground hover:text-primary"
      :class="cn($route.path === '/service/overview' && 'text-primary')"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconOverview /> <span>Overview</span>
      </div>
    </nuxt-link>
    <nuxt-link
      to="/service/proxy"
      class="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      :class="cn($route.path === '/service/proxy' && 'text-primary')"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconWeb /> <span>Proxy</span>
      </div>
    </nuxt-link>
    <nuxt-link
      to="/service/link"
      class="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      :class="cn($route.path === '/service/link' && 'text-primary')"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconLink /> <span>Friend Link</span>
      </div>
    </nuxt-link>
    <nuxt-link
      to="/service/manage"
      class="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      :class="cn($route.path === '/service/manage' && 'text-primary')"
    >
      <div class="flex flex-row flex-nowrap items-center space-x-1">
        <IconConnect /> <span>Control</span>
      </div>
    </nuxt-link>
  </nav>
</template>
