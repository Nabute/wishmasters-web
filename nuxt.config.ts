// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  app: {
    head: {
      title: process.env.SITE_NAME,
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: [
    "nuxt3-notifications",
    "@nuxtjs/i18n",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@sidebase/nuxt-auth"
  ],

  nuxtNotifications: {},
  css: [
    "~/assets/css/main.css",
    "survey-core/defaultV2.min.css",
    "survey-creator-core/survey-creator-core.min.css",
  ],
  i18n: {
    experimental: {
      jsTsFormatResource: true,
    },
    locales: [
      {
      	code: 'in',
      	name: 'हिन्दी',
      	files: [{ path: './in/index.ts', cache: true }],
      },
      {
        code: "en",
        name: "English",
        files: [{ path: "./en/index.ts", cache: true }],
      },
    ],
    defaultLocale: "in",
    lazy: true,
    strategy: "no_prefix",
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
    },
  },
  auth: {
    isEnabled: true,
    baseURL: process.env.BASE_URL,
    provider: {
      type: "refresh",
      endpoints: {
        signIn: { path: "/account/login", method: "post" },
        refresh: { path: "/account/refresh-token", method: "post" },
        getSession: { path: "/account/profile" },
        signOut: false,
      },
      pages: {
        login: "/",
      },
      token: {
        signInResponseTokenPointer: "/data/result/access_token",
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: "lax",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/data/result/refresh_token",
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: "lax",
      },
    },
    globalAppMiddleware: {
      isEnabled: false,
      addDefaultCallbackUrl: false,
    },
    session: {
      enableRefreshOnWindowFocus: false,
      enableRefreshPeriodically: false,
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      siteName: process.env.SITE_NAME,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  mixins: ["~/composables/mixins"],
});
