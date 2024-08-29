<template>
  <div class="flex space-y-8 md:flex-row md:space-x-8">
    <div>
      <FormAccount />
    </div>
    <div class="flex flex-col space-y-8">
      <Avatar class="md:w-40 md:h-40">
        <AvatarImage :src="profile.avatarLink" />
        <AvatarFallback>X</AvatarFallback>
      </Avatar>
      <Button> Upload new avatar</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'service-account',
})

const { profile } = await useProfile()  

</script>
