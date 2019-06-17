import Vue from 'vue';
import Router from 'vue-router';
import { sharedSerivce, storageService } from '@/_services';
import { CONSTANT } from './constant';

const Login = () => import('../anonymous/login.vue');
const Register = () => import('../anonymous/register.vue');
const Home = () => import('../authenticated/Home.vue');

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', redirect: '/home',
    },
    {
      path: '/home', component: Home,
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = storageService.getData(CONSTANT.USER);

  if (authRequired && !loggedIn) {
    return next(CONSTANT.URL_LOGIN);
  } else if (loggedIn && !authRequired) {
    return next(CONSTANT.URL_HOME);
  }

  next();
});
