<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

import { toast } from '../ui/toast'

const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: 'Required.',
      })
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.',
      }),
  })
)

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values: any) {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    ),
  })
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <h3 class="text-lg font-medium">Account</h3>
    <p class="text-sm text-muted-foreground">
      Update your account settings. Set your preferred language and timezone.
    </p>
  </div>
  <Separator class="my-4" />
  <Form
    v-slot="{ setFieldValue }"
    :validation-schema="accountFormSchema"
    class="space-y-8"
    @submit="onSubmit"
  >
    <FormField v-slot="{ componentField }" name="displayname">
      <FormItem>
        <FormLabel>Display Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Display Name"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is the name that will be displayed on your profile and in emails.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Username" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          The username is share to other user, and track your profile
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Email" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          The email is bind to account and guardian your account main way.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit"> Update account </Button>
    </div>
  </Form>
</template>
