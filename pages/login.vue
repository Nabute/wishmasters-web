<template>
  <v-container fluid class="h-screen">
      <v-row class="justify-center align-center h-100">
        <v-col cols="11" sm="7" md="5">
          <v-card
            min-height="40vh"
            class="elevation-24"
            style="border-radius: 10px"
          >
            <v-card-text>
              <v-col class="px-6">
                <v-img
                  lazy-src="@/assets/img/logo.png"
                  width="115px"
                  class="mb-4"
                  src="@/assets/img/logo.png"
                ></v-img>
                <div class="text-h5 font-weight-bold primary--text">
                  {{ $t("auth.title") }}
                </div>
                <span class="text-caption">{{ $t("auth.description") }}</span>
              </v-col>
            </v-card-text>
            <v-card-text>
              <v-col class="py-0">
                <!-- Form -->
                <v-form ref="loginform" v-model="valid" lazy-validation>
                  <!-- Email text field -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      type="email"
                      prepend-inner-icon="mdi-email-outline"
                      required
                      :rules="emailRules"
                      variant="outlined"
                    >
                      <template v-slot:label>
                        <span>{{ $t("auth.email") }}</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <!-- Password text field -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      prepend-inner-icon="mdi-lock-outline"
                      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show ? 'text' : 'password'"
                      name="input-10-1"
                      :hint="$t('form.validation.password.hint')"
                      counter
                      @click:append-inner="toggleShowPassword"
                      @keyup.enter="login"
                      required
                      variant="outlined"
                    >
                      <template v-slot:label>
                        <span>{{ $t("auth.password") }}</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <!-- Action button -->
                  <v-col cols="12">
                    <div class="mb-5">
                      <v-btn
                        :disabled="!valid"
                        color="primary"
                        block
                        size="large"
                        :loading="loginLoading"
                        class="elevation-15"
                        @click="login"
                      >
                        <span class="black--text">{{ $t("auth.login") }}</span>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <p class="mb-4 text-center">{{ $t("auth.new_user") }}?</p>
                    <div class="mb-5">
                      <v-btn
                        block
                        color="primary"
                        size="large"
                        variant="outlined"
                        to="/register"
                      >
                        <span class="black--text">{{ $t("auth.register.label") }}</span>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-row class="justify-end mx-auto">
                      <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                          <v-btn color="background" v-bind="props">
                            {{ locale }}
                          </v-btn>
                        </template>
                        <v-list class="ma-0 pa-0">
                          <v-list-item
                            v-for="loc in availableLocales"
                            :key="loc.code"
                            @click="setLocale(loc.code)"
                          >
                            <v-list-item-title>
                              {{ loc.name }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-row>
                  </v-col>
                </v-form>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";

import { ref, computed } from "vue";



const overlay = ref(true);

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn } = useAuth();

let show = ref(false);
let valid = ref(false);
let password = ref("Pass@1234");
let email = ref("admin@gmail.com");

const { locale, locales, setLocale, t } = useI18n();

const router = useRouter();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const loginLoading = ref(false);
const { notify } = useNotification();

const login = async () => {
  loginLoading.value = true;
  try {
    await signIn(
      { email: email.value, password: password.value },
      { external: true, callbackUrl: "/" }
    );
  } catch (error) {
    console.error(error.data);

    notify({
      title: t("form.error.login_failed"),
      text: `${error?.data?.result?.type || error}`,
      type: "error",
    });
  } finally {
    loginLoading.value = false;
  }
};

const toggleShowPassword = function () {
  show.value = !show.value;
};

const normalRule = [(v: string | number) => !!v || v === 0 || "Required."];
const emailRules = [
  (v: string | number) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (!!v && v.length >= 8) || "Password must be atleast 8 character",
];
</script>
