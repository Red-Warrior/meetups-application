<template>
  <meetup-form
    :meetup="meetup"
    submit-text="Сохранить"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script>
import MeetupForm from '@/components/MeetupForm';
import { fetchMeetup } from '@/data';
export default {
  name: 'EditMeetupPage',

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

  mounted() {
    this.fetchMeetup();
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    },

    handleCancel() {
      this.$router.go(-1);
    },

    async fetchMeetup() {
      this.meetup = await fetchMeetup(this.$route.params.meetupId);
    },
  },
};
</script>

<style scoped></style>
