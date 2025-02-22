<template>
  <v-container
    class="d-flex flex-column justify-center align-center"
    style="height: 100vh"
  >
    <v-icon size="120" class="mb-4">mdi-alert-circle-outline</v-icon>
    <h1>401</h1>
    <p>Unauthorized Access</p>
    <v-btn color="primary" @click="goHome">Go to Home</v-btn>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
h1 {
  font-size: 5rem;
  margin: 0;
}
p {
  font-size: 1.5rem;
  margin: 1rem 0;
}
</style>
