<template>
    <v-container fluid class="bg-white">
        <!-- <v-row>
            <v-col>
                <h2></h2>
            </v-col>
            <v-col></v-col>
        </v-row> -->
        <v-card variant="tonal">
            <v-card-item>
          <v-card-title class="font-weight-bold text-h4">{{competition.name}}</v-card-title>

          <v-card-subtitle class="text-grey">
                🗓 {{ $t("game.dates.start") }}: {{ formatDateTimeFriendly(competition.start_time) }}  
            </v-card-subtitle>
            <v-card-subtitle class="text-grey">
                ⏳ {{ $t("game.dates.end") }}: {{ competition.end_time ? formatDateTimeFriendly(competition.end_time) : $t("game.dates.no_end") }}
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <v-row class="my-auto">
                <v-chip
                    class="ma-2"
                    :color="competition.type.remark"
                    label
                    >
                    <v-icon left class="mr-3">mdi-medal</v-icon>
                    {{competition.type.name}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    :color="competition.ranking_method.remark"
                    label
                    >
                    <v-icon left class="mr-3">mdi-podium</v-icon>
                    {{ $t("game.leaderboard.score_type", {type: competition.ranking_method.name})}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    :color="competition.tiebreaker_rule.remark"
                    label
                    >
                    <v-icon left class="mr-3">mdi-scale-balance</v-icon>
                    {{ $t("game.leaderboard.tiebreaker_rule", {rule: competition.tiebreaker_rule.name})}}
                </v-chip>
            </v-row>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!
        </v-card-text>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="competitionStore.leaderboardList"
            :loading="competitionStore.leaderboardLoading"
            density="comfortable"
            class="mt-4">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="font-weight-bold">{{$t("game.leaderboard.title")}}</v-toolbar-title>
                    <v-btn
                    icon
                    color="secondary"
                    v-bind="attrs"
                    class="mx-4"
                    v-on="on"
                    @click="fetchData"
                    >
                    <v-icon color="secondary" dark> mdi-refresh </v-icon>
                    <v-tooltip activator="parent" location="top"
                        ><span>{{ $t("common.action.reload") }}</span></v-tooltip
                    >
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:no-data>
                <v-alert :text="$t('no_data_available')" type="warning" variant="tonal"></v-alert>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const { formatDateTimeFriendly } = useFormatDate();
const competitionStore = useCompetitionStore();
const { t } = useI18n();
  
const props = defineProps({
    competition: {
        type: Object,
        default: null,
    }
});

const headers = ref([
  { title: t("game.leaderboard.headers.rank"), key: "rank", align: "start", sortable: true },
  { title: t("game.leaderboard.headers.player_id"), key: "player_id", align: "start", sortable: false },
  { title: t("game.leaderboard.headers.player_name"), key: "player_name", align: "start", sortable: true },
  { title: t("game.leaderboard.headers.highest_score"), key: "highest_score", align: "center", sortable: true },
  { title: t("game.leaderboard.headers.total_entries"), key: "total_entries", align: "center", sortable: true },
]);

const fetchData = async () => {
    await competitionStore.getLeaderboardData(props.competition.id)
}

onMounted(async () => {
    await fetchData();
})


</script>