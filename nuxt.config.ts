// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  srcDir: '.',

  // SPA mode: pages are rendered on the client only.
  ssr: false,

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/mdc',
  ],

  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },

  css: ['~/assets/css/uno.css', '~/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  app: {
    head: {
      title: 'XiaoMouz - Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        {
          innerHTML: `
            ;(function () {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                const setting = localStorage.getItem('theme') || 'auto'
                if (setting === 'dark' || (prefersDark && setting !== 'light'))
                  document.documentElement.classList.toggle('dark', true)
              })()
          `,
          type: 'text/javascript',
        },
      ],
    },
  },
})
