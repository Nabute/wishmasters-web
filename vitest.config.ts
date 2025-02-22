import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  resolve: {
    alias: {
      "vue-chartkick": "vue-chartkick/dist/vue-chartkick.esm.js",
    },
  },
  test: {
    setupFiles: ["tests/setup/i18n.setup.ts", "tests/setup/vuetify.setup.ts"],
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
      thresholds: {
        lines: 0,
        branches: 0,
        functions: 0,
        statements: 0,
      },
    },
    environmentOptions: {
      nuxt: {
        domEnvironment: "happy-dom",
      },
    },
  },
});