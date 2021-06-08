<template>
  <p class="meetup-description">{{ meetup.description }}</p>
</template>

<script>
export default {
  name: 'MeetupDescriptionPage',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
