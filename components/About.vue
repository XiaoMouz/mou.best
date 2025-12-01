<template>
  <section class="relative z-10 py-20 px-4 max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-on-background mb-4">
        {{ t('about.title') }} <span class="text-primary">{{ t('about.me') }}</span>
      </h2>
      <p class="text-lg text-on-surface-variant max-w-2xl mx-auto">
        {{ t('about.subtitle') }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-surface-container rounded-2xl p-8 border border-outline-variant/20">
        <h3 class="text-2xl font-bold text-on-surface mb-4">{{ t('about.role') }}</h3>
        <p class="text-on-surface-variant leading-relaxed">
          {{ t('about.bio') }}
        </p>
      </div>

      <div class="bg-surface-container rounded-2xl p-8 border border-outline-variant/20">
        <h3 class="text-2xl font-bold text-on-surface mb-4">{{ t('about.techStack') }}</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in techStack" :key="tech" class="px-4 py-2 bg-primary-container text-on-primary-container rounded-full text-sm">
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLanguage()

const techStack = ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker']
</script>
