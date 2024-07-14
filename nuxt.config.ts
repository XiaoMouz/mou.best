// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        getSession: { path: '/user' },
      },
      pages: {
        login: '/auth/login',
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken',
      },
      session: {
        dataType: {
          id: 'string',
          email: 'string',
          name: 'string',
          role: "'admin' | 'guest' | 'account'",
          subscriptions: "{ id: number, status: 'ACTIVE' | 'INACTIVE' }[]",
        },
        dataResponsePointer: '/',
      },
    },
    sessionRefresh: {
      // Whether to refresh the session every time the browser window is refocused.
      enableOnWindowFocus: true,
      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enablePeriodically: 5000,
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
})
