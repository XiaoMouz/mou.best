<script setup lang="ts">
const info = reactive({
  username: '',
  email: '',
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
          avatar_link: string
        }
      ]
    >()

  if (res && res.data) {
    info.username = res.data[0].username
    info.avatarLink = res.data[0].avatar_link
  }
  info.email = user.value.email ? user.value.email : 'unknown email'
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="info.avatarLink" alt="@shadcn" />
          <AvatarFallback>{{ info.username.charAt(0) }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ info.username }}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ info.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <nuxt-link to="/service/account">
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </nuxt-link>
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <nuxt-link to="/auth/logout">
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </nuxt-link>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
