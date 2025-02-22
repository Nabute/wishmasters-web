// import { useI18n } from 'vue-i18n';

const password_required_length = 8;
const earliest_car_manufacture_date = 1800;
const minimum_name_length = 3;

export const useFieldRules = () => {
  const { t } = useI18n();
  return {
    //@ts-ignore
    normalRule: [
      (v: string | number) => !!v || v === 0 || t("form.validation.required"),
    ],
    emailRules: [
      //@ts-ignore
      (v: string | number) => !!v || t("form.validation.email.required"),
      //@ts-ignore
      (v: string) => /.+@.+\..+/.test(v) || t("form.validation.email.valid"),
    ],
    passwordRules: [
      //@ts-ignore

      (v: string) => !!v || t("form.validation.password.required"),
      (v: string) =>
        //@ts-ignore
        (!!v && v.length >= password_required_length) ||
        t("form.validation.password.length", {
          minLength: password_required_length,
        }),
    ],
    phoneNoRules: [
      (v: string) => !!v || t("form.validation.phone.required"),
      (v: string) =>
        (!!v && v.length >= 10) ||
        t("form.validation.phone.length", {
          minLength: 10,
        }),
      (v: string) =>
        /^(?:\+2519|\+2511|\+2517|09|01|07)\d{8}$/.test(v) ||
        t("form.validation.phone.format"),
    ],
    urlRules: [
      (v: string) => !!v || t("form.validation.url.required"),
      (v: string) =>
        /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/i.test(
          v
        ) || t("form.validation.url.format"),
    ],
    latitudeRules: [
      (v: string) => !!v || t("form.validation.latitude.required"),
      (v: string) =>
        (!!v && parseFloat(v) >= -90 && parseFloat(v) <= 90) ||
        t("form.validation.latitude.valid"),
    ],
    longitudeRules: [
      (v: string) => !!v || t("form.validation.longitude.required"),
      (v: string) =>
        (!!v && parseFloat(v) >= -180 && parseFloat(v) <= 180) ||
        t("form.validation.longitude.valid"),
    ],
    positiveNoRules: [
      (v: string) => !!v || t("form.validation.positive.required"),
      (v: string) =>
        (!!v && parseFloat(v) >= 0) || t("form.validation.positive.valid"),
    ],
    carManufactureDateRules: [
      (v: string) => !!v || t("form.validation.manufacture_year.required"),
      (v: string) =>
        (!!v && parseInt(v) <= new Date().getFullYear()) ||
        t("form.validation.manufacture_year.invalid_future_date"),
      (v: string) =>
        (!!v && parseInt(v) > earliest_car_manufacture_date) ||
        t("form.validation.manufacture_year.invalid_past_date", {
          earliest_car_manufacture_date,
        }),
    ],
    nameRules: [
      (v: string) => !!v || t("form.validation.name.required"),
      (v: string) =>
        (!!v && v.length >= minimum_name_length) ||
        t("form.validation.name.length", {
          minLength: minimum_name_length,
        }),
    ],
  };
};
