<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import maplibregl, { Map } from "maplibre-gl";
import { apartments } from "@/api/apartments";
import { useRouter } from "vue-router";
const router = useRouter();

const apiKey = "L85XOghOwSbPVDMKDrPj";

const mapContainer = shallowRef<HTMLElement | null>(null);
const map = shallowRef<Map | null>(null);

onMounted(() => {
  const initialCenter: [number, number] = [30.5234, 50.4501];

  map.value = markRaw(
    new maplibregl.Map({
      container: mapContainer.value,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: initialCenter,
      zoom: 12,
    })
  );

  map.value.on("load", () => {
    const markers = apartments;

    markers.forEach((apartment, index) => {
      const [lng, lat] = apartment.geometry.coordinates;

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `<p>${apartment.id}</p>`;

      el.addEventListener("click", () => {
        router.push(`/property/${apartment.id}`);
      });

      new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map.value!);
    });
  });
});

onUnmounted(() => {
  map.value?.remove();
});
</script>

<style >
@import "maplibre-gl/dist/maplibre-gl.css";

.map-wrap {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.custom-marker {
  width: 32px;
  height: 32px;
  background-color: #ff5722;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  user-select: none;
}


</style>
