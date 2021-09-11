import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/Login.vue';
import Store from '@/store';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/comments',
    name: 'Comments',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Comments.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Store.getters.isAuthenticated) {
      return next();
    }
    next('/');
  } else {
    next();
  }
});

export default router;
