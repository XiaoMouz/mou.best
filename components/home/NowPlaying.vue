<script setup lang="ts">
import { NowPlayState } from '~/types/nowplay-state'

const status = ref<NowPlayState>(NowPlayState.PENDING)
const closed = ref(false)
onMounted(() => {
  setTimeout(() => {
    status.value = NowPlayState.ERROR
  }, 3000)
})
</script>
<template>
  <div>Hello world</div>
</template>
