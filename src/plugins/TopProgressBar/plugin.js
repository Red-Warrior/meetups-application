import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  install(Vue, option) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    TopProgressBar.setInstance(new Vue(TheTopProgressBar).$mount(container));
    Vue.prototype.$progress = TopProgressBar;
    Vue.$progress = TopProgressBar;

    if (option && option.router) {
      option.router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      });

      option.router.afterEach(() => {
        TopProgressBar.finish();
      });

      option.router.onError((err) => {
        TopProgressBar.fail();
        throw err;
      });
    }
  },
};
