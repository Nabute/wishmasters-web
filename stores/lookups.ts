import { defineStore } from 'pinia';
import { DataLookup, DataLookupTypes, Metadata } from '../repository/types';

export const useDataLookupStore = defineStore('lookup', () => {
	const { $api } = useNuxtApp();

	let lookupLoading = ref(false);
	let dataLookupList = ref<DataLookup[]>([]);
	let lookupPagination = ref<Metadata>({});

	function toggleLookupLoading(flag = true) {
		lookupLoading.value = flag;
	}

	async function getAllDataLookups(queryparams = { limit: 0 }) {
		toggleLookupLoading();
		dataLookupList.value = [];
		await $api.core.lookupData
			.getAll(queryparams)
			.then((resp) => {
				dataLookupList.value = resp.results as Array<DataLookup>;
				lookupPagination.value = resp.metadata as Metadata;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				toggleLookupLoading(false);
			});
	}

	function getLookupsByType(type: DataLookupTypes) {
		return dataLookupList.value.filter((lookup) => lookup.type === type);
	}

	function getLookupsByValue(value: string) {
		return dataLookupList.value.find((lookup) => lookup.value === value);
	}

	return {
		lookupLoading,
		dataLookupList,
		lookupPagination,
		getAllDataLookups,
		getLookupsByType,
		getLookupsByValue,
	};
});
