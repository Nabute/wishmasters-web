<template>
    <v-app-bar app flat>
        <v-toolbar-title class="text-h6 font-weight-bold">
            <div>
                {{ $t("app_title") }}
            </div>
        </v-toolbar-title>
        <v-list>
            <v-list-item v-if="isAuthenticated">
                <template v-slot:prepend>
                    <v-avatar color="primary" size="50">
                        <span class="text-h6">{{ getInitials(user?.full_name) }}</span>
                    </v-avatar>
                </template>
                <v-list-item-title class="font-weight-black" v-text="user?.full_name"></v-list-item-title>
                <v-list-item-subtitle v-text="user?.email"></v-list-item-subtitle>
                <v-list-item-subheader class="ma-0 pa-0">
                    <span class="text-caption ma-0 pa-0">{{ user?.role?.name }}</span>
                </v-list-item-subheader>

                <template v-slot:append>
                    <v-menu transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" size="large" variant="text" icon="mdi-chevron-down"></v-btn>
                        </template>
                        <v-list class="ma-0 pa-0">
                            <v-list-item @click="logout">
                                <v-list-item-title>
                                    {{ t("auth.logout") }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-list-item>
            <v-btn v-else class="text-none text-subtitle-2" color="primary" size="small" variant="flat" to="/login">{{$t("auth.login")}}</v-btn>
        </v-list>
        <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
                <v-btn color="background" icon v-bind="props">
                    <span class="text-weight-bold text-primary">{{ locale }}</span>
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
    </v-app-bar>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
// Language menu
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
    return locales.value.filter((i) => i.code !== locale.value);
});

const route = useRoute();

const { t } = useI18n();
const auth = useAuth();
const renderer = ref(0);
const changePasswordEditorDialog = ref(null);
const config = useRuntimeConfig();

const user = auth.data?.value?.data?.result;
const isAuthenticated = computed(() => {
    return !!user
})

const isApiEnvProduction = computed(
    () =>
        config.public?.apiEnvName?.toLowerCase() === "prod" ||
        config.public?.apiEnvName?.toLowerCase() === "production"
);


const rail = ref(false);
const drawer = ref(true);

const { getAllDataLookups } = useDataLookupStore();

const logout = function () {
    auth.signOut({ external: true, callbackUrl: "/" });
};

console.log("ERROR :: ", !!auth.data.value)

const getInitials = function (fullName) {
    const words = fullName.trim().split(/\s+/);
    const initials = words
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2);
    return initials.join("");
};

</script>

<style>
.inverted {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}

.v-list-item--active {
    color: #006aff;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.drawer::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.drawer {
    position: fixed !important;
    top: 0;
    left: 0;
    overflow-y: scroll !important;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>