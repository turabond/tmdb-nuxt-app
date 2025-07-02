// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      tmdbToken: process.env.TMDB_TOKEN,
      firebase: {
        apiKey: process.env.FB_API_KEY,
        authDomain: process.env.FB_AUTH_DOMAIN,
        projectId: process.env.FB_PROJECT_ID,
        storageBucket: process.env.FB_STORAGE_BUCKET,
        messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
        appId: process.env.FB_APP_ID,
        measurementId: process.env.FB_MEASUREMENT_ID,
      },
    },
  },
  compatibilityDate: '2025-05-15',
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        commaDangle: 'always-multiline',
        indent: 2,
        braceStyle: '1tbs',
      },
    },
  },
});
