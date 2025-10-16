// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  serverDir: 'server/',
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  build: {
    transpile: ['vuetify']
  },
  i18n: {
    defaultLocale: 'en',
    langDir: resolve('./src/i18n/locales'),
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'Arabic', file: 'ar.json' }
    ]
  }
})