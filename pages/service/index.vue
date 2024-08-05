<script setup lang="ts">
definePageMeta({
  layout: 'service',
  middleware: 'auth',
})

const user = useSupabaseUser()
console.log(user.value)
const session = useSupabaseSession()
console.log(session.value)
</script>
<template></template>
