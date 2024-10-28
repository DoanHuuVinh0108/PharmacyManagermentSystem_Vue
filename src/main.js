import './assets/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './routers';
import store from './store'; // Import the Vuex store
import VueCookies from 'vue-cookies'; // Import vue-cookies
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

// Create the app instance and use VueCookies, Antd, router, and Vuex store
const app = createApp(App);

// Use vue-cookies
app.use(VueCookies);

// Optional: Set default config for vue-cookies (e.g., expire in 1 day)
app.$cookies.config('1d');

// Register other plugins
app.use(Antd)
   .use(router)
   .use(store)
   .use(VCalendar,{})
   .mount('#app');
