import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './assets/styles/app.css';
import { router } from './router';
import VueMeta from 'vue-meta';
import TheTopProgressBarPlugin from '@/plugins/TopProgressBar/plugin';
import Toaster from '@/plugins/AppToast/AppToast';
import ToasterPlugin from '@/plugins/AppToast/plugin';
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
Vue.use(TheTopProgressBarPlugin, { router });
Vue.use(MeetupsApi);
Vue.use(ToasterPlugin);
Vue.use(VueMeta);

const user = JSON.parse(restoreUserData());
if (user?.fullname) {
  store.commit(`auth/${Types.SET_USER}`, user.fullname);
  authApi.fetchUser().then(userData => {
    if (userData.success) {
      persistUserDataToLocalStorage(userData.result);
      store.commit(`auth/${Types.SET_USER}`, userData.result.fullname);
    }
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
    Toaster.error('Проблема с интернет соединением');
    return;
  }
  Toaster.error(err.message);
});
