// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/supabase',
  ],
  ssr: false,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: true,
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: true,
    },
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: undefined,
      exclude: [
        '/',
        '/auth(/*)?',
        '/post(/*)?',
        '/about(/*)?',
        '/rimo(/*)?',
        '/hr(/*)?',
      ],
      cookieRedirect: true,
    },
    clientOptions: {},
  },
})
