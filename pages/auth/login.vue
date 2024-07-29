<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import CardHeader from '~/components/ui/card/CardHeader.vue'

definePageMeta({
  layout: 'auth',
  title: '登录到',
})

const pending = ref(false)
const haveError = ref(false)
const errorMessage = ref('')

const schema = z.object({
  email: z
    .string({
      required_error: '必须填写邮箱',
    })
    .email({
      message: '邮箱格式不正确',
    }),
  password: z
    .string({
      required_error: '必须填写密码',
    })
    .min(6, {
      message: '密码至少6个字符',
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
    const res = await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .catch((e) => {
        if (e.message.includes('401')) {
          errorMessage.value = '用户名或密码错误'
          haveError.value = true
        } else {
          throw e
        }
      })
  } catch (e: any) {
    errorMessage.value = '内部错误'
    haveError.value = true
  }
  lockOnPending(false)
}
</script>
<template>
  <div class="my-auto min-w-[340px] space-y-6" :class="pending ? 'blur' : ''">
    <Card>
      <CardHeader>
        <CardTitle>登录</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" v-if="haveError" class="mb-4">
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>
            {{ '登录失败:&nbsp;' + errorMessage }}
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
              label: '密码',
              inputProps: {
                type: 'password',
                placeholder: '密码',
              },
            },
          }"
          @submit="onSubmit"
        >
          <Button class="mt-6" type="submit" :disabled="pending">登录</Button>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
  <LoadingCycle v-if="pending" sizeClass="w-6 h-6" layoutClass="fixed" />
</template>
