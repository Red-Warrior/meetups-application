<template>
  <div class="meetup-agenda">
    <p v-if="!meetup.agenda.length" class="meetup-agenda__empty">
      Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!
    </p>
    <template v-else>
      <div v-for="agendaItem in meetup.agenda" :key="agendaItem.id" class="meetup-agenda__item">
        <div class="meetup-agenda__item-col">
          <img class="icon" alt="icon" :src="`${agendaItem.icon}`" />
        </div>
        <div v-if="agendaItem.startsAt && agendaItem.endsAt" class="meetup-agenda__item-col">
          {{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}
        </div>
        <div class="meetup-agenda__item-col">
          <h5 v-if="agendaItem.title" class="meetup-agenda__title">
            {{ agendaItem.title }}
          </h5>
          <p v-if="agendaItem.type === 'talk'">
            <span>{{ agendaItem.speaker }}</span>
            <span class="meetup-agenda__dot"></span>
            <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
          </p>
          <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MeetupAgendaPage',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.meetup-agenda {
  margin: 0;
}

.meetup-agenda__item {
  padding: 24px 0;
  border-top: 1px solid var(--grey-3);
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__item:first-child {
  border-top: none;
}

.meetup-agenda__item-col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.meetup-agenda__item-col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.meetup-agenda__item-col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.meetup-agenda__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__lang {
  font-style: italic;
}

.meetup-agenda__dot::before {
  content: '•';
  color: var(--grey);
  padding: 0 1ch;
}

.meetup-agenda__item p {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .meetup-agenda__item {
    padding: 40px 0;
  }
}
</style>
