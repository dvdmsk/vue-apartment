import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Property from "../pages/Property.vue";
import Map from "../pages/Map.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/property/:id", component: Property },
  { path: "/map", component: Map },
];

const router = createRouter({
  history: createWebHashHistory("/vue-apartment/"),
  routes,
});

export default router;
