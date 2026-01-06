<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ArrowLeft,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Globe,
  Cpu,
  Star,
  Heart,
  Rocket,
  BookOpen,
  Layers,
  Sparkles,
  Mic,
  Trophy,
  Code2,
  Database,
  Wrench,
  LayoutTemplate,
  X,
  ChevronRight,
  Box,
} from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'

interface Skill {
  name: string
  primary?: boolean // Core competency (Big)
  active?: boolean // Currently using (Green Dot)
  ecosystem?: string[] // Related libraries/tools
}

const emit = defineEmits<{
  back: []
}>()

const activeSkill = ref<Skill | null>(null)
const { t } = useLanguage()

onMounted(() => {
  window.scrollTo(0, 0)
})

const frameworks: Skill[] = [
  {
    name: 'React 19',
    primary: true,
    active: true,
    ecosystem: [
      'Redux Toolkit',
      'TanStack Query',
      'React Router',
      'Headless UI',
      'Zod',
      'Recharts',
    ],
  },
  {
    name: 'Next.js 14',
    primary: true,
    active: true,
    ecosystem: [
      'Server Actions',
      'App Router',
      'Vercel',
      'NextAuth',
      'Turbopack',
    ],
  },
  {
    name: 'Vue.js',
    active: false,
    ecosystem: ['Vue 3', 'Pinia', 'Vue Router', 'Nuxt.js', 'Vitest', 'Volar'],
  },
  {
    name: 'Android Dev',
    primary: true,
    active: true,
    ecosystem: [
      'Kotlin',
      'Jetpack Compose',
      'Retrofit',
      'Room',
      'Coroutines',
      'Hilt',
      'Gradle',
    ],
  },
  {
    name: 'Windows Dev',
    primary: true,
    active: false,
    ecosystem: ['C#', '.NET 8', 'WinUI 3', 'WPF', 'MVVM Toolkit', 'XAML'],
  },
  { name: 'Tailwind CSS', primary: true, active: true },
  { name: 'Three.js', active: true },
  { name: 'Framer Motion', active: true },
]

const languages: Skill[] = [
  { name: 'TypeScript', primary: true, active: true },
  { name: 'JavaScript (ES6+)', primary: true },
  { name: 'Kotlin', active: true },
  { name: 'C#', active: false },
  { name: 'Python', active: false },
  { name: 'SQL', primary: true, active: true },
  { name: 'HTML5 / CSS3', active: true },
]

const infra: Skill[] = [
  { name: 'Docker', primary: true, active: true },
  { name: 'PostgreSQL', primary: true, active: true },
  { name: 'AWS (S3/EC2)' },
  { name: 'Redis', active: true },
  { name: 'CI/CD Pipelines', active: true },
  { name: 'Nginx' },
]

const tools: Skill[] = [
  { name: 'Git', primary: true, active: true },
  { name: 'Figma', primary: true, active: true },
  { name: 'Vite', active: true },
  { name: 'Android Studio', active: true },
  { name: 'Visual Studio', active: false },
  { name: 'Postman' },
]

const handleSkillClick = (skill: Skill) => {
  const hasEcosystem = skill.ecosystem && skill.ecosystem.length > 0
  if (hasEcosystem) {
    activeSkill.value = skill
  }
}

const closeModal = () => {
  activeSkill.value = null
}

const handleBack = () => {
  emit('back')
}
</script>

