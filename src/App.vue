<template>
  <div id="app">
    <base-layout class="wrapper bg-grey">
      <router-view />
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '@/components/layouts/BaseLayout';

export default {
  name: 'App',

  components: {
    BaseLayout,
  },
};
</script>

<style scoped></style>
