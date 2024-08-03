<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import CardHeader from '~/components/ui/card/CardHeader.vue'

definePageMeta({
  layout: 'auth',
  title: 'Sign up',
})

const pending = ref(false)
const haveError = ref(false)
const errorMessage = ref('')
const pendingEmail = ref('unknown email')
const success = ref(false)

const schema = z.object({
  username: z
    .string({
      required_error: 'Must fill in username',
    })
    .min(3, {
      message: 'Username must be at least 3 characters',
    }),
  email: z
    .string({
      required_error: 'Must fill in email',
    })
    .email({
      message: 'Invalid email address',
    }),
  password: z
    .string({
      required_error: 'Must fill in password',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
})

function lockOnPending(enable: boolean) {
  pending.value = enable
}

async function onSubmit(values: Record<string, any>) {
  lockOnPending(true)
  haveError.value = false

  const supabase = useSupabaseClient()
  try {
    const { email, password, username } = schema.parse(values)
    pendingEmail.value = email
    await supabase.auth
      .signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })
      .then(() => {
        success.value = true
      })
      .catch((e) => {
        if (e.message.includes('401')) {
          errorMessage.value = 'User not found or password is incorrect'
          haveError.value = true
        } else {
          throw e
        }
      })
  } catch (e: any) {
    errorMessage.value = 'Unknown error: ' + e.message
    haveError.value = true
  }
  lockOnPending(false)
}

onMounted(() => {
  document.title = 'Sign up'
})
</script>
<template>
  <div class="my-auto min-w-[340px] space-y-6" :class="pending ? 'blur' : ''">
    <Card>
      <CardHeader>
        <CardTitle class="space-y-2"
          ><div>Sign up &nbsp;</div>
          <div class="text-sm font-thin">
            Already have an account?
            <NuxtLink to="/auth/login" class="font-bold">Login</NuxtLink>
          </div>
        </CardTitle>
      </CardHeader>
      <Transition v-if="!success">
        <CardContent>
          <Alert variant="destructive" v-if="haveError" class="mb-4">
            <AlertTitle>Fucked up</AlertTitle>
            <AlertDescription>
              {{ 'Failed:&nbsp;' + errorMessage }}
            </AlertDescription>
          </Alert>

          <AutoForm
            :schema="schema"
            :field-config="{
              username: {
                label: 'Username',
                inputProps: {
                  type: 'text',
                  placeholder: 'Username',
                },
              },
              email: {
                label: 'Email',
                inputProps: {
                  type: 'text',
                  placeholder: 'Email',
                },
              },
              password: {
                label: 'Password',
                inputProps: {
                  type: 'password',
                  placeholder: 'Password',
                },
              },
            }"
            @submit="onSubmit"
          >
            <Button class="mt-6" type="submit" :disabled="pending"
              >Sign up</Button
            >
          </AutoForm>
        </CardContent>
      </Transition>
      <Transition v-if="!success">
        <CardContent> </CardContent>
      </Transition>
    </Card>
  </div>
  <LoadingCycle v-if="pending" sizeClass="w-6 h-6" layoutClass="fixed" />
</template>
<style scoped></style>
