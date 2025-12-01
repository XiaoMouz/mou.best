<template>
  <span class="inline-block">
    <span class="text-gray-300">{{ displayText }}</span>
    <span
      class="ml-1 inline-block w-[3px] h-[1.2em] bg-cyan-400 align-middle animate-blink"
    />
  </span>
</template>

<script setup lang="ts">
interface Props {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 150,
  deletingSpeed: 100,
  delayBetweenWords: 2000,
})

const displayText = ref('')
const wordIndex = ref(0)
const isDeleting = ref(false)

let timer: NodeJS.Timeout

const handleType = () => {
  const currentWord = props.words[wordIndex.value]

  if (isDeleting.value) {
    displayText.value = currentWord.substring(0, displayText.value.length - 1)
  } else {
    displayText.value = currentWord.substring(0, displayText.value.length + 1)
  }

  if (!isDeleting.value && displayText.value === currentWord) {
    setTimeout(() => {
      isDeleting.value = true
    }, props.delayBetweenWords)
  } else if (isDeleting.value && displayText.value === '') {
    isDeleting.value = false
    wordIndex.value = (wordIndex.value + 1) % props.words.length
  }
}

watch([displayText, isDeleting, wordIndex], () => {
  clearTimeout(timer)
  timer = setTimeout(
    handleType,
    isDeleting.value ? props.deletingSpeed : props.typingSpeed
  )
})

onMounted(() => {
  handleType()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
@keyframes blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
