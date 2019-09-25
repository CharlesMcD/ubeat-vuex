import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'js-cookie';
import Home from '@/components/Home';
import SelectedAlbum from '@/components/SelectedAlbum';
import Artist from '@/components/Artist';
import Search from '@/components/Search';
import Playlists from '@/components/Playlists';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import User from '@/components/User';
import store from '../store/store';
import * as types from '../store/types';
import { TOKEN_KEY } from '../store/modules/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist,
      props: true,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/album/:id',
      name: 'SelectedAlbum',
      component: SelectedAlbum,
      props: true,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      props: route => ({ redirect: route.query.redirect, errorMessage: route.query.errorMsg })
    }, {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '*',
      redirect: '/',
      component: Playlists
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookie.get(TOKEN_KEY);
  if (!isAuthenticated && to.path === '/login') {
    store.commit(`auth/${types.MUTATE_LOGOUT}`);
  }

  if (!isAuthenticated && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else if (isAuthenticated === true && to.path === '/login') {
    next(false);
  } else {
    next();
  }
});

export default router;
