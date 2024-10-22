import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './routers';



createApp(App).use(Antd).use(router).mount('#app')
