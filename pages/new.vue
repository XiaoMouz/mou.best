d
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Me from '~/components/home/Me.vue'
import NowPlaying from '~/components/home/NowPlaying.vue'

definePageMeta({
  auth: false,
})

const selected = ref<TabName>('Me')

type TabName = 'Me' | 'NowPlaying'

const currentComponent = computed(() => {
  switch (selected.value) {
    case 'Me':
      return Me
    case 'NowPlaying':
      return NowPlaying
    default:
      throw new Error(`Unexpected tab name: ${selected.value}`)
  }
})

const nestedProps = computed(() => {
  switch (selected.value) {
    case 'Me':
      return {}
    case 'NowPlaying':
      return {}
    default:
      throw new Error(`Unexpected tab name: ${selected.value}`)
  }
})

onMounted(() => {})

const snippets = [
  'A Gamer',
  'A Backend Developer',
  'A Frontend Developer',
  'An Android Developer',
]
</script>

<template>
  <HomeWelcome />
  <div class="relative bg-[#ffffff30] dark:bg-black-shadow w-full h-full">
    <div class="bg-inner"></div>
    <div class="w-full h-full flex items-center justify-center">
      <Transition name="fade">
        <component
          :is="currentComponent"
          :key="selected"
          v-bind="nestedProps"
        />
      </Transition>
    </div>
  </div>
  <div class="relative"></div>
</template>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
}

.bg-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(https://mou.best/images/banner.jpg) no-repeat center center;
  background-size: cover;
  z-index: -1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
