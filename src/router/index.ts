import { createRouter, createWebHistory } from 'vue-router';

import VHomeView from '@/views/VHomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:link?',
      name: 'home',
      component: VHomeView,
    },
  ],
});

export default router;
