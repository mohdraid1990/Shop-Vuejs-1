import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import { createMetaManager } from "vue-meta";

const app = createApp(App);
const pinia = createPinia();
const metaManager = createMetaManager();

app.use(pinia);
app.use(router);
app.use(metaManager);

app.mount("#app");

AOS.init();
