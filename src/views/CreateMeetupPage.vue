<template>
  <meetup-form :meetup="meetup" submit-text="Создать" @submit="handleSubmit($event)" @cancel="handleCancel" />
</template>

<script>
import MeetupForm from '@/components/layouts/MeetupForm';
import { toasterResult } from '@/helpers/toasterResult';
import { withProgress } from '@/helpers/withProgress';
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
        date: Date.now(),
        place: '',
        agenda: [],
      },
    };
  },

  metaInfo() {
    return {
      title: this.title,
    };
  },

  methods: {
    async handleSubmit(meetup) {
      const { success, result } = toasterResult(await withProgress(this.$meetupsApi.addMeetup(meetup)), {
        successToast: 'Митап успешно создан',
        errorToast: true,
      });
      if (success) {
        await this.$router.push({ path: `/meetups/${result.id}` });
      }
    },
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
