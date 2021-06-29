<template>
  <meetup-form v-if="meetup" :meetup="meetup" submit-text="Сохранить" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import MeetupForm from '@/components/layouts/MeetupForm';
export default {
  name: 'EditMeetupPage',

  components: {
    MeetupForm,
  },

  data() {
    return {
      title: 'Edit Meetup',
      meetup: null,
    };
  },

  metaInfo() {
    return {
      title: this.title,
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
      const meetupIdResponse = await this.$meetupsApi.fetchMeetup(this.$route.params.meetupId);
      if (meetupIdResponse.success) {
        this.meetup = meetupIdResponse.result;
      } else {
        this.$Toaster.error(meetupIdResponse.error.message);
        this.handleCancel();
      }
    },
  },
};
</script>

<style scoped></style>
