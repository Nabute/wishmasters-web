<template>
    <v-card color="background">
      <v-card-text>
        <v-form ref="submitScoreEditorForm" v-model="valid" lazy-validation>
          <v-row>
            <!-- Information -->
            <v-col cols="12">
              <v-alert type="info" variant="tonal">
                {{ $t("game.score.form.description") }}
              </v-alert>
            </v-col>
  
            <v-col cols="12">
            <div class="text-subtitle-1 text-medium-emphasis">
              {{ $t("game.score.form.fields.score_input") }}
              <span class="text-red">*</span>
            </div>
            <v-number-input
              v-model="score"
              density="comfortable"
              flat
              rounded="lg"
              variant="solo"
              clearable
              required
              :placeholder="$t('game.score.form.fields.score_placeholder')"
              :rules="fieldRules.positiveNoRules"
              control-variant="stacked"
            >
            </v-number-input>
          </v-col>
  
            <!-- Actions -->
            <v-col cols="12">
              <v-row class="align-center justify-end ma-auto">
                <v-btn
                  size="large"
                  color="primary"
                  rounded="lg"
                  variant="flat"
                  :disabled="!valid"
                  :loading="competitionStore.scoreSubmissionLoading"
                  @click="submitForm"
                  >{{ $t("common.action.submit") }}
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  
  const props = defineProps({
    competition: {
      type: Object,
      default: null,
    }
  });
  
  const emit = defineEmits(["close"]);
  
  const mixins = useMixins();
  const fieldRules = useFieldRules();
  const competitionStore = useCompetitionStore();
  
  const submitScoreEditorForm = ref(null);
  let valid = ref(false);
  let score = ref(0);
  
  const submitForm = async () => {
    if (submitScoreEditorForm.value.validate()) {
      let payload = {
        competition: props.competition.id,
        score: score.value
      };
      await competitionStore.submitScore(payload).then((_) => {
        emit("close");
      })
    }
  };
  </script>