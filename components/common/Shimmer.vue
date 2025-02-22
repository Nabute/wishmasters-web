<template>
  <div role="status" :class="containerClass">
    <div
      v-if="props.type === ShimmerType.ArticleCard"
      class="lg:w-[300px] w-full lg:h-auto h-[128px] max-lg:items-center max-lg:justify-between flex lg:flex-col max-lg:flex-row max-lg:gap-2 p-4 mx-auto bg-white border rounded-md shadow-md"
    >
      <!-- Image Container with Shimmer -->
      <div
        class="lg:w-full max-lg:w-24 max-[426px]:w-16 max-[426px]:h-16 lg:h-48 h-24 bg-[#0c260f] lg:rounded-md rounded-full animate-pulse"
      ></div>

      <!-- Title with Shimmer -->
      <div
        class="w-3/4 h-6 mt-4 bg-[#0c260f] hidden lg:block rounded-md animate-pulse"
      ></div>

      <!-- Stars and Reviews with Shimmer -->
      <div class="items-center hidden mt-2 lg:flex">
        <div class="w-1/5 h-4 bg-[#0c260f] rounded-md animate-pulse"></div>
        <div
          class="w-1/4 h-4 ml-2 bg-[#0c260f] hidden lg:block rounded-md animate-pulse"
        ></div>
      </div>

      <!-- Description with Shimmer -->
      <div
        class="w-full h-4 mt-4 bg-[#0c260f] hidden lg:block rounded-md animate-pulse"
      ></div>

      <!-- Price with Shimmer -->
      <div
        class="w-1/4 h-6 mt-4 bg-[#0c260f] hidden lg:block rounded-md animate-pulse"
      ></div>

      <!-- Button with Shimmer -->
      <div
        class="w-1/2 h-10 mt-4 bg-[#0c260f] hidden lg:block rounded-md animate-pulse"
      ></div>

      <!-- Side display for mobile devices -->

      <div
        class="md:w-[75vw] max-[426px]:w-[60vw] space-y-2 h-full lg:hidden flex flex-col items-start justify-center"
      >
        <div
          class="w-[50vw] max-[426px]:w-[30vw] h-10 max-[426px]:h-4 lg:mt-4 max-lg:mt-0 bg-[#0c260f] rounded-md animate-pulse"
        ></div>
        <div
          class="w-[60vw] max-[426px]:w-[40vw] h-5 max-[426px]:h-3 lg:mt-4 max-lg:mt-0 bg-[#0c260f] rounded-md animate-pulse"
        ></div>
        <div
          class="w-full h-5 max-[426px]:h-3 lg:mt-4 max-lg:mt-0 bg-[#0c260f] rounded-md animate-pulse"
        ></div>
      </div>
    </div>

    <div
      class="w-full space-y-6"
      v-if="props.type === ShimmerType.FormResponse"
    >
      <div class="flex items-center justify-between w-full">
        <div
          class="w-[150px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
        <div
          class="w-[250px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div
          class="w-[150px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
        <div
          class="w-[250px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div
          class="w-[150px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
        <div
          class="w-[250px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div
          class="w-[150px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
        <div
          class="w-[250px] h-[35px] rounded-lg bg-neutral-300 animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

enum ShimmerType {
  ArticleCard = "article_card",
  FormResponse = "form_response",
}

const props = defineProps<{ type: ShimmerType }>();

const containerClass = computed(() => ({
  "space-y-8 w-full animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center":
    true,
}));
</script>

<style scoped>
/* Add any additional styles here if necessary */
</style>
