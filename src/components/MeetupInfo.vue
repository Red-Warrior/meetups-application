<template>
  <ul class="info-list">
    <li>
      <app-icon class="info-list__icon" icon="user" />
      {{ organizer }}
    </li>
    <li>
      <app-icon class="info-list__icon" icon="map" />
      {{ place }}
    </li>
    <li>
      <app-icon class="info-list__icon" icon="cal-lg" />
      <time :datetime="this.dateComputed.ISODate">{{ dateComputed.localDate }}</time>
    </li>
  </ul>
</template>

<script>
import AppIcon from '@/components/AppIcon';
export default {
  name: 'MeetupInfo',

  components: {
    AppIcon,
  },

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
  },

  computed: {
    dateComputed() {
      return {
        localDate: this.date.toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        ISODate: new Date(this.date).toISOString().substr(0, 10),
      };
    },
  },
};

</script>

<style scoped>
.info-list {
  margin: 0;
  padding: 0;
}

.info-list li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.info-list li:last-child {
  margin: 0;
}

.info-list__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>