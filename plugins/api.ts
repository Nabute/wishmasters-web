//@ts-ignore
import { $fetch, FetchOptions } from "ofetch";

import DataLookupModule from "@/repository/modules/lookupData";
import SystemSettingsModule from "~/repository/modules/systemSetting";
import AuthModule from "~/repository/modules/auth";
import CompetitionModule from "~/repository/modules/competition";

interface ApiInstance {
  auth: AuthModule;
  competition: CompetitionModule;
  core: {
    lookupData: DataLookupModule;
    systemSetting?: SystemSettingsModule;
  };
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.baseUrl,
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const modules: ApiInstance = {
    auth: new AuthModule(apiFetcher),
    competition: new CompetitionModule(apiFetcher),
    core: {
      lookupData: new DataLookupModule(apiFetcher),
      systemSetting: new SystemSettingsModule(apiFetcher),
    }
  };

  return {
    provide: {
      api: modules,
    },
  };
});
