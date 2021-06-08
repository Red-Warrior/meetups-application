<template>
  <div class="auth_layout">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: String,
  },
};
</script>

<style scoped>
.auth_layout {
  text-align: center;
  background-color: var(--grey);
}

.auth_layout h1 {
  padding: 10px;
}
</style>
