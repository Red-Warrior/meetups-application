<template>
  <div>
    <the-header />
    <main>
      <slot></slot>
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import TheFooter from '@/components/layout/TheFooter';

export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
