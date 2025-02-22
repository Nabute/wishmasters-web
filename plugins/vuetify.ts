// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VNumberInput } from "vuetify/labs/VNumberInput";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VDateInput,
      VNumberInput,
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#00603b",
            secondary: "#061C23",
            tertiary: "#0b7f40",
            background: "#eff0f2",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
