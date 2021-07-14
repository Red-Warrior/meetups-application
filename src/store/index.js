import VueX from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';

Vue.use(VueX);

export default new VueX.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    auth,
  },
});
