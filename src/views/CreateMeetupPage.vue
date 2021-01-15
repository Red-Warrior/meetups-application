<template>
<meetup-form
  :meetup="meetup"
  submit-text="Создать"
  @submit="handleSubmit"
  @cancel="handleCancel"
/>
</template>

<script>
import MeetupForm from '@/components/MeetupForm';
export default {
  name: 'CreateMeetupPage',

  components: {
    MeetupForm,
  },

  data() {
    return {
      meetup: {
        id: 0,
        title: '',
        description: '',
        imageId: null,
        date: new Date(),
        place: '',
        agenda: [],
      },
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      alert('Cancel');
    },
  },
};
</script>

<style scoped>

</style>