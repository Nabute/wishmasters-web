import { defineStore } from "pinia";
import type {
    DataLookup,
    Metadata,
} from "@/repository/types";

export const useCoreStore = defineStore("core", () => {
    const { $api } = useNuxtApp();
    //   Lookup Data Variables
    let lookupLoading = ref(false);
    let dataLookupList = ref<DataLookup[]>([]);
    let lookupPagination = ref<Metadata>({});

    function toggleLookupLoading(flag = true) {
        lookupLoading.value = flag;
    }

    async function getDataLookup(queryparams = {}) {
        toggleLookupLoading();
        return await $api.core.lookupData
            .getAll(queryparams)
            .then((resp) => {
                let data = resp.data.value.data;
                dataLookupList.value = data.results as Array<DataLookup>;
                lookupPagination.value = data.metadata as Metadata;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                toggleLookupLoading(false);
            });
    }

    return {
        lookupLoading,
        dataLookupList,
        lookupPagination,
        getDataLookup,
    };
});
