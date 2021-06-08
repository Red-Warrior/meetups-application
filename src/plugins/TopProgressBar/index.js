import TheTopProgressBar from './TheTopProgressBar';

export default {
  instance: null,

  setInstance(instance) {
    this.instance = instance;
  },

  start() {
    if (!this.instance) {
      this.setInstance(TheTopProgressBar);
      this.instance.start();
    } else {
      this.instance.start();
    }
  },

  finish() {
    if (this.instance) {
      this.instance.finish();
    }
  },

  fail() {
    if (this.instance) {
      this.instance.fail();
    }
  },
};
