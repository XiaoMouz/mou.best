<script setup lang="ts">
import { Clock3, Radio, WifiOff } from 'lucide-vue-next'

interface LiveStatus {
  title: string | null
  isLive: boolean
  startedAt?: string | null
  lastStartedAt?: string | null
  lastEndedAt?: string | null
}

const { t, language } = useLanguage()

const defaultLiveStatus: LiveStatus = {
  title: null,
  isLive: false,
  startedAt: null,
  lastStartedAt: null,
  lastEndedAt: null,
}

const { data, refresh, status } = await useAsyncData(
  'about-live-status',
  () => $fetch<LiveStatus>('/api/live/status'),
  {
    default: () => ({ ...defaultLiveStatus }),
  },
)

const liveStatus = computed(() => data.value ?? defaultLiveStatus)

const formatter = computed(
  () =>
    new Intl.DateTimeFormat(language.value === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
)

const formatTimestamp = (value?: string | null) => {
  if (!value) {
    return t('about.live.noRecord')
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return t('about.live.noRecord')
  }

  return formatter.value.format(date)
}

const primaryTimestamp = computed(() => {
  if (liveStatus.value.isLive) {
    return formatTimestamp(liveStatus.value.startedAt)
  }

  return formatTimestamp(liveStatus.value.lastStartedAt)
})

const secondaryTimestamp = computed(() => {
  if (liveStatus.value.isLive) {
    return t('about.live.liveNow')
  }

  return formatTimestamp(liveStatus.value.lastEndedAt)
})

let refreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  refreshInterval = setInterval(() => {
    refresh()
  }, 60000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <a
    href="https://live.mou.best"
    target="_blank"
    rel="noreferrer"
    class="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 block bg-surface-container-high rounded-[2.5rem] p-6 border border-outline-variant/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
  >
    <div
      class="absolute inset-0 opacity-70"
      :class="
        liveStatus.isLive
          ? 'bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent'
          : 'bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/18 via-transparent to-transparent'
      "
    ></div>
    <div
      class="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl"
      :class="liveStatus.isLive ? 'bg-red-500/25' : 'bg-primary/20'"
    ></div>

    <div class="relative z-10 flex h-full flex-col justify-between gap-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="mb-2 flex items-center gap-2 text-on-surface-variant">
            <Radio :size="18" />
            <span class="text-xs font-bold uppercase tracking-wider">{{
              t('about.live.label')
            }}</span>
          </div>
          <h3 class="text-2xl font-bold text-on-surface leading-tight">
            {{ liveStatus.title || t('about.live.noTitle') }}
          </h3>
        </div>

        <div
          class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
          :class="
            liveStatus.isLive
              ? 'bg-error-container text-on-error-container'
              : 'bg-surface-container text-on-surface-variant'
          "
        >
          <span
            class="h-2.5 w-2.5 rounded-full"
            :class="
              liveStatus.isLive ? 'bg-red-500 animate-pulse' : 'bg-outline'
            "
          ></span>
          {{
            liveStatus.isLive ? t('about.live.onAir') : t('about.live.offAir')
          }}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div
          class="rounded-[1.5rem] bg-surface/60 px-4 py-3 backdrop-blur-sm border border-outline-variant/10"
        >
          <div class="mb-2 flex items-center gap-2 text-on-surface-variant">
            <Clock3 :size="14" />
            <span class="text-[11px] font-bold uppercase tracking-widest">
              {{
                liveStatus.isLive
                  ? t('about.live.started')
                  : t('about.live.lastStart')
              }}
            </span>
          </div>
          <div class="text-sm font-semibold text-on-surface">
            {{ primaryTimestamp }}
          </div>
        </div>

        <div
          class="rounded-[1.5rem] bg-surface/60 px-4 py-3 backdrop-blur-sm border border-outline-variant/10"
        >
          <div class="mb-2 flex items-center gap-2 text-on-surface-variant">
            <component :is="liveStatus.isLive ? Radio : WifiOff" :size="14" />
            <span class="text-[11px] font-bold uppercase tracking-widest">
              {{
                liveStatus.isLive
                  ? t('about.live.status')
                  : t('about.live.lastEnd')
              }}
            </span>
          </div>
          <div class="text-sm font-semibold text-on-surface">
            {{ secondaryTimestamp }}
          </div>
        </div>
      </div>

      <div
        class="rounded-[1.5rem] px-4 py-3 text-sm border"
        :class="
          liveStatus.isLive
            ? 'bg-error-container/50 border-error/10 text-on-surface'
            : 'bg-surface-container border-outline-variant/10 text-on-surface-variant'
        "
      >
        <template v-if="liveStatus.isLive">
          {{ t('about.live.liveDescription') }}
        </template>
        <template v-else-if="status !== 'pending'">
          {{ t('about.live.offlineDescription') }}
        </template>
        <template v-else>
          {{ t('about.live.loading') }}
        </template>
      </div>
    </div>
  </a>
</template>
