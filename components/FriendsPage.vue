<script setup lang="ts">
import { Quote, Gamepad2, Trophy, Users, Swords, Crosshair, Map, Skull, Crown, Timer, Zap, Flag } from 'lucide-vue-next'

const { t } = useLanguage()
</script>

<template>
  <section class="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto animate-fade-in space-y-32">

    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-5xl md:text-7xl font-bold text-on-background mb-4 tracking-tight">
        {{ t('friends.title') }}
      </h1>
      <p class="text-xl text-on-surface-variant max-w-2xl mx-auto flex items-center justify-center gap-2">
        <Quote :size="20" class="text-primary rotate-180" />
        <span class="italic font-serif">{{ t('friends.quote') }}</span>
        <Quote :size="20" class="text-primary" />
      </p>
    </div>

    <!-- 1. Link Exchange (Standard) -->
    <FriendsLinkExchange />

    <!-- 2. Special Friends Grid -->
    <div class="space-y-8">
      <h2 class="text-2xl font-bold text-on-surface flex items-center gap-3 px-4">
         <span class="w-8 h-1 bg-primary rounded-full"></span> Special Connections
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <FriendsSoulmateCard
          image="https://images.unsplash.com/photo-1518577915332-c2a19f149a75?q=80&w=1600&auto=format&fit=crop"
          :category="t('friends.soulmate')"
          quote='"The one who listens to the silence."'
          description="A bond that transcends time. Through every high and low, you've been the anchor in the storm."
          theme="pink"
          />
          <FriendsSoulmateCard
          image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop"
          category="Partner in Crime"
          quote='"We ride together, we die together."'
          description="From late night coding sessions to spontaneous road trips. The adventure never ends when you're around."
          theme="blue"
          />
      </div>
    </div>

    <!-- 3. Gaming Squad Section -->
    <div class="space-y-8">
       <h2 class="text-2xl font-bold text-on-surface flex items-center gap-3 px-4">
         <Gamepad2 :size="28" class="text-purple-400" /> Gaming Squad
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

          <!-- 1. The FPS Carry -->
          <FriendsGamingBuddy
              name="Viper"
              role="Entry Fragger"
              level="Rank: Predator"
              status="In Lobby"
              themeColor="#ef4444"
              mainGame="Apex Legends"
              mainGameImg="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200"
              defaultBg="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop"
              steamUserId="76561198229927460"
              :history="[
                  { year: '2019', event: 'Met in Apex S1', icon: Users, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2020', event: 'First 4k Damage', icon: Crosshair, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2022', event: 'Master Rank Grind', icon: Trophy, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2023', event: 'LAN Tournament', icon: Crown, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop' },
              ]"
          />

          <!-- 2. The Strategist -->
          <FriendsGamingBuddy
              name="Strategos"
              role="Shotcaller"
              level="Lvl 100"
              status="Online"
              themeColor="#3b82f6"
              mainGame="League of Legends"
              mainGameImg="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=200"
              defaultBg="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop"
              steamUserId="76561198157142591"
              :history="[
                  { year: '2015', event: 'Bot Lane Duo', icon: Users, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2017', event: 'Clash Winners', icon: Trophy, image: 'https://images.unsplash.com/photo-1511882150382-421056c8d32e?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2020', event: 'Moved to TFT', icon: Map, image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2024', event: 'Arena Mode', icon: Swords, image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1600&auto=format&fit=crop' },
              ]"
          />

          <!-- 3. The Explorer -->
          <FriendsGamingBuddy
              name="Nomad"
              role="Survival Expert"
              level="Day 400"
              status="Offline"
              themeColor="#22c55e"
              mainGame="Minecraft"
              mainGameImg="https://images.unsplash.com/photo-1627856014759-0852292463fe?q=80&w=200"
              defaultBg="https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=1600&auto=format&fit=crop"
              steamUserId="76561199263563573"
              :history="[
                  { year: '2016', event: 'First Server', icon: Map, image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2019', event: 'The End Dragon', icon: Skull, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2021', event: 'Valheim Saga', icon: Swords, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2024', event: 'Palworld', icon: Users, image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1600&auto=format&fit=crop' },
              ]"
          />

          <!-- 4. The Speedrunner (New) -->
          <FriendsGamingBuddy
              name="Glitch"
              role="Frame Perfect"
              level="PB: 18:04"
              status="Streaming"
              themeColor="#f59e0b"
              mainGame="Celeste"
              mainGameImg="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200"
              defaultBg="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"
              steamUserId="76561199034242571"
              :history="[
                  { year: '2020', event: 'Discovered TAS', icon: Zap, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2021', event: 'First Sub 20', icon: Timer, image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2022', event: 'GDQ Appearance', icon: Flag, image: 'https://images.unsplash.com/photo-1531297461136-82lw8a1b6c86?q=80&w=1600&auto=format&fit=crop' },
                  { year: '2024', event: 'World Record', icon: Trophy, image: 'https://images.unsplash.com/photo-1520697517317-6767553cc51a?q=80&w=1600&auto=format&fit=crop' },
              ]"
          />

      </div>
    </div>

    <!-- 4. Hometown Group -->
    <FriendsHometownGroup />

  </section>
</template>
