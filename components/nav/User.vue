<script setup lang="ts">
const info = await useProfile()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="info.avatarLink" alt="@shadcn" />
          <AvatarFallback>{{ info.name.charAt(0) }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ info.name }}</p>
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
