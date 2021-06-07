import Vue from 'vue';
import App from './App.vue';
import './assets/styles/app.css';
import { router } from './router';
import TheTopProgressBar from '@/plugins/TopProgressBar/plugin';

Vue.config.productionTip = false;
Vue.use(TheTopProgressBar, { router });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
