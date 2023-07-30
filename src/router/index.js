import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/addCity.vue";
import WeatherView from "../views/weatherCity.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/weather/:city",
    name: "weather",
    component: WeatherView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
