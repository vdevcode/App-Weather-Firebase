import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import tailWind from "../dist/output.css";

createApp(App).use(router).use(tailWind).mount("#app");
