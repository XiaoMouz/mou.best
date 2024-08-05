<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  title: 'Log out',
})

const router = useRouter()
await fetch('/api/user/logout')

const client = useSupabaseClient()
client.auth.signOut({ scope: 'local' })

const countDown = ref(3)
const timer = setInterval(() => {
  countDown.value--
  if (countDown.value === 0) {
    clearInterval(timer)
  }
}, 1000)
setTimeout(() => {
  router.push('/account/login')
}, 3000)
</script>
<template>
  <div class="my-auto text-center">
    <IconBikeLane class="mx-auto h-14 w-14 fill-green-300" />
    <h1 class="text-2xl">已登出</h1>
    <span>返回至登录还有 {{ countDown }} 秒</span>
  </div>
</template>
