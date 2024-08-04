<template>
  <div
    class="absolute top-4 left-[50%] z-10 animate-slide-in-from-top"
    v-if="user"
  >
    <div
      class="flex flex-row space-x-4 bg-[#00000070] py-3 px-6 rounded-full items-center backdrop-blur-[2px] hover:backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-150! shadow-gray-400 hover:shadow-gray-400 dark:shadow-zinc-700"
    >
      <div>
        <Avatar>
          <AvatarImage v-if="info.avatarLink" :src="info.avatarLink" />
          <AvatarFallback>{{ info.name?.charAt(0) }}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 class="font-bold">Welcome back</h1>
        <span class="text-sm">{{ info.name }}</span>
      </div>
      <div>
        <nuxt-link to="/service">
          <Button class="p-2 rounded-2xl">
            <IconControl class="fill-slate-200 dark:fill-slate-800" />
          </Button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const info = reactive({
  name: 'No Session',
  avatarLink: '',
})

const user = useSupabaseUser()
const client = useSupabaseClient()

if (user.value) {
  const res = await client
    .from('profiles')
    .select(`id,username,display_name,avatar_link`)
    .eq('id', user.value.id)
    .returns<
      [
        {
          id: string
          username: string
          display_name: string
          avatar_link: string
        }
      ]
    >()

  console.log(res)
  if (res && res.data) {
    info.name = res.data[0].display_name
      ? res.data[0].display_name
      : res.data[0].username
    info.avatarLink = res.data[0].avatar_link
    console.log(info)
  }
}
</script>
