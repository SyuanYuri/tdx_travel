import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/scenicSpot',
    name: 'ScenicSpot',
    component: () => import('../views/ScenicSpot.vue'),
  },
  {
    path: '/stay',
    name: 'Stay',
    component: () => import('../views/Stay.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;