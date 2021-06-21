<template>
  <meetup-form :meetup="meetup" submit-text="Создать" @submit="handleSubmit" @cancel="handleCancel" />
</template>

<script>
import MeetupForm from '@/components/layouts/MeetupForm';
export default {
  name: 'CreateMeetupPage',

  components: {
    MeetupForm,
  },

  data() {
    return {
      title: 'Create Meetup',
      meetup: {
        id: 0,
        title: '',
        description: '',
        imageId: null,
        date: new Date(),
        place: '',
        agenda: [
          /*{
            id: 0,
            startsAt: '00:00',
            endsAt: '00:00',
            type: 'other',
            title: null,
            description: null,
            speaker: null,
            language: null,
          },*/
        ],
      },
    };
  },

  metaInfo() {
    return {
      title: this.title,
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

<style scoped></style>
