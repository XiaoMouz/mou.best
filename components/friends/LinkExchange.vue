<script setup lang="ts">
import { Link, ExternalLink } from 'lucide-vue-next'

const { t } = useLanguage()

const friendLinks = [
  // {
  //   name: 'Rimo 海猫',
  //   desc: '',
  //   url: 'https://hoyibox.xyz/',
  //   avatar: 'https://s3.mou.best/avatars/rimo.png',
  // },
  {
    name: 'Kevin Deng',
    desc: 'Open-source enthusiast ▌',
    url: 'https://sxzz.moe',
    avatar: 'https://sxzz.dev/avatar.avif',
  },
  {
    name: 'QPomelo',
    desc: '',
    url: 'https://qpomelo.dev',
    avatar: 'https://qpomelo.dev/icons/avatar.jpeg',
  },
  {
    name: 'Libra',
    desc: '爱吃炒饭的外甥',
    url: 'https://libra.wiki/',
    avatar: 'https://libra.wiki/avatar.png',
  },
  {
    name: '罗拉',
    desc: '',
    url: 'https://luola.me',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1205027142&s=640',
  },
  {
    name: '神代綺凜',
    desc: 'ななひら天下第一！',
    url: 'https://moe.best',
    avatar: 'https://moe.best/usr/img/avatar1.png',
  },
  {
    name: 'Baoshuo',
    desc: '',
    url: 'https://baoshuo.ren',
    avatar: 'https://cdn.jsdelivr.net/npm/bsi/favicon/192x192.png',
  },
  {
    name: '杰帕斯の小窝',
    desc: '是杰帕斯哟！Japerz!',
    url: 'https://japerz.com',
    avatar: 'https://q.qlogo.cn/g?b=qq&nk=1952135253&s=100',
  },
  {
    name: '雪山深处 - Talaxy',
    desc: '',
    url: 'https://www.talaxy.site/',
    avatar: 'https://www.talaxy.site/icons/icon-96x96.png',
  },

  {
    name: 'Fika',
    desc: '遇到困难睡大觉',
    url: 'https://fika.ink/',
    avatar: 'https://pic.imgdb.cn/item/637c14ee16f2c2beb161a26e.jpg',
  },
  {
    name: '浮枕星海',
    desc: 'Kernel panic at 0xffff467573696f6e',
    url: 'https://universesaurora.top/',
    avatar: 'https://universesaurora.top/img/favicon.png',
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
          <div class="text-xs text-on-surface-variant">{{ friend.desc }}</div>
        </div>
        <ExternalLink
          :size="16"
          class="ml-auto opacity-0 group-hover:opacity-50 transition-opacity"
        />
      </a>
    </div>
  </div>
</template>
