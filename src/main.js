import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from './plugins/i18n'
import "bootstrap";
import "./assets/bootstrap/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.mount("#app");
// createApp(App).use(router).use(StarRating).use(createPinia()).mount("#app");
