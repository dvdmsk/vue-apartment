<script setup>
import { storeToRefs } from 'pinia';
import { useApartmentStore } from './store/apartmentStore';
import HeaderMenu from './components/HeaderMenu.vue';

const store = useApartmentStore()

</script>

<template>
  <HeaderMenu />

  <main class="mt-[48px]">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
