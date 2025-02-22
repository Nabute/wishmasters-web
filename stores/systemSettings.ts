import { defineStore } from "pinia";
import type {
  Metadata,
  SystemSetting,
  SystemSettingDto,
} from "../repository/types";

export const useSystemSettingStore = defineStore("system_settings", () => {
  const { $api } = useNuxtApp();
  const { notify } = useNotification();
  const { t } = useI18n();

  let systemSettingLoading = ref(false);
  let systemSettingBottonLoading = ref(false);
  let systemSettingResetButtonLoading = ref(false);
  let systemSettingList = ref<SystemSetting[]>([]);
  let systemSettingPagination = ref<Metadata>({});

  function toggleSystemSettingLoading(flag = true) {
    systemSettingLoading.value = flag;
  }

  function toggleSystemSettingBottonLoading(flag = true) {
    systemSettingBottonLoading.value = flag;
  }

  function toggleSystemSettingResetButtonLoading(flag = true) {
    systemSettingResetButtonLoading.value = flag;
  }

  async function getSystemSettings(queryParams = {}) {
    toggleSystemSettingLoading();
    systemSettingList.value = [];
    await $api.core.systemSetting
      .getAll(queryParams)
      .then((resp) => {
        let data = resp.data.value.data;
        systemSettingList.value = data.results as SystemSetting[];
        systemSettingPagination.value = data.metadata as Metadata;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        toggleSystemSettingLoading(false);
      });
  }

  async function addSystemSetting(payload: SystemSettingDto) {
    toggleSystemSettingBottonLoading();
    await $api.core.systemSetting
      .create(payload)
      .then((resp) => {
        notify({
          title: "",
          text: t("form.confirmation.system_setting_added"),
          type: "success",
        });
      })
      .catch((error: Error) => {
        notify({
          title: t("form.error.system_setting_not_added"),
          text: `${error.message}`,
          type: "error",
        });
      })
      .finally(() => {
        toggleSystemSettingBottonLoading(false);
      });
  }

  async function updateSystemSetting(id: string, payload: SystemSettingDto) {
    toggleSystemSettingBottonLoading();
    await $api.core.systemSetting
      .update(id, payload)
      .then((resp) => {
        notify({
          title: "",
          text: t("form.confirmation.system_setting_updated"),
          type: "success",
        });
      })
      .catch((error: Error) => {
        notify({
          title: t("form.error.system_setting_not_updated"),
          text: `${error.message}`,
          type: "error",
        });
      })
      .finally(() => {
        toggleSystemSettingBottonLoading(false);
      });
  }

  async function resetSystemSetting(id: string) {
    toggleSystemSettingResetButtonLoading();
    await $api.core.systemSetting
      .reset(id)
      .then((resp) => {
        getSystemSettings();
        notify({
          title: "",
          text: t("form.confirmation.system_setting_reset"),
          type: "success",
        });
      })
      .catch((error: Error) => {
        notify({
          title: t("form.error.system_setting_not_reset"),
          text: `${error.message}`,
          type: "error",
        });
      })
      .finally(() => {
        toggleSystemSettingResetButtonLoading(false);
      });
  }

  return {
    systemSettingList,
    systemSettingPagination,
    systemSettingLoading,
    systemSettingBottonLoading,
    systemSettingResetButtonLoading,
    getSystemSettings,
    addSystemSetting,
    updateSystemSetting,
    resetSystemSetting,
  };
});
