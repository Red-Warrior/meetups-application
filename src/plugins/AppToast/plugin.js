import AppToastComponent from './AppToast';
import Toast from './index';

export default {
  install(Vue) {
    const toast = document.createElement('div');
    document.body.appendChild(toast);
    Toast.setInstance(new Vue(AppToastComponent).$mount(toast));
    Vue.prototype.$Toaster = Toast;
  },
};
