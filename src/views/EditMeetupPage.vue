<template>
  <meetup-form
    v-if="meetup"
    :meetup="meetup"
    submit-text="Сохранить"
    @submit="handleSubmit($event)"
    @cancel="handleCancel"
  />
</template>

<script>
import MeetupForm from '@/components/layouts/MeetupForm';
import { toasterResult } from '@/helpers/toasterResult';
import { withProgress } from '@/helpers/withProgress';
import { meetupsApi } from '@/api/meetupsApi';
import Toaster from '@/plugins/AppToast/index';

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

  beforeRouteEnter(to, from, next) {
    meetupsApi.fetchMeetup(to.params.meetupId).then(res => {
      if (!res.success) {
        Toaster.error(res.error.message);
        next('/');
      } else {
        next(vm => {
          vm.setMeetup(res.result);
        });
      }
    });
  },

  /*  mounted() {
    this.fetchMeetup();
  },*/

  methods: {
    async handleSubmit(updatedMeetup) {
      const updatedMeetupDateChange = {
        ...updatedMeetup,
        date: new Date(updatedMeetup.date),
      };
      const { success } = toasterResult(
        await withProgress(this.$meetupsApi.updateMeetup(updatedMeetup.id, updatedMeetupDateChange)),
        {
          successToast: 'Митап успешно создан',
          errorToast: true,
        }
      );
      if (success) {
        await this.$router.push({ path: `/meetups/${this.meetup.id}` });
      }
    },

    handleCancel() {
      this.$router.go(-1);
    },

    /*    async fetchMeetup() {
      const meetupIdResponse = await this.$meetupsApi.fetchMeetup(this.$route.params.meetupId);
      if (meetupIdResponse.success) {
        this.meetup = meetupIdResponse.result;
      } else {
        this.$Toaster.error(meetupIdResponse.error.message);
        this.handleCancel();
      }
    },*/

    setMeetup(meetup) {
      this.meetup = meetup;
    },
  },
};
</script>

<style scoped></style>