<template>
  <div
    class="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-background animate-fade-in text-on-background"
  >
    <!-- Modal for displaying ecosystem -->
    <Teleport to="body">
      <div
        v-if="activeSkill"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      >
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeModal"
        ></div>
        <div
          class="relative bg-surface-container w-full max-w-md rounded-3xl p-6 shadow-2xl border border-outline-variant/20 transform transition-all scale-100"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <X :size="20" class="text-on-surface-variant" />
          </button>

          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"
            >
              <Box :size="24" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-on-surface">
                {{ activeSkill.name }}
              </h3>
              <span class="text-sm text-on-surface-variant"
                >Ecosystem & Tools</span
              >
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, i) in activeSkill.ecosystem"
                :key="i"
                class="px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/20 text-sm text-on-surface hover:border-primary/30 transition-colors cursor-default"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div
            class="mt-8 pt-4 border-t border-outline-variant/10 text-xs text-on-surface-variant text-center"
          >
            Click anywhere outside to close
          </div>
        </div>
      </div>
    </Teleport>

    <div class="max-w-6xl mx-auto">
      <!-- Navigation & Actions -->
      <div class="flex justify-between items-center mb-12">
        <button
          @click="handleBack"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors border border-outline-variant/30"
        >
          <ArrowLeft :size="18" />
          <span>{{ t('resume.back') }}</span>
        </button>

        <button
          class="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
        >
          <Download :size="18" />
          <span>{{ t('resume.download') }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- ================= LEFT COLUMN (Sidebar) ================= -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Header / Contact Info -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 text-center lg:text-left relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-secondary/20"
            ></div>
            <div class="relative">
              <div
                class="w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-surface mb-6 shadow-xl relative z-10 bg-surface"
              >
                <img
                  src="/me.webp"
                  alt="Profile"
                  class="w-full h-full object-cover"
                />
              </div>
              <h1 class="text-4xl font-bold text-on-surface mb-2">XiaoMouz</h1>
              <p class="text-xl text-primary font-medium mb-6">
                {{ t('resume.profile.role') }}
              </p>

              <div class="space-y-4 text-on-surface-variant text-sm">
                <div
                  class="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div class="p-2 rounded-full bg-surface-container-high">
                    <Mail :size="16" />
                  </div>
                  <span>i@mou.best</span>
                </div>
                <div
                  class="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div class="p-2 rounded-full bg-surface-container-high">
                    <MapPin :size="16" />
                  </div>
                  <span>ChengDu, China (GMT+8)</span>
                </div>
                <div
                  class="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div class="p-2 rounded-full bg-surface-container-high">
                    <Github :size="16" />
                  </div>
                  <a
                    href="https://github.com/XiaoMouz"
                    class="hover:underline-offset"
                    >github.com/XiaoMouz</a
                  >
                </div>
                <!-- <div
                  class="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div class="p-2 rounded-full bg-surface-container-high">
                    <Linkedin :size="16" />
                  </div>
                  <a href="https://linkedin.com/in/xiaomouz"
                    >linkedin.com/in/xiaomouz</a
                  >
                </div> -->
              </div>
            </div>
          </div>

          <!-- Languages -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10"
          >
            <h3
              class="text-lg font-bold text-on-surface mb-6 uppercase tracking-wider flex items-center gap-2"
            >
              <Globe :size="18" class="text-primary" />
              {{ t('resume.headers.languages') }}
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="font-medium text-on-surface">Mandarin</span>
                <div class="flex gap-1">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-medium text-on-surface">English</span>
                <div class="flex gap-1">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                  <div class="w-2 h-2 rounded-full bg-outline-variant/30"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Experience (Cards) -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10"
          >
            <h3
              class="text-lg font-bold text-on-surface mb-6 uppercase tracking-wider flex items-center gap-2"
            >
              <Heart :size="18" class="text-red-400" />
              {{ t('resume.headers.personalExp') }}
            </h3>
            <div class="grid gap-3">
              <div
                class="p-4 bg-surface-container-high rounded-xl border border-outline-variant/10 hover:border-red-400/30 transition-colors"
              >
                <div
                  class="flex items-center gap-2 mb-2 text-on-surface font-bold text-sm"
                >
                  <BookOpen :size="16" class="text-primary" />
                  {{ t('resume.content.personal.0.title') }}
                </div>
                <p class="text-xs text-on-surface-variant leading-relaxed">
                  {{ t('resume.content.personal.0.desc') }}
                </p>
              </div>

              <div
                class="p-4 bg-surface-container-high rounded-xl border border-outline-variant/10 hover:border-red-400/30 transition-colors"
              >
                <div
                  class="flex items-center gap-2 mb-2 text-on-surface font-bold text-sm"
                >
                  <Layers :size="16" class="text-primary" />
                  {{ t('resume.content.personal.1.title') }}
                </div>
                <p class="text-xs text-on-surface-variant leading-relaxed">
                  {{ t('resume.content.personal.1.desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Special Experience (Cards) -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl"
            ></div>
            <h3
              class="text-lg font-bold text-on-surface mb-6 uppercase tracking-wider flex items-center gap-2 relative z-10"
            >
              <Sparkles :size="18" class="text-yellow-400" />
              {{ t('resume.headers.specialExp') }}
            </h3>
            <div class="space-y-4 relative z-10">
              <div
                class="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  class="p-2 bg-purple-500/10 text-purple-400 rounded-lg shrink-0 border border-purple-500/20"
                >
                  <Mic :size="18" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-on-surface">
                    {{ t('resume.content.special.0.title') }}
                  </h4>
                  <p class="text-xs text-on-surface-variant">
                    {{ t('resume.content.special.0.desc') }}
                  </p>
                </div>
              </div>

              <div
                class="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  class="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg shrink-0 border border-yellow-500/20"
                >
                  <Trophy :size="18" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-on-surface">
                    {{ t('resume.content.special.1.title') }}
                  </h4>
                  <p class="text-xs text-on-surface-variant">
                    {{ t('resume.content.special.1.desc') }}
                  </p>
                </div>
              </div>

              <div
                class="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  class="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0 border border-blue-500/20"
                >
                  <Code2 :size="18" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-on-surface">
                    {{ t('resume.content.special.2.title') }}
                  </h4>
                  <p class="text-xs text-on-surface-variant">
                    {{ t('resume.content.special.2.desc') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Awards & Certifications -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10"
          >
            <h3
              class="text-lg font-bold text-on-surface mb-6 uppercase tracking-wider flex items-center gap-2"
            >
              <Award :size="18" class="text-primary" />
              {{ t('resume.headers.awards') }}
            </h3>
            <div
              class="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/20"
            >
              <div class="pl-6 relative">
                <div
                  class="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-surface-container"
                ></div>
                <h4 class="font-bold text-on-surface text-sm">
                  AWS Certified SA
                </h4>
                <p class="text-xs text-on-surface-variant">2023</p>
              </div>
              <div class="pl-6 relative">
                <div
                  class="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-surface-container"
                ></div>
                <h4 class="font-bold text-on-surface text-sm">
                  Best UI/UX Design
                </h4>
                <p class="text-xs text-on-surface-variant">
                  Global Hackathon 2022
                </p>
              </div>
              <div class="pl-6 relative">
                <div
                  class="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-surface-container"
                ></div>
                <h4 class="font-bold text-on-surface text-sm">
                  React Core Team Rec
                </h4>
                <p class="text-xs text-on-surface-variant">2021</p>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div
            class="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10"
          >
            <h3
              class="text-lg font-bold text-on-surface mb-6 uppercase tracking-wider flex items-center gap-2"
            >
              <GraduationCap :size="18" class="text-primary" />
              {{ t('resume.headers.education') }}
            </h3>

            <div class="space-y-4">
              <div>
                <div class="font-bold text-on-surface">
                  {{ t('resume.content.edu.degree') }}
                </div>
                <div class="text-primary text-sm">
                  {{ t('resume.content.edu.school') }}
                </div>
                <div class="text-on-surface-variant/60 text-xs mt-1">
                  2016 - 2020
                </div>
                <p class="text-xs text-on-surface-variant mt-2">
                  {{ t('resume.content.edu.desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= RIGHT COLUMN (Main Content) ================= -->
        <div class="lg:col-span-8 space-y-8">
          <!-- 1. Self Evaluation / Summary -->
          <div
            class="bg-surface-container-high/30 rounded-[2.5rem] p-8 border border-outline-variant/10 relative overflow-hidden"
          >
            <div
              class="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            ></div>
            <h2
              class="text-2xl font-bold text-on-surface mb-4 flex items-center gap-2"
            >
              <Star class="text-yellow-500 fill-yellow-500" :size="24" />
              {{ t('resume.headers.selfEval') }}
            </h2>
            <div
              class="space-y-4 text-on-surface-variant text-lg leading-relaxed"
            >
              <p>
                {{ t('resume.content.selfEvalText1') }}
              </p>
              <p class="text-base">
                {{ t('resume.content.selfEvalText2') }}
              </p>
            </div>
          </div>

          <!-- 2. Detailed Skills Matrix - CATEGORIZED -->
          <div
            class="bg-surface-container rounded-[2.5rem] p-8 md:p-10 border border-outline-variant/10"
          >
            <div class="flex items-center gap-3 mb-8">
              <Cpu class="text-primary" :size="28" />
              <div>
                <h2 class="text-2xl font-bold text-on-surface">
                  {{ t('resume.headers.technical') }}
                </h2>
                <p
                  class="text-xs text-on-surface-variant mt-1 flex items-center gap-3"
                >
                  <span class="flex items-center gap-1"
                    ><span
                      class="w-2 h-2 bg-surface-container-high border border-primary/30 rounded-full"
                    ></span>
                    Primary</span
                  >
                  <span class="flex items-center gap-1"
                    ><span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active Usage</span
                  >
                  <span class="text-[10px] text-on-surface-variant/70 ml-2"
                    >(Click ecosystem items to expand)</span
                  >
                </p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-y-10 gap-x-8">
              <!-- Frameworks Category -->
              <div class="flex flex-col h-full">
                <h3
                  class="text-sm font-bold uppercase tracking-wider mb-5 border-b border-outline-variant/20 pb-2 flex items-center gap-2 text-primary"
                >
                  <LayoutTemplate :size="16" />
                  {{ t('resume.categories.frameworks') }}
                </h3>
                <div class="flex flex-wrap gap-3 content-start">
                  <button
                    v-for="skill in frameworks"
                    :key="skill.name"
                    @click="handleSkillClick(skill)"
                    :disabled="!skill.ecosystem || skill.ecosystem.length === 0"
                    :class="[
                      'relative flex items-center gap-2 rounded-lg transition-all border group text-left',
                      skill.primary
                        ? 'px-4 py-2 bg-surface-container-high text-on-surface font-bold text-sm shadow-sm border-primary/20'
                        : 'px-3 py-1.5 border-outline-variant/10 bg-transparent text-on-surface-variant text-xs hover:border-outline-variant/30',
                      skill.ecosystem && skill.ecosystem.length > 0
                        ? 'cursor-pointer hover:scale-105 active:scale-95'
                        : 'cursor-default',
                    ]"
                  >
                    <span
                      v-if="skill.active"
                      class="relative flex h-1.5 w-1.5 shrink-0"
                      title="Active in current stack"
                    >
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"
                      ></span>
                    </span>
                    <span :class="skill.primary ? '' : 'opacity-90'">{{
                      skill.name
                    }}</span>
                    <ChevronRight
                      v-if="skill.ecosystem && skill.ecosystem.length > 0"
                      :size="12"
                      class="opacity-0 group-hover:opacity-50 transition-opacity -mr-1"
                    />
                  </button>
                </div>
              </div>

              <!-- Languages Category -->
              <div class="flex flex-col h-full">
                <h3
                  class="text-sm font-bold uppercase tracking-wider mb-5 border-b border-outline-variant/20 pb-2 flex items-center gap-2 text-secondary"
                >
                  <Code2 :size="16" /> {{ t('resume.categories.languages') }}
                </h3>
                <div class="flex flex-wrap gap-3 content-start">
                  <button
                    v-for="skill in languages"
                    :key="skill.name"
                    @click="handleSkillClick(skill)"
                    :disabled="!skill.ecosystem || skill.ecosystem.length === 0"
                    :class="[
                      'relative flex items-center gap-2 rounded-lg transition-all border group text-left',
                      skill.primary
                        ? 'px-4 py-2 bg-surface-container-high text-on-surface font-bold text-sm shadow-sm border-secondary/20'
                        : 'px-3 py-1.5 border-outline-variant/10 bg-transparent text-on-surface-variant text-xs hover:border-outline-variant/30',
                      skill.ecosystem && skill.ecosystem.length > 0
                        ? 'cursor-pointer hover:scale-105 active:scale-95'
                        : 'cursor-default',
                    ]"
                  >
                    <span
                      v-if="skill.active"
                      class="relative flex h-1.5 w-1.5 shrink-0"
                      title="Active in current stack"
                    >
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"
                      ></span>
                    </span>
                    <span :class="skill.primary ? '' : 'opacity-90'">{{
                      skill.name
                    }}</span>
                    <ChevronRight
                      v-if="skill.ecosystem && skill.ecosystem.length > 0"
                      :size="12"
                      class="opacity-0 group-hover:opacity-50 transition-opacity -mr-1"
                    />
                  </button>
                </div>
              </div>

              <!-- Infrastructure Category -->
              <div class="flex flex-col h-full">
                <h3
                  class="text-sm font-bold uppercase tracking-wider mb-5 border-b border-outline-variant/20 pb-2 flex items-center gap-2 text-tertiary"
                >
                  <Database :size="16" /> {{ t('resume.categories.infra') }}
                </h3>
                <div class="flex flex-wrap gap-3 content-start">
                  <button
                    v-for="skill in infra"
                    :key="skill.name"
                    @click="handleSkillClick(skill)"
                    :disabled="!skill.ecosystem || skill.ecosystem.length === 0"
                    :class="[
                      'relative flex items-center gap-2 rounded-lg transition-all border group text-left',
                      skill.primary
                        ? 'px-4 py-2 bg-surface-container-high text-on-surface font-bold text-sm shadow-sm border-tertiary/20'
                        : 'px-3 py-1.5 border-outline-variant/10 bg-transparent text-on-surface-variant text-xs hover:border-outline-variant/30',
                      skill.ecosystem && skill.ecosystem.length > 0
                        ? 'cursor-pointer hover:scale-105 active:scale-95'
                        : 'cursor-default',
                    ]"
                  >
                    <span
                      v-if="skill.active"
                      class="relative flex h-1.5 w-1.5 shrink-0"
                      title="Active in current stack"
                    >
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"
                      ></span>
                    </span>
                    <span :class="skill.primary ? '' : 'opacity-90'">{{
                      skill.name
                    }}</span>
                    <ChevronRight
                      v-if="skill.ecosystem && skill.ecosystem.length > 0"
                      :size="12"
                      class="opacity-0 group-hover:opacity-50 transition-opacity -mr-1"
                    />
                  </button>
                </div>
              </div>

              <!-- Tools Category -->
              <div class="flex flex-col h-full">
                <h3
                  class="text-sm font-bold uppercase tracking-wider mb-5 border-b border-outline-variant/20 pb-2 flex items-center gap-2 text-on-surface-variant"
                >
                  <Wrench :size="16" /> {{ t('resume.categories.tools') }}
                </h3>
                <div class="flex flex-wrap gap-3 content-start">
                  <button
                    v-for="skill in tools"
                    :key="skill.name"
                    @click="handleSkillClick(skill)"
                    :disabled="!skill.ecosystem || skill.ecosystem.length === 0"
                    :class="[
                      'relative flex items-center gap-2 rounded-lg transition-all border group text-left',
                      skill.primary
                        ? 'px-4 py-2 bg-surface-container-high text-on-surface font-bold text-sm shadow-sm border-outline-variant/20'
                        : 'px-3 py-1.5 border-outline-variant/10 bg-transparent text-on-surface-variant text-xs hover:border-outline-variant/30',
                      skill.ecosystem && skill.ecosystem.length > 0
                        ? 'cursor-pointer hover:scale-105 active:scale-95'
                        : 'cursor-default',
                    ]"
                  >
                    <span
                      v-if="skill.active"
                      class="relative flex h-1.5 w-1.5 shrink-0"
                      title="Active in current stack"
                    >
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"
                      ></span>
                    </span>
                    <span :class="skill.primary ? '' : 'opacity-90'">{{
                      skill.name
                    }}</span>
                    <ChevronRight
                      v-if="skill.ecosystem && skill.ecosystem.length > 0"
                      :size="12"
                      class="opacity-0 group-hover:opacity-50 transition-opacity -mr-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Work Experience -->
          <div
            class="bg-surface-container rounded-[2.5rem] p-8 md:p-10 border border-outline-variant/10"
          >
            <h2
              class="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3"
            >
              <Building2 class="text-primary" />
              {{ t('resume.headers.workExp') }}
            </h2>

            <div
              class="space-y-12 relative before:absolute before:left-4 md:before:left-4 before:top-14 before:bottom-0 before:w-0.5 before:bg-outline-variant/20"
            >
              <!-- Job 1 -->
              <div class="relative pl-12 md:pl-12 group">
                <div
                  class="absolute left-[11px] md:left-[11px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container group-hover:scale-125 transition-transform"
                ></div>

                <div
                  class="flex flex-wrap justify-between items-baseline mb-2 gap-2"
                >
                  <h3 class="text-xl font-bold text-on-surface">
                    {{ t('resume.content.job1.title') }}
                  </h3>
                  <span
                    class="text-sm font-medium text-on-primary-container bg-primary-container px-3 py-1 rounded-full"
                    >2022 - Present</span
                  >
                </div>
                <div class="text-lg text-primary mb-4 font-medium">
                  {{ t('resume.content.job1.company') }}
                </div>

                <ul
                  class="list-disc pl-5 space-y-2 text-on-surface-variant text-sm md:text-base marker:text-primary"
                >
                  <li
                    v-for="(desc, i) in (t('resume.content.job1.desc') as string[])"
                    :key="i"
                  >
                    {{ desc }}
                  </li>
                </ul>
                <div class="flex gap-2 mt-4">
                  <span
                    class="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded"
                    >React</span
                  >
                  <span
                    class="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded"
                    >Module Fed</span
                  >
                </div>
              </div>

              <!-- Job 2 -->
              <div class="relative pl-12 md:pl-12 group">
                <div
                  class="absolute left-[11px] md:left-[11px] top-1.5 w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface-container group-hover:bg-primary group-hover:scale-125 transition-all"
                ></div>

                <div
                  class="flex flex-wrap justify-between items-baseline mb-2 gap-2"
                >
                  <h3 class="text-xl font-bold text-on-surface">
                    {{ t('resume.content.job2.title') }}
                  </h3>
                  <span
                    class="text-sm font-medium text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full"
                    >2020 - 2022</span
                  >
                </div>
                <div class="text-lg text-secondary mb-4 font-medium">
                  {{ t('resume.content.job2.company') }}
                </div>

                <ul
                  class="list-disc pl-5 space-y-2 text-on-surface-variant text-sm md:text-base"
                >
                  <li
                    v-for="(desc, i) in (t('resume.content.job2.desc') as string[])"
                    :key="i"
                  >
                    {{ desc }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 4. Project Experience -->
          <div
            class="bg-surface-container rounded-[2.5rem] p-8 md:p-10 border border-outline-variant/10"
          >
            <h2
              class="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3"
            >
              <Rocket class="text-tertiary" />
              {{ t('resume.headers.keyProjects') }}
            </h2>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Project 1 -->
              <div
                class="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-tertiary/50 transition-colors"
              >
                <h3 class="font-bold text-lg text-on-surface mb-2">
                  {{ t('resume.content.project1.title') }}
                </h3>
                <p class="text-sm text-on-surface-variant mb-4">
                  {{ t('resume.content.project1.desc') }}
                </p>
                <div class="mb-3">
                  <span
                    class="text-xs font-bold text-tertiary uppercase tracking-wider"
                    >{{ t('resume.content.project1.challenge') }}</span
                  >
                  <p class="text-xs text-on-surface-variant mt-1">
                    {{ t('resume.content.project1.challengeDesc') }}
                  </p>
                </div>
                <div class="mb-4">
                  <span
                    class="text-xs font-bold text-green-400 uppercase tracking-wider"
                    >{{ t('resume.content.project1.solution') }}</span
                  >
                  <p class="text-xs text-on-surface-variant mt-1">
                    {{ t('resume.content.project1.solutionDesc') }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-2 mt-auto">
                  <span
                    class="text-[10px] px-2 py-0.5 bg-black/20 rounded text-tertiary-container"
                    >D3.js</span
                  >
                  <span
                    class="text-[10px] px-2 py-0.5 bg-black/20 rounded text-tertiary-container"
                    >Kafka</span
                  >
                </div>
              </div>

              <!-- Project 2 -->
              <div
                class="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 hover:border-tertiary/50 transition-colors"
              >
                <h3 class="font-bold text-lg text-on-surface mb-2">
                  {{ t('resume.content.project2.title') }}
                </h3>
                <p class="text-sm text-on-surface-variant mb-4">
                  {{ t('resume.content.project2.desc') }}
                </p>
                <div class="mb-3">
                  <span
                    class="text-xs font-bold text-tertiary uppercase tracking-wider"
                    >{{ t('resume.content.project2.goal') }}</span
                  >
                  <p class="text-xs text-on-surface-variant mt-1">
                    {{ t('resume.content.project2.goalDesc') }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-2 mt-auto pt-4">
                  <span
                    class="text-[10px] px-2 py-0.5 bg-black/20 rounded text-tertiary-container"
                    >React</span
                  >
                  <span
                    class="text-[10px] px-2 py-0.5 bg-black/20 rounded text-tertiary-container"
                    >Tailwind</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
