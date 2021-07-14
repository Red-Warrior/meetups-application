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
            <template v-if="'attending' in meetup || !meetup.organizing">
              <primary-button v-if="!attending" @click="addParticipation">Участвовать</primary-button>
              <secondary-button v-else @click="cancelParticipation">Отменить участие</secondary-button>
            </template>

            <template v-if="'organizing' in meetup">
              <primary-button tag="router-link" :to="{ name: 'edit', params: { meetupId: meetup.id } }">
                Редактировать
              </primary-button>
              <danger-button @click="deleteMeetup">Удалить</danger-button>
            </template>
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
import SecondaryButton from '@/components/ui/SecondaryButton';
import DangerButton from '@/components/ui/DangerButton';
import { toasterResult } from '@/helpers/toasterResult';
import { withProgress } from '@/helpers/withProgress';

export default {
  name: 'MeetupPage',

  components: {
    ContentTabs,
    MeetupInfo,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
  },

  inject: {
    services: 'services',
  },

  data() {
    return {
      title: null,
      meetup: null,
      attending: null,
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
      this.attending = this.meetup.attending;
      this.title = this.meetup.title;
    },

    async addParticipation() {
      this.attending = true;
      toasterResult(await withProgress(this.$meetupsApi.addUserToMembers(this.meetupId)), {
        successToast: 'Сохранено',
        errorToast: true,
      });
    },

    async cancelParticipation() {
      this.attending = false;
      toasterResult(await withProgress(this.$meetupsApi.deleteUserFromMembers(this.meetupId)), {
        successToast: 'Сохранено',
        errorToast: true,
      });
    },

    async deleteMeetup() {
      const response = confirm('Вы уверены? Это действие нельзя будет отменить.');
      if (response) {
        await withProgress(this.$meetupsApi.deleteMeetup(this.meetupId));
        await this.$router.push({ path: '/' });
      }
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
