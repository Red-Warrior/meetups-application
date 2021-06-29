import { authApi } from '@/api/authApi';
import { meetupsApi } from '@/api/meetupsApi';
import { uploadImage } from '@/api/imagesApi';

export default {
  install(Vue) {
    Vue.prototype.$authApi = authApi;
    Vue.prototype.$meetupsApi = meetupsApi;
    Vue.prototype.$uploadImage = uploadImage;
  },
};
