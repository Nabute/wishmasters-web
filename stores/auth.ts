import { defineStore } from 'pinia'
import type { RegistrationDto } from '~/repository/types';

export const useAuthStore = defineStore('auth', () => {
  const loginLoading = ref(false);
  const errorMessage = ref("");
  const { $api } = useNuxtApp();
  const { notify } = useNotification();
  const router = useRouter();

  let registrationLoading = ref(false);

  function toggleRegistrationLoading(flag = true) {
    registrationLoading.value = flag;
  }

  async function register(payload: RegistrationDto) {
    toggleRegistrationLoading();
    await $api.auth.register(payload)
      .then((resp) => {
        notify({
          text: resp.value.data.result.success,
          type: "success",
        });
        router.replace("/")
      })
      .catch((error) => {
        notify({
          text: error.message,
          type: "error",
        });
      })
      .finally(() => {
        toggleRegistrationLoading(false);
      });
  }

  return { registrationLoading, errorMessage, register }
})