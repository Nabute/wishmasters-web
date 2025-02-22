<template>
    <v-card color="background">
      <v-card-text>
        <v-form ref="competitionJoinEditorForm" v-model="valid" lazy-validation>
          <v-row>
            <!-- Information -->
            <v-col cols="12">
              <v-alert type="info" variant="tonal">
                {{ $t("game.join.form.description") }}
              </v-alert>
            </v-col>
  
            <v-col cols="12">
            <div class="text-subtitle-1 text-medium-emphasis">
              {{ $t("game.join.form.fields.entry_fee") }}
              <span class="text-red">*</span>
            </div>
            <v-number-input
              v-model="entry_fee"
              density="comfortable"
              flat
              rounded="lg"
              variant="solo"
              clearable
              required
              :placeholder="$t('game.join.form.fields.entry_fee_placeholder')"
              :rules="[
                ...fieldRules.positiveNoRules,
                (v) => (v >= parseFloat(competition.min_entry_fee)) || $t('game.join.form.fields.min_entry_rule', {amount: competition.min_entry_fee}),
                (v) => (v <= parseFloat(competition.max_entry_fee)) || $t('game.join.form.fields.max_entry_rule', {amount: competition.max_entry_fee}),
              ]"
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
                  :loading="competitionStore.competitionEntryLoading"
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
  
  const competitionJoinEditorForm = ref(null);
  let valid = ref(false);
  let entry_fee = ref(0);
  
  const submitForm = async () => {
    if (competitionJoinEditorForm.value.validate()) {
      let payload = {
        competition: props.competition.id,
        entry_fee: entry_fee.value
      };
      console.log("Joining...", payload)
      await competitionStore.joinCompetition(payload).then((_) => {
        emit("close");
      })
    }
  };
  </script>