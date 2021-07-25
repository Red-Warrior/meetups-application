import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './assets/styles/app.css';
import { router } from './router';
import VueMeta from 'vue-meta';
import TheTopProgressBar from '@/plugins/TopProgressBar/plugin';
import AppToast from '@/plugins/AppToast/plugin';
import MeetupsApi from '@/plugins/ApiPlugin/plugin';
import { authApi } from '@/api/authApi';
import { persistUserDataToLocalStorage, restoreUserData, removeUserData } from '@/services/authServices';
import {
  restructureMeetups,
  restructureMeetup,
  agendaItemTitles,
  agendaIconMap,
  agendaItemIcons,
} from '@/services/MeetupService';
import { getImageURL } from '@/services/ImageService';
import * as Types from '@/store/modules/types';

Vue.config.productionTip = false;
Vue.use(TheTopProgressBar, { router });
Vue.use(MeetupsApi);
Vue.use(AppToast);
Vue.use(VueMeta);

const user = restoreUserData();
if (user) {
  store.commit(`auth/${Types.SET_USER}`, JSON.parse(user).fullname);
  authApi
    .fetchUser()
    .then(user => {
      persistUserDataToLocalStorage(user);
      store.commit(`auth/${Types.SET_USER}`, user.result.fullname);
    })
    .catch(() => {
      authApi.logout();
    });
}

new Vue({
  provide() {
    return {
      services: {
        restructureMeetups,
        restructureMeetup,
        agendaItemTitles,
        agendaItemIcons,
        agendaIconMap,
        getImageURL,
        persistUserDataToLocalStorage,
        removeUserData,
      },
    };
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');

window.addEventListener('unhandledrejection', ({ reason: err }) => {
  if (err instanceof new Error()) {
    this.$Toaster('Проблема с интернет соединением');
  }
});
