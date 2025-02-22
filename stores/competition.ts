import { defineStore } from 'pinia';
import { Metadata, Competition, CompetitionEntryDto, CompetitionEntry, LeaderBoard } from '../repository/types';

export const useCompetitionStore = defineStore('competition', () => {
  const { t } = useI18n();
    const { $api } = useNuxtApp();
    const { notify } = useNotification();

    let competitionLoading = ref(false);
    let competitionList = ref<Competition[]>([]);
    let competitionPagination = ref<Metadata>({});

    function toggleCompetitionLoading(flag = true) {
        competitionLoading.value = flag;
    }

    async function getAllCompetitions(queryparams = {}) {
        toggleCompetitionLoading();
        competitionList.value = [];
        await $api.competition.getAll(queryparams)
            .then((resp) => {
                competitionList.value = resp.data.results as Array<Competition>;
                competitionPagination.value = resp.data.metadata as Metadata;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                toggleCompetitionLoading(false);
            });
    }

    let competitionEntryLoading = ref(false);

    function toggleCompetitionEntryLoading(flag = true) {
        competitionEntryLoading.value = flag;
    }

    async function joinCompetition({competition, entry_fee}: CompetitionEntryDto) {
        toggleCompetitionEntryLoading();
        await $api.competition
          .join(competition, entry_fee)
          .then((resp) => {
            notify({
              title: t("game.join.form.editor_title"),
              text: t("form.confirmation.competition_joined"),
              type: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            notify({
              title: t("form.error.competition_not_joined"),
              text: error.message,
              type: "error",
            });
          })
          .finally(() => {
            toggleCompetitionEntryLoading(false);
          });
      }

      let scoreSubmissionLoading = ref(false);

      function toggleScoreSubmissionLoading(flag = true) {
          scoreSubmissionLoading.value = flag;
      }

      async function submitScore({competition, score}: CompetitionEntryDto) {
        toggleScoreSubmissionLoading();
        await $api.competition
          .submitScore(competition, score)
          .then((resp) => {
            notify({
              title: t("game.score.form.editor_title"),
              text: t("form.confirmation.score_submitted"),
              type: "success",
            });
          })
          .catch((error) => {
            console.error(error);
            notify({
              title: t("form.error.score_not_submitted"),
              text: error.message,
              type: "error",
            });
          })
          .finally(() => {
            toggleScoreSubmissionLoading(false);
          });
      }

      // Leaderboard content
      let leaderboardLoading = ref(false);
      let leaderboardList = ref<LeaderBoard[]>([]);
      let leaderboardPagination = ref<Metadata>({});

      function toggleLeaderboardLoading(flag = true) {
        leaderboardLoading.value = flag;
      }

      async function getLeaderboardData(competitionId: string) {
        toggleLeaderboardLoading();
        leaderboardList.value = [];
        await $api.competition.getLeaders(competitionId)
            .then((resp) => {
              leaderboardList.value = resp.data.results as Array<LeaderBoard>;
              leaderboardPagination.value = resp.data.metadata as Metadata;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
              toggleLeaderboardLoading(false);
            });
    }

    return {
        competitionLoading,
        competitionList,
        competitionPagination,
        getAllCompetitions,
        //
        competitionEntryLoading,
        joinCompetition,
        //
        scoreSubmissionLoading,
        submitScore,
        //
        leaderboardLoading,
        leaderboardList,
        leaderboardPagination,
        getLeaderboardData
    };
});
