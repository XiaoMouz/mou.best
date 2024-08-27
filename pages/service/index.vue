<script setup lang="ts">
definePageMeta({
  layout: 'service',
  middleware: 'auth',
})

const router = useRouter()

onMounted(() => {
  router.push('/service/overview')
})
</script>
<template>
  <div class="w-full h-full m-auto flex justify-center rounded-md">
    <LoadingCycle sizeClass="w-6 h-6" />
  </div>
</template>
