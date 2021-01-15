import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  return (savedPosition) ? savedPosition :
    (to.hash) ? { selector: to.hash } :
      !(to.meta.saveScrollPosition && from.meta.saveScrollPosition) ? { x: 0, y: 0 } :
        to.matched.some((item) => item.meta.saveScrollPosition) ? false : { x: 0, y: 0 };
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
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
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
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('@/views/MeetupAgendaPage'),
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
        showCreateMeetupLinks: true,
        hideLoginRegister: true,
      },
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      name: 'edit',
      component: () => import('@/views/EditMeetupPage'),
      meta: {
        showCreateMeetupLinks: true,
        hideLoginRegister: true,
      },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage'),
    },
  ],
});
