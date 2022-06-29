import { createApp } from "vue";
import App from "./App.vue";
import lib from "../lib/entry";
import "uno.css";
createApp(App).use(lib).mount("#app");
