<script setup lang="ts">
const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <Resume @back="handleBack" />
</template>
