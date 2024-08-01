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
    const { email, password } = schema.parse(values)
    pendingEmail.value = email
    await supabase.auth
      .signUp({
        email,
        password,
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
        <CardTitle class="pointer-events-none"
          >Sign up &nbsp;
          <!-- <code class="bg-[#00000030] dark:bg-[#ffffff30] rounded-md px-1"
            >&lt;mou.best&gt;</code
          > -->
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
            <!-- <Button
              class="mt-6 ml-4"
              @click="inputPIN = true"
              variant="secondary"
            >
              To PIN
            </Button> -->
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
