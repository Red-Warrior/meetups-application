import Vue from 'vue';
import App from './App.vue';
import './assets/styles/app.css';
import { router } from './router';
import VueMeta from 'vue-meta';
import TheTopProgressBar from '@/plugins/TopProgressBar/plugin';
import AppToast from '@/plugins/AppToast/plugin';
import MeetupsApi from '@/plugins/ApiPlugin/plugin';
import { withProgress, toasterResult } from '@/services/AuthService';
import {
  restructureMeetups,
  restructureMeetup,
  agendaItemTitles,
  agendaIconMap,
  agendaItemIcons,
  getImageURL,
} from '@/services/MeetupService';

Vue.config.productionTip = false;
Vue.use(TheTopProgressBar, { router });
Vue.use(MeetupsApi);
Vue.use(AppToast);
Vue.use(VueMeta);

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
        withProgress,
        toasterResult,
      },
    };
  },
  router,
  render: h => h(App),
}).$mount('#app');

window.addEventListener('unhandledrejection', ({ reason: err }) => {
  if (err instanceof new Error()) {
    this.$Toast('Проблема с интернет соединением');
  }
});
