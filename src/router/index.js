import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  let scrollPosition;

  if (savedPosition) {
    scrollPosition = savedPosition;
  } else if (to.hash) {
    scrollPosition = { selector: to.hash };
  } else if (!(to.meta.saveScrollPosition && from.meta.saveScrollPosition)) {
    scrollPosition = { x: 0, y: 0 };
  } else if (to.matched.some(item => item.meta.saveScrollPosition)) {
    scrollPosition = false;
  } else {
    scrollPosition = { x: 0, y: 0 };
  }

  return scrollPosition;
}

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/MeetupsListPage'),
    },
    {
      path: '/meetups',
      name: 'meetups-list',
      component: () => import('@/views/MeetupsListPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      redirect: to => ({ name: 'meetup-description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('@/views/MeetupPage'),
      children: [
        {
          path: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('@/views/MeetupDescriptionPage'),
          meta: {
            saveScrollPosition: true,
          },
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('@/views/MeetupAgendaPage'),
          meta: {
            saveScrollPosition: true,
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage'),
    },
    {
      path: '/meetups/create',
      name: 'create',
      component: () => import('@/views/CreateMeetupPage'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      name: 'edit',
      component: () => import('@/views/EditMeetupPage'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage'),
    },
  ],
});

export function requireAuthGuard(to, from, next) {
  if (to.matched.some(route => route.meta.requireAuth)) {
    if (store.getters['auth/IS_AUTHENTICATED']) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
}

router.beforeEach(requireAuthGuard);
