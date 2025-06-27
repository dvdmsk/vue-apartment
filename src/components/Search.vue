<script setup lang="ts">
import { useApartmentStore } from "@/store/apartmentStore";
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const value = ref("");
const store = useApartmentStore();

if (route.query.query) {
  value.value = String(route.query.query);
}

const error = ref("");

watch(
  () => value.value,
  (newQuery, oldQuery) => {
    const currentQuery = { ...route.query };

    if (value.value === "") {
      delete currentQuery.query;
    } else {
      router.push({ query: { page: 1 } });
      currentQuery.query = value.value;
    }

    router.push({ query: { query: currentQuery.query, page: 1 } });
    store.setQuery(
      Array.isArray(currentQuery.query)
        ? currentQuery.query[0] ?? ""
        : currentQuery.query ?? ""
    );
    store.setPage(1);

    const trimmed = newQuery.trim();

    const isValid = /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9\s\-']{0,100}$/.test(trimmed);

    if (!isValid) {
      error.value =
        "Можна вводити лише літери, цифри та пробіли (до 100 символів)";
      return;
    } else {
      error.value = "";
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="relative flex items-center w-full max-w-xs sm:max-w-sm m-auto py-10"
    
  >
    <div
      class="absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 h-full text-gray-400 pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="size-5 sm:size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>

    <input
      type="text"
      placeholder="Шукати помешкання..."
      class="flex-grow pl-12 pr-4 py-2 sm:py-2.5 text-gray-800 text-base sm:text-lg rounded-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-outF focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 w-full"
      :class="{'border-red-500 border-2 outline-red-500 outline-2 focus:outline-red-500' : error !== ''}"
      v-model="value"
    />
  </div>
  <p v-if="error !== ''" class="text-red-500 -mt-10 text-sm text-center">{{ error }}</p>
</template>
