<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h1 v-if="this.$route.name === 'create'" class="page__title">Создание митапа</h1>
      <h1 v-else class="page__title">Редактирование митапа</h1>

      <form @submit.prevent="submitRecentData" class="form meetup-form">
        <div class="meetup-form__content">
          <fieldset class="form-section">
            <form-group label="Название">
              <app-input v-model="localMeetup.title" />
            </form-group>

            <form-group label="Дата">
              <date-input :value-as-number.sync="localMeetup.date" />
            </form-group>

            <form-group label="Место проведения">
              <app-input v-model="localMeetup.place" />
            </form-group>

            <form-group label="Описание">
              <app-input multiline rows="3" v-model="localMeetup.description" />
            </form-group>

            <form-group label="Изображение">
              <image-uploader v-model="localMeetup.imageId" />
            </form-group>
          </fieldset>

          <h3 class="form__section-title">Программа</h3>
          <meetup-agenda-item-form
            class="mb-3"
            v-for="(agendaItem, idx) in localMeetup.agenda"
            :key="agendaItem.id"
            :agenda-item.sync="localMeetup.agenda[idx]"
            @remove="removeAgendaItem(idx)"
          />

          <div class="form-section_append">
            <button @click="addAgendaItem" type="button" data-test="addAgendaItem">
              + Добавить этап программы
            </button>
          </div>
        </div>

        <div class="meetup-form__aside">
          <div class="meetup-form__aside_stick">
            <secondary-button @click="$emit('cancel')" type="button" block data-test="cancel">
              Отмена
            </secondary-button>

            <primary-button type="submit" block data-test="submit">
              {{ submitText }}
            </primary-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';

import MeetupAgendaItemForm from '@/components/layouts/MeetupAgendaItemForm';
import ImageUploader from '@/components/layouts/ImageUploader';
import FormGroup from '@/components/layouts/FormGroup';
import DateInput from '@/components/ui/DateInput';
import AppInput from '@/components/ui/AppInput';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

function buildAgendaItem() {
  return {
    id: nanoid(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function deepClone(meetup) {
  return JSON.parse(JSON.stringify(meetup));
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
    FormGroup,
    DateInput,
    AppInput,
    PrimaryButton,
    SecondaryButton,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: String,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  data() {
    return {
      localMeetup: deepClone(this.meetup),
    };
  },

  methods: {
    submitRecentData() {
      this.$emit('submit', deepClone(this.localMeetup));
    },
    addAgendaItem() {
      let newItem = buildAgendaItem();

      if (this.localMeetup.agenda.length) {
        let agendaList = this.localMeetup.agenda;
        let endsAt = agendaList[agendaList.length - 1].endsAt;
        this.localMeetup.agenda.push({ ...newItem, startsAt: endsAt });
      } else {
        this.localMeetup.agenda.push(newItem);
      }
    },
    removeAgendaItem(idx) {
      this.localMeetup.agenda.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.page {
  padding: 48px 0;
}

.page.page_meetup-forms {
  padding: 70px 0;
}

.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}

.page__title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: var(--body-color);
  margin: 0 0 32px;
}

.text-center {
  text-align: center;
}

.form {
  margin: 0;
}

.form-section {
  border: none;
  position: relative;
}

.form-section + .form-section {
  margin-top: 24px;
}

.form__section-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.form-section_append {
  margin-top: 24px;
}

.form-section_append button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.form-section_append button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .form-section.form-section_inner {
    padding: 28px 25% 4px 24px;
  }
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
