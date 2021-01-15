<template>
  <div v-if="reformedMeetup">
    <div class="meetup-cover" :style="reformedMeetup.image">
      <h1 class="meetup-cover__title">{{ reformedMeetup.title }}</h1>
    </div>
    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="reformedMeetup" />
          </content-tabs>
        </div>

        <div class="meetup__aside">
          <meetup-info
            :organizer="reformedMeetup.organizer"
            :place="reformedMeetup.place"
            :date="new Date(rawMeetup.date)"
          />
          <div class="meetup__aside-buttons">
            <primary-button>Участвовать</primary-button>

            <primary-button tag="router-link" :to="{ name: 'edit', params: { meetupId: rawMeetup.id } }">
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
import ContentTabs from '@/components/ContentTabs';
import MeetupInfo from '@/components/MeetupInfo';
import PrimaryButton from '@/components/PrimaryButton';
// import SecondaryButton from '@/components/SecondaryButton';
import DangerButton from '@/components/DangerButton';
import { getMeetupCoverLink, fetchMeetup, agendaItemTitles, agendaItemIcons } from '@/data';

export default {
  name: 'MeetupPage',

  components: {
    ContentTabs,
    MeetupInfo,
    PrimaryButton,
    DangerButton,
  },

  data() {
    return {
      rawMeetup: null,
      tabs: [
        { to: { name: 'meetup-description' }, text: 'Описание' },
        { to: { name: 'meetup-agenda' }, text: 'Программа' },
      ],
    };
  },

  mounted() {
    this.fetchMeetup();
  },

  computed: {
    reformedMeetup() {
      if (this.rawMeetup !== null) {
        return {
          ...this.rawMeetup,
          date: new Date(this.rawMeetup.date),
          localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          ISODate: new Date(this.rawMeetup.date).toISOString().substr(0, 10),
          agenda: this.rawMeetup.agenda.map(meetup => ({
            ...meetup,
            icon: agendaItemIcons[meetup.type],
            title: meetup.title === null ? `${agendaItemTitles[meetup.type]}` : meetup.title,
          })),
          image: this.rawMeetup.imageId ? { '--bg-url': `url(${getMeetupCoverLink(this.rawMeetup)})` } : '',
        };
      } else {
        return null;
      }
    },

    meetupId() {
      return this.$route.params.meetupId;
    },
  },

  methods: {
    async fetchMeetup() {
      this.rawMeetup = await fetchMeetup(this.meetupId);
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
