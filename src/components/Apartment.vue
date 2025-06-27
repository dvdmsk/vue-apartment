<script setup lang="ts">
import { toRefs } from "vue";
import { Apartment } from "./../types/apartment";

const props = defineProps<{ apartment: Apartment }>();

const { name, location, price, id } = toRefs(props.apartment);
</script>

<template>
  <RouterLink :to="`/property/${id}`" class="
    flex flex-col sm:flex-row items-center sm:items-start
    bg-gradient-to-br from-yellow-50 to-yellow-100
    hover:from-yellow-100 hover:to-yellow-200
    p-4 rounded-2xl
    shadow-lg hover:shadow-xl
    transition-all duration-300 ease-in-out
    overflow-hidden
    gap-6 sm:gap-8
  ">
    <img
      class="
        w-full sm:w-24 h-40 sm:h-auto
        object-cover rounded-xl
        shadow-md
        flex-shrink-0
      "
      src="./../assets/img/room.jpg"
      alt="Зображення помешкання"
    />

    <div class="flex-grow grid gap-3 text-gray-800 w-full sm:w-auto">
      <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1">
        <p class="font-semibold text-blue-700 text-lg">Назва:</p>
        <p class="text-xl font-bold text-gray-900">{{ name }}</p>

        <p class="font-semibold text-blue-700">Локація:</p>
        <p class="text-lg">{{ location }}</p>

        <p class="font-semibold text-blue-700 text-lg">Ціна:</p>
        <p class="text-2xl font-extrabold text-green-600">{{ price }} ₴</p>
      </div>
    </div>
  </RouterLink>
</template>
