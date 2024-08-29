<script setup lang="ts">
import { h, onMounted } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from '../ui/toast'
import { useForm } from 'vee-validate'
import { type Database, type Tables } from '~/types/supabase.types';

const avatar = ref<string|undefined>(undefined)

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const { profile, refresh } = useProfile()

onMounted(() => {
  refresh()
})

const accountFormSchema = toTypedSchema(
  z.object({
    displayName: z
      .string({
        required_error: 'Required.',
      })
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.',
      }),
    username: z.string().min(2, 'Username must be at least 2 characters.').max(30, {
        message: 'Name must not be longer than 30 characters.',
      }),
    email: z.string().email('Invalid email address.'),
  })
)

const form = useForm({
  validationSchema: accountFormSchema,
  initialValues: {
    displayName: profile.value.name,
    username: profile.value.username,
    email: profile.value.email,
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  if(true){
    console.log(values)
    toast({
      title: 'Sended',
      description: `${values}`,
    })
    return
  }
  try {
    const { error } = await client
      .from('profiles')
      .update({
        display_name: values.displayName,
        username: values.username,
        email: values.email,
      })
      .eq('id', user.value?.id)

    if (error) throw error

    if (values.email !== user.value?.email) {
      const { error: updateError } = await client.auth.updateUser({ email: values.email })
      if (updateError) throw updateError
    }

    await refresh()
    toast({
      title: 'Profile updated successfully',
      description: 'Your account information has been updated.',
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to update profile. Please try again.',
      variant: 'destructive',
    })
  }
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h3 class="text-lg font-medium">Account</h3>
    <p class="text-sm text-muted-foreground">
      Update your account settings. Set your preferred language and timezone.
    </p>
  </div>
  <Separator class="my-4" />
  <form
    :validation-schema="accountFormSchema"
    class="space-y-8"
    @submit="onSubmit"
  >
    <FormField name="displayName" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Display Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            placeholder="Display Name"
          />
        </FormControl>
        <FormDescription>
          This is the name that will be displayed on your profile and in emails.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="username" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Username" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          The username is shared with other users and tracks your profile.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="email" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Email"  v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This email will send you notifications about website news.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit"> Update account </Button>
    </div>
  </form>
</template>