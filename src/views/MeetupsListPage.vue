<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check :options="$options.dateFilterOptions" v-model="filter.date"></form-check>
      </div>
      <div class="filters-panel__col">
        <form-group id="filters-panel__search" inline>
          <app-input small rounded placeholder="Поиск" v-model="filter.search">
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </form-group>
        <form-group inline>
          <page-tabs :selected.sync="view" />
        </form-group>
      </div>
    </div>

    <transition v-if="filteredMeetups && filteredMeetups.length" name="fade" mode="out-in">
      <meetups-list v-if="view === 'list'" :meetups="filteredMeetups" key="list"></meetups-list>
      <meetups-calendar v-else-if="view === 'calendar'" :meetups="filteredMeetups" key="calendar"></meetups-calendar>
    </transition>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import MeetupsList from '@/components/layouts/MeetupsList';
import MeetupsCalendar from '@/components/layouts/MeetupsCalendar';
import PageTabs from '@/components/ui/PageTabs';
import FormGroup from '@/components/layouts/FormGroup';
import FormCheck from '@/components/ui/FormCheck';
import AppInput from '@/components/ui/AppInput';
import AppEmpty from '@/components/layouts/AppEmpty';
import AppIcon from '@/components/ui/AppIcon';

export default {
  name: 'MeetupsListPage',

  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    FormGroup,
    AppInput,
    AppEmpty,
    AppIcon,
  },

  inject: {
    services: 'services',
  },

  data() {
    return {
      title: 'Meetups',
      meetups: [],
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      view: 'list',
    };
  },

  metaInfo() {
    return {
      title: this.title,
    };
  },

  mounted() {
    this.fetchMeetups();
  },

  computed: {
    filteredMeetups() {
      let filteredMeetups = this.meetups;

      if (this.filter.date === 'past') {
        filteredMeetups = filteredMeetups.filter(meetup => new Date(meetup.date) <= new Date());
      } else if (this.filter.date === 'future') {
        filteredMeetups = filteredMeetups.filter(meetup => new Date(meetup.date) > new Date());
      }

      if (this.filter.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
      } else if (this.filter.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter(meetup => meetup.attending);
      }

      if (this.filter.search) {
        const concatMeetupText = meetup =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer].join(' ').toLowerCase();
        filteredMeetups = filteredMeetups.filter(meetup =>
          concatMeetupText(meetup).includes(this.filter.search.toLowerCase())
        );
      }

      return filteredMeetups;
    },
  },

  methods: {
    async fetchMeetups() {
      const rowMeetups = await this.$meetupsApi.fetchMeetups();
      this.meetups = this.services.restructureMeetups(rowMeetups);
    },
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
