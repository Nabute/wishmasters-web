export const useMixins = () => {
  const debounce = ref();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();
  const router = useRouter();

  const isObject = function (item: any) {
    return typeof item === "object" && item !== null && !Array.isArray(item);
  };

  const cleanObject = function (obj: any) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && isObject(obj[key])) cleanObject(obj[key]);
      else if (obj[key] == null) delete obj[key];
    });
    return obj;
  };

  const debounceInput = function (
    fn: Function,
    args = [] as any[],
    delay = 500
  ) {
    clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      fn(...args);
    }, delay);
    return debounce;
  };

  const copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(
      () => {
        $toast.success(`${decodeURIComponent(text)} has been copied`);
      },
      (err) => {
        $toast.error(`${decodeURIComponent(text)} failed to be copied.`);
      }
    );
  };

  const updateQueryParams = (newParams) => {
    const oldParams = router.currentRoute.value.query;
    const hasChanges = Object.keys(newParams).some(
      (key) => newParams[key] !== oldParams[key]
    );

    if (!hasChanges) return;

    const currentQuery = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(newParams)) {
      currentQuery.set(key, value);
    }
    history.pushState(
      {},
      null,
      `${window.location.pathname}?${currentQuery.toString()}`
    );
    // Update router instance for programmatic navigation (optional)
    router.currentRoute.value.query = Object.fromEntries(currentQuery);
  };

  function convertTimestampToFormattedDate(timestamp: string): string {
    const date = new Date(timestamp);

    date.setFullYear(date.getFullYear());

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return {
    isObject,
    cleanObject,
    debounceInput,
    copyToClipboard,
    updateQueryParams,
    convertTimestampToFormattedDate,
  };
};
