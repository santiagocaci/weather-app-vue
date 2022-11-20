import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CityPage from '@/pages/CityPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Home' } },
  {
    path: '/weather/:state/:city',
    name: 'cityPage',
    component: CityPage,
    meta: { title: 'Weather' },
  },
  {
    path: '/linkedin',
    beforeEnter() {
      window.location.href = 'https://linkedin/in/santiagocaci';
    },
  },
  { path: '/:pathMatch(.*)*', component: HomePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  }`;
  next();
});

export default router;
