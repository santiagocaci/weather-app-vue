import { createApp } from 'vue';
import router from '@/routes/route.js';
import './style.css';
import App from './App.vue';

createApp(App).use(router).mount('#app');
