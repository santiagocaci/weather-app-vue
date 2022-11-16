import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/:pathMatch(.*)*', component: HomePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
