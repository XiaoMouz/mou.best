<script setup lang="ts">
import { Link, ExternalLink } from 'lucide-vue-next'

const { t } = useI18n()

const friendLinks = [
  {
    name: 'Sarah Drasner',
    role: 'Eng Manager',
    url: 'https://sarah.dev',
    avatar: 'https://ui-avatars.com/api/?name=Sarah&background=random',
  },
  {
    name: 'Josh Comeau',
    role: 'Educator',
    url: 'https://joshwcomeau.com',
    avatar: 'https://ui-avatars.com/api/?name=Josh&background=random',
  },
  {
    name: 'Anthony Fu',
    role: 'Open Source',
    url: 'https://antfu.me',
    avatar: 'https://ui-avatars.com/api/?name=Anthony&background=random',
  },
  {
    name: 'Lee Robinson',
    role: 'Vercel VP',
    url: 'https://leerob.io',
    avatar: 'https://ui-avatars.com/api/?name=Lee&background=random',
  },
]
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-on-surface flex items-center gap-2">
      <Link :size="24" class="text-primary" /> {{ t('friends.links') }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        v-for="(friend, i) in friendLinks"
        :key="i"
        :href="friend.url"
        target="_blank"
        rel="noreferrer"
        class="group bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <img
          :src="friend.avatar"
          :alt="friend.name"
          class="w-12 h-12 rounded-full border-2 border-surface group-hover:border-primary transition-colors"
        />
        <div>
          <div
            class="font-bold text-on-surface group-hover:text-primary transition-colors"
          >
            {{ friend.name }}
          </div>
          <div class="text-xs text-on-surface-variant">{{ friend.role }}</div>
        </div>
        <ExternalLink
          :size="16"
          class="ml-auto opacity-0 group-hover:opacity-50 transition-opacity"
        />
      </a>
    </div>
  </div>
</template>
