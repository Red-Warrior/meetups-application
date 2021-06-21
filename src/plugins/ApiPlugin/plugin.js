import { authApi } from '@/api/authApi';
import { meetupsApi } from '@/api/meetupsApi';

export default {
  install(Vue) {
    Vue.prototype.$authApi = authApi;
    Vue.prototype.$meetupsApi = meetupsApi;
  },
};
