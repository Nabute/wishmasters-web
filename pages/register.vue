<template>
  <v-container fluid class="h-screen">
    <v-row class="justify-center align-center h-100">
      <v-col cols="11" sm="7" md="5" lg="3">
        <v-card min-height="40vh" class="elevation-24" style="border-radius: 10px">
          <v-card-text>
            <v-col class="px-6">
              <v-img lazy-src="@/assets/img/logo.png" width="115px" class="mb-4" src="@/assets/img/logo.png"></v-img>
              <div class="text-h5 font-weight-bold primary--text">
                {{ $t("auth.title") }}
              </div>
              <span class="text-caption">{{ $t("auth.register.description") }}</span>
            </v-col>
          </v-card-text>
          <v-card-text>
            <v-col class="py-0">
              <!-- Form -->
              <v-form ref="loginform" v-model="valid" lazy-validation>
                <v-col cols="12">
                  <v-text-field v-model="full_name" density="comfortable" clearable required
                    prepend-inner-icon="mdi-account-outline" variant="outlined" :rules="fieldRules.normalRule">
                    <template v-slot:label>
                      <div class="text-subtitle-1 text-medium-emphasis">
                        {{ $t("auth.register.full_name") }}
                        <span class="text-red">*</span>
                      </div>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- Email text field -->
                <v-col cols="12">
                  <v-text-field v-model="email" type="email" prepend-inner-icon="mdi-email-outline" required
                    :rules="fieldRules.emailRules" variant="outlined">
                    <template v-slot:label>
                      <span>{{ $t("auth.email") }}</span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- Password text field -->
                <v-col cols="12">
                  <v-text-field v-model="password" prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="fieldRules.passwordRules"
                    :type="show ? 'text' : 'password'" name="input-10-1" :hint="$t('form.validation.password.hint')"
                    counter @click:append-inner="toggleShowPassword" @keyup.enter="signup" required variant="outlined">
                    <template v-slot:label>
                      <span>{{ $t("auth.password") }}</span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- Action button -->
                <v-col cols="12">
                  <div class="mb-5">
                    <v-btn :disabled="!valid" color="primary" block size="large" :loading="authStore.registrationLoading"
                      class="elevation-15" @click="signup">
                      <span class="black--text">{{ $t("auth.register.label") }}</span>
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12">
                  <p class="mb-4 text-center">{{ $t("auth.register.old_user") }}</p>
                  <div class="mb-5">
                    <v-btn block color="primary" size="large" variant="outlined" to="/">
                      <span class="black--text">{{ $t("auth.login") }}</span>
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
                        <v-list-item v-for="loc in availableLocales" :key="loc.code" @click="setLocale(loc.code)">
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
const fieldRules = useFieldRules();

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

const authStore = useAuthStore();

let show = ref(false);
let valid = ref(false);
let password = ref("Pass@1234");
let email = ref("admin@gmail.com");
let full_name = ref("Daniel");

const { locale, locales, setLocale, t } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const loginLoading = ref(false);
const { notify } = useNotification();

const signup = async () => {
  const payload = {
    full_name: full_name.value,
    email: email.value,
    password: password.value
  }
  await authStore.register(payload)
}

const toggleShowPassword = function () {
  show.value = !show.value;
};

</script>
