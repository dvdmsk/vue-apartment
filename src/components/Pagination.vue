<script setup lang="ts">
import { useApartmentStore } from "@/store/apartmentStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { computed, ref, toRefs, watch } from "vue";
import Apartment from "./Apartment.vue";
import { useRoute, useRouter } from "vue-router";

const store = useApartmentStore();
const router = useRouter();
const route = useRoute();
const { getApartments, getAvailableApartments } = toRefs(store);

const apartments = computed(() => getApartments.value());
const availableApartments = computed(() => getAvailableApartments.value());
const pages = ref([]);



watch(
  availableApartments,
  (newVal, oldVal) => {
    pages.value = Array.from(
      { length: Math.ceil(availableApartments.value.length / store.itemsPerPage) },
      (_, i) => i + 1
    );
  },
  { immediate: true }
);

watch(
  () => route.query.page,
  (newPage, oldPage) => {
    store.setPage(+route.query.page || 1);
  },
  { immediate: true }
);

const handleChangePage = (id: number) => {
  router.push({ query: { page: id } });
  store.setPage(id);
};
</script>

<template>
  <div class="grid lg:grid-cols-2 p-4 gap-5">
    <Apartment
      v-for="apartment in apartments"
      :key="apartment.id"
      :apartment="apartment"
    />
  </div>

  <div class="flex justify-center items-center py-8 px-4 sm:px-6 gap-2" v-if="pages.length > 1">
    <button
      :disabled="store.currentPage - 1 < 1"
      @click="handleChangePage(store.currentPage - 1)"
      class="
        p-2.5 rounded-lg
        text-gray-600 bg-gray-100
        hover:bg-gray-200 hover:text-gray-800
        disabled:opacity-50 disabled:pointer-events-none
        transition-colors duration-200 ease-in-out
        flex items-center justify-center
      "
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
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="handleChangePage(page)"
      class="
        min-w-[40px] h-10 px-3
        rounded-lg
        font-medium
        transition-colors duration-200 ease-in-out
        flex items-center justify-center
        whitespace-nowrap /* Запобігає переносу тексту */
      "
      :class="{
        'bg-yellow-500 text-gray-900 shadow-md hover:bg-yellow-600': page === store.currentPage,
        'bg-gray-100 text-gray-700 hover:bg-gray-200': page !== store.currentPage,
      }"
    >
      {{ page }}
    </button>

    <button
      :disabled="store.currentPage + 1 > pages.length"
      @click="handleChangePage(store.currentPage + 1)"
      class="
        p-2.5 rounded-lg
        text-gray-600 bg-gray-100
        hover:bg-gray-200 hover:text-gray-800
        disabled:opacity-50 disabled:pointer-events-none
        transition-colors duration-200 ease-in-out
        flex items-center justify-center
      "
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
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
</template>
