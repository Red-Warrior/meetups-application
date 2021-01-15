<template>
  <div id="app">
    <div class="wrapper bg-grey">
      <base-layout>
        <router-view />
      </base-layout>
    </div>
  </div>
</template>

<script>
import BaseLayout from '@/components/BaseLayout';

export default {
  name: 'App',

  components: {
    BaseLayout,
  },
};
</script>

<style scoped></style>
