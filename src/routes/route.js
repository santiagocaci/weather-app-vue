import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CityPage from '@/pages/CityPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/weather/:state/:city', name: 'cityPage', component: CityPage },
  { path: '/:pathMatch(.*)*', component: HomePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;