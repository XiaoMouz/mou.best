<script setup lang="ts">
definePageMeta({
  layout: 'service',
})

const user = useSupabaseUser()
console.log(user.value)
</script>
<template></template>
