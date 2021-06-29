<template>
  <div
      class="progress"
      :class="{ show: progressLine, failed: progressFail }"
      :style="{ width: loadingValue }">
  </div>
</template>

<script>
export default {
  name: 'TheTopProgressBar',

  data() {
    return {
      progressLine: false,
      progressFail: false,
      loadingValue: 0,
      animationProcess: false,
      animationProcessFinish: false,
    };
  },

  methods: {
    start() {
      this.progressLine = true;
      if (!this.animationProcess) {
        this.animationProcess = true;
        this.loadingAnimation(10000);
      }
    },

    finish() {
      if (!this.animationProcessFinish) {
        this.completionAnimation(200);
      }
    },

    fail() {
      this.progressFail = true;
      if (!this.animationProcessFinish) {
        this.completionAnimation(200);
      }
    },

    loadingAnimation(duration) {
      this.loadingValue = 0;
      this.animationProcess = true;
      let start = performance.now();
      let animationProgress = 0;

      let step = time => {
        animationProgress += ((time - start) / duration) * 100;
        this.loadingValue = animationProgress + '%';
        start = time;
        if (parseFloat(this.loadingValue) < 100 && !this.animationProcessFinish && !this.progressFail) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    },

    completionAnimation(duration) {
      this.animationProcessFinish = true;
      let start = performance.now();
      let completedAnimation = parseFloat(this.loadingValue);
      let animationProgress = parseFloat(this.loadingValue);

      let step = time => {
        let progressFraction = ((time - start) / duration) * 100;
        animationProgress += progressFraction - (progressFraction / 100) * completedAnimation;
        this.loadingValue = animationProgress + '%';
        start = time;
        if (parseFloat(this.loadingValue) >= 100) {
          this.hideProgressLine(200);
        }
        if (parseFloat(this.loadingValue) < 100) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    },

    hideProgressLine(duration) {
      if (!this.progressFail) {
        setTimeout(() => {
          this.progressLine = false;
          this.animationProcess = false;
          this.animationProcessFinish = false;
        }, duration);
      } else {
        setTimeout(() => {
          this.progressLine = false;
        }, duration);
        setTimeout(() => {
          this.progressFail = false;
          this.animationProcess = false;
          this.animationProcessFinish = false;
        }, duration + 300);
      }
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
