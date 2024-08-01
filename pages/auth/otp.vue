<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

definePageMeta({
  layout: 'auth',
  title: 'Sign up',
})

const inputPIN = ref(false)
const pending = ref(false)
const haveError = ref(false)
const errorMessage = ref('')
const pendingEmail = ref('unknown email')

function lockOnPending(enable: boolean) {
  pending.value = enable
}

const value = ref<string[]>([])

const formSchema = toTypedSchema(
  z.object({
    pin: z.array(z.coerce.string()).length(6, { message: 'Invalid input' }),
  })
)

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
})

async function onPINSubmit() {
  lockOnPending(true)
  haveError.value = false
}

const handleComplete = (e: string[]) => onPINSubmit()

onMounted(() => {
  document.title = 'Sign up'

  // get params from URL
  const url = new URL(window.location.href)
  const email = url.searchParams.get('email')
  if (email) {
    pendingEmail.value = email
    inputPIN.value = true
  }
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
      <CardContent>
        <Alert variant="destructive" v-if="haveError" class="mb-4">
          <AlertTitle>Fucked up</AlertTitle>
          <AlertDescription>
            {{ 'Failed:&nbsp;' + errorMessage }}
          </AlertDescription>
        </Alert>
        <div class="flex flex-col space-y-4">
          <span class="pointer-events-none"
            >An OTP email has been sent
            <code class="bg-[#00000030] dark:bg-[#ffffff30] rounded-md px-1"
              >&lt;{{ pendingEmail }}&gt;</code
            >
          </span>
          <form class="flex flex-col space-y-4" @submit="onPINSubmit">
            <PinInput
              id="pin-input"
              v-model="value"
              placeholder="○"
              @complete="handleComplete"
            >
              <PinInputGroup>
                <PinInputInput
                  v-for="(id, index) in 6"
                  :key="id"
                  :index="index"
                />
              </PinInputGroup>
            </PinInput>
            <div class="flex space-x-4">
              <Button>
                <span>Verify</span>
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  </div>
  <LoadingCycle v-if="pending" sizeClass="w-6 h-6" layoutClass="fixed" />
</template>
<style scoped></style>
