<script setup lang="ts">
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-vue-next'

const props = defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
}>()

const type = props.type || 'info'

const config = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50 dark:bg-green-950',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 dark:bg-red-950',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
  },
}

const current = config[type]
</script>

<template>
  <div
    class="callout not-prose my-6 p-4 rounded-lg border-l-4"
    :class="[current.bg, current.border, current.text]"
  >
    <div class="flex gap-3">
      <component :is="current.icon" :size="24" :class="current.iconColor" class="flex-shrink-0" />
      <div class="flex-1">
        <h5 v-if="title" class="font-bold mb-2">{{ title }}</h5>
        <div class="callout-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.callout-content :deep(p) {
  margin: 0;
}

.callout-content :deep(p + p) {
  margin-top: 0.5rem;
}
</style>
