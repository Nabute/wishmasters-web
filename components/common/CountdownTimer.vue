<script setup>
import { computed } from "vue";
import { useCountdown } from "@vueuse/core";

const props = defineProps({
  endTime: String,
});

const endTimestamp = new Date(props.endTime).getTime();
const now = new Date().getTime();
const { count, isActive } = useCountdown({
  seconds: Math.max(0, Math.floor((endTimestamp - now) / 1000)),
});

const countdownText = computed(() => {
  if (!isActive.value) return "🚀 Competition has ended!";

  const days = Math.floor(count.value / (60 * 60 * 24));
  const hours = Math.floor((count.value % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((count.value % (60 * 60)) / 60);
  const seconds = count.value % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});
</script>

<template>
  <div>
    <span v-if="isActive" class="countdown-text">⏳ {{ countdownText }}</span>
    <span v-else class="countdown-ended">🚀 Competition has ended!</span>
  </div>
</template>

<style scoped>
.countdown-text {
  font-weight: bold;
  color: #ff4500;
}
.countdown-ended {
  font-weight: bold;
  color: #888;
}
</style>
