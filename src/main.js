import { createApp } from "vue";
import ElementPlus from 'element-plus'
import App from "./App.vue";
import router from "./router/router.js";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.mount("#app");