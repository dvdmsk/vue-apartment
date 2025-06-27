<script setup lang="ts">
import { useApartmentStore } from "@/store/apartmentStore";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const apartmentStore = useApartmentStore();
const property = ref(null);

watchEffect(() => {
  const propertyId = route.params.id;
  property.value = apartmentStore.getPropertyById(propertyId);

});
</script>

<template>
  <div class="
    container mx-auto p-4 sm:p-6 lg:p-8
    bg-white rounded-xl shadow-2xl
    flex flex-col lg:flex-row gap-8 lg:gap-10
    max-w-6xl my-8
  ">
    <div class="
      lg:w-2/3
      flex justify-center items-start
      relative overflow-hidden rounded-xl shadow-xl
    ">
      <img
        class="
          w-full h-auto max-h-[500px] object-cover
          rounded-xl transform transition-transform duration-500 hover:scale-105
        "
        src="./../assets/img/room.jpg"
        alt="Зображення помешкання"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent"></div>
    </div>

    <div class="
      lg:w-1/3
      flex flex-col justify-between
      p-4 sm:p-6
      bg-yellow-50 rounded-lg shadow-inner
    ">
      <div class="grid gap-4 text-gray-800">
        <div class="border-b pb-3 border-yellow-200">
          <p class="text-xs uppercase font-semibold text-yellow-700 mb-1">Назва</p>
          <p class="text-3xl font-extrabold text-gray-900">{{ property.name }}</p>
        </div>

        <div class="border-b pb-3 border-yellow-200">
          <p class="text-xs uppercase font-semibold text-yellow-700 mb-1">Опис</p>
          <p class="text-base leading-relaxed text-gray-700">{{ property.description }}</p>
        </div>

        <div class="border-b pb-3 border-yellow-200">
          <p class="text-xs uppercase font-semibold text-yellow-700 mb-1">Ціна</p>
          <p class="text-4xl font-black text-green-600 tracking-tight">{{ property.price }} ₴</p>
        </div>

        <div>
          <p class="text-xs uppercase font-semibold text-yellow-700 mb-1">Адреса</p>
          <p class="text-lg text-gray-700 font-medium">{{ property.location }}</p>
        </div>
      </div>

      <div class="mt-8">
        <button class="
          w-full px-6 py-3
          bg-yellow-500 text-gray-900 font-bold text-lg
          rounded-lg shadow-md
          hover:bg-yellow-600 hover:shadow-lg
          transition-all duration-300 ease-in-out
        ">
          Зв'язатися з власником
        </button>
      </div>
    </div>
  </div>
</template>