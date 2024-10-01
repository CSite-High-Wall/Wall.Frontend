import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import { Message } from "@arco-design/web-vue";

import App from "./App.vue";
import router from "./router";

import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import "./style.css";
import "@arco-design/web-vue/dist/arco.css";
import {
  ClearUserInfo,
  RefreshUserInfo,
  useAuthStore,
} from "./stores/auth";
import { Validate } from "./api";
import cookie from "./cookie";

const app = createApp(App);
const pinia = createPinia();

Message._context = app._context;

app.use(router);
app.use(pinia);
app.use(ArcoVue);
app.use(ArcoVueIcon);

const authStore = useAuthStore();

var token = cookie.getCookie("token");
var tokenVaild = await Validate();

authStore.setAuthState(tokenVaild);

if (tokenVaild) await RefreshUserInfo();
else ClearUserInfo();

if (token != "" && !tokenVaild) {
  Message.info("登录已失效");
  router.push("/login");
}

app.mount("#app");
