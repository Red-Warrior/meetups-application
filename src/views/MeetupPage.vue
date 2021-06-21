<template>
  <div v-if="meetup" class="bg-white">
    <div class="meetup-cover" :style="meetup.image">
      <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
    </div>
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </content-tabs>
        </div>

        <div class="meetup__aside">
          <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <div class="meetup__aside-buttons">
            <primary-button>Участвовать</primary-button>

            <primary-button tag="router-link" :to="{ name: 'edit', params: { meetupId: meetup.id } }">
              Редактировать
            </primary-button>

            <danger-button>Удалить</danger-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTabs from '@/components/ui/ContentTabs';
import MeetupInfo from '@/components/layouts/MeetupInfo';
import PrimaryButton from '@/components/ui/PrimaryButton';
// import SecondaryButton from '@/components/SecondaryButton';
import DangerButton from '@/components/ui/DangerButton';

export default {
  name: 'MeetupPage',

  components: {
    ContentTabs,
    MeetupInfo,
    PrimaryButton,
    DangerButton,
  },

  inject: {
    services: 'services',
  },

  data() {
    return {
      title: null,
      meetup: null,
      tabs: [
        { to: { name: 'meetup-description' }, text: 'Описание' },
        { to: { name: 'meetup-agenda' }, text: 'Программа' },
      ],
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

  computed: {
    meetupId() {
      return this.$route.params.meetupId;
    },
  },

  methods: {
    async fetchMeetup() {
      const rawMeetup = await this.$meetupsApi.fetchMeetup(this.meetupId);
      this.meetup = this.services.restructureMeetup(rawMeetup);
      this.title = this.meetup.title;
    },
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup-description {
  padding-top: 33px;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }

  .meetup__empty {
    height: 340px;
  }
}

.meetup-cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
