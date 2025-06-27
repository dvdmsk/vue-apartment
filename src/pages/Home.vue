<script setup>
import Apartment from '@/components/Apartment.vue';
import Pagination from '@/components/Pagination.vue';
import Search from '@/components/Search.vue';
import { useApartmentStore } from '@/store/apartmentStore';

const store = useApartmentStore();

</script>

<template>
  <div>
    <Search />
    
    <Pagination />
  </div>
  
</template>