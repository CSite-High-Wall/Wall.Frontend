import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Message } from '@arco-design/web-vue';

import App from './App.vue'
import router from './router'

import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import './style.css'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
const pinia = createPinia()

Message._context = app._context;

app.use(router)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon);

app.mount('#app')
