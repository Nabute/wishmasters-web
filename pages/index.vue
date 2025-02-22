<template>
  <v-container>
    <CommonEditorDialog
      ref="competitionEntryEditorDialog"
      :title="$t('game.join.form.editor_title')"
      m-width="400"
    >
      <template #body>
        <CompetitionJoinForm
          :key="renderer"
          :competition="selectedCompetition"
          @close="handleCompetitionEntryFormCloseEvent"
        />
      </template>
    </CommonEditorDialog>
    <CommonEditorDialog
      ref="scoreEntryEditorDialog"
      :title="$t('game.score.form.editor_title')"
      m-width="400"
    >
      <template #body>
        <CompetitionSubmitScoreForm
          :key="renderer"
          :competition="selectedCompetition"
          @close="handleScoreEntryFormCloseEvent"
        />
      </template>
    </CommonEditorDialog>
    <CommonEditorDialog
      :title="$t('game.leaderboard.dialog_title')"
      ref="leaderboardDialog"
      m-width="80%"
      items-per-page="5"
      :persistent="false"
    >
      <template #body>
        <CompetitionScoreboard
          :key="renderer"
          :competition="selectedCompetition"
          @close="handleCompetitionEntryFormCloseEvent"
        />
      </template>
    </CommonEditorDialog>
    <v-row>
      <v-col cols="12">
        <v-row class="justify-space-between">
          <div>
            <h2 class="text-h5 font-weight-bold text-black mb-2">{{ $t("welcome.title_short") }}</h2>
            <h3>{{ $t("welcome.description") }}</h3>
          </div>
          <div class="text-h2">🏆</div>
        </v-row>
        <!-- <v-text-field class="mt-8" prepend-inner-icon="mdi-magnify" variant="solo-filled"
          :label="$t('welcome.search_placeholder')"></v-text-field> -->
      </v-col>
      <!-- Items -->
      <v-col v-if="competitionStore.competitionLoading" v-for="i in 6" :key="i" cols="12" sm="6" md="3" lg="4">
        <v-skeleton-loader height="300" type="image, article"></v-skeleton-loader>
      </v-col>
      <template v-else>

        <v-col cols="12" sm="6" md="4" v-for="(competition, j) in competitionStore.competitionList"
        :key="j">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            
            <v-card
              v-bind="props"
              class="my-2" 
              flat
              :style="{
                backgroundImage: `url(https://picsum.photos/10/6?image=${j * 5 + 10})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden'
              }"
            >
              <div 
                :style="{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.8)'
                }"
              ></div>
    
              <v-card-item :style="{ position: 'relative', zIndex: 2 }">
                <v-card-title>
                  {{ competition.name }}
                </v-card-title>
    
                <v-card-subtitle :style="{ color: competition.type.remark }">
                  🏅 {{ competition.type.name }}
                </v-card-subtitle>
                <v-card-subtitle>
                  💰 ${{ competition.min_entry_fee }} - ${{ competition.max_entry_fee }}
                </v-card-subtitle>
                <CountdownTimer :endTime="competition.end_time" />
                <v-card-subtitle>
                  👥 {{ competition.total_players_joined }} / {{ competition.max_players }}
                </v-card-subtitle>
                <v-card-subtitle :class="competition.current_leader ? 'text-green' : 'text-warning'">
                  📈 {{
                    competition.current_leader 
                      ? $t("game.leader", { name: competition.current_leader.name, score: competition.current_leader.score })
                      : $t("game.no_scores_yet")
                  }}
                </v-card-subtitle>
              </v-card-item>
    
              <v-card-text class="text-grey" :style="{ position: 'relative', zIndex: 2 }">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </v-card-text>
    
              <v-card-actions :style="{ position: 'relative', zIndex: 2 }">
                <v-col class="pa-0">
                  <div v-if="competition.has_joined" class="w-full">
                    <v-btn v-if="competition.can_submit_score" block color="primary" @click="submitScore(competition)">
                      {{ $t("game.action.submit_score") }}
                    </v-btn>
                    <span v-else> 🎯 {{ $t("game.action.rank_message", { rank: competition.current_user_rank }) }} </span>
                  </div>
                  <v-btn v-else block variant="tonal" color="primary" @click="joinNow(competition)">
                    {{ $t("game.action.join_now") }}
                  </v-btn>
                  <v-btn block variant="flat" class="mt-2" color="primary" @click="openLeaderboards(competition)">
                    {{ $t("game.action.leaderboard") }}
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
        </v-col>
      </template>
      
    </v-row>
    <!-- <CommonPagination
            v-model="filters"
            :total="competitionStore.competitionPagination.total"
            :limit="competitionStore.competitionPagination?.limit ?? 10"
            :fetch-fn="refresh"
          /> -->
  </v-container>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { useCompetitionStore } from "@/stores/competition";

const mixins = useMixins();
const auth = useAuth();
const router = useRouter();
const competitionStore = useCompetitionStore();

const renderer = ref(0);
let competitionEntryEditorDialog = ref(null);
let scoreEntryEditorDialog = ref(null)
let leaderboardDialog = ref(null)
let selectedCompetition = ref({});

const fetchData = async (qp = {}) => {
  await competitionStore?.getAllCompetitions(mixins.cleanObject(qp));
};

onMounted(async () => {
  await fetchData();
});

const joinNow = function(competition) {
    if(!!auth.data?.value?.data?.result){
      renderer.value += 1;
      selectedCompetition.value = competition;
      competitionEntryEditorDialog.value.openModal();
    }else {
      router.push("/login")
    }
}

const openLeaderboards = function(competition) {
    renderer.value += 1;
    selectedCompetition.value = competition;
    leaderboardDialog.value.openModal();
}

const submitScore = function(competition) {
    renderer.value += 1;
    selectedCompetition.value = competition;
    scoreEntryEditorDialog.value.openModal();
}

const handleCompetitionEntryFormCloseEvent = function () {
  competitionEntryEditorDialog.value.closeModal();
  selectedCompetition.value = null;
};

const handleScoreEntryFormCloseEvent = function () {
  competitionEntryEditorDialog.value.closeModal();
  selectedCompetition.value = null;
};

</script>