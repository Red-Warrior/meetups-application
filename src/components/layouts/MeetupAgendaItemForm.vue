<template>
  <div class="form-section form-section_inner">
    <button @click="$emit('remove')" type="button" class="remove-button">
      <app-icon icon="trash" alt="trash" />
    </button>

    <form-group>
      <dropdown-button title="Тип" :options="$options.agendaItemTypes" v-model="localAgenda.type" />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input type="time" placeholder="00:00" v-model="localAgenda.startsAt" @change="changeAgendaItem" />
        </form-group>
      </div>

      <div class="form__col">
        <form-group label="Окончание">
          <app-input type="time" placeholder="00:00" v-model="localAgenda.endsAt" />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="agendaField in $options.fieldSpecifications[localAgenda.type]"
      :key="agendaField.field"
      :label="agendaField.title"
    >
      <component
        v-bind="agendaField.props"
        :is="agendaField.component"
        v-model="localAgenda[agendaField.field]"
        @change="changeAgendaItem"
      >
      </component>
    </form-group>
  </div>
</template>

<script>
import FormGroup from '@/components/layouts/FormGroup';
import AppInput from '@/components/ui/AppInput';
import AppIcon from '@/components/ui/AppIcon';
import DropdownButton from '@/components/ui/DropdownButton';
import { getAgendaItemsFieldSpecifications, agendaItemTypes } from '@/services/MeetupService';

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypes: agendaItemTypes,
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  inject: {
    services: 'services',
  },

  components: {
    FormGroup,
    AppInput,
    AppIcon,
    DropdownButton,
  },

  data() {
    return {
      localAgenda: { ...this.agendaItem },
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  methods: {
    changeAgendaItem() {
      this.$emit('update:agendaItem', { ...this.localAgenda });
    },
  },

  computed: {
    startAt() {
      return this.localAgenda.startsAt;
    },
  },

  watch: {
    startAt(newValue, oldValue) {
      let oldStartAtMinutes = oldValue.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newStartAtMinutes = newValue.split(':').reduce((acc, value) => +acc * 60 + +value);
      let oldEndsMinutes = this.localAgenda.endsAt.split(':').reduce((acc, value) => +acc * 60 + +value);
      let newEndsAtMinutes = (oldEndsMinutes + (newStartAtMinutes - oldStartAtMinutes) + 24 * 60) % (24 * 60);

      let hours = (newEndsAtMinutes / 60).toFixed(0);
      let minutes = newEndsAtMinutes % 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      this.localAgenda.endsAt = `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.form-section {
  border: none;
  position: relative;
}

.form-section + .form-section {
  margin-top: 24px;
}

.form-section.form-section_inner {
  padding: 20px 10% 0 16px;
  border: 2px solid var(--blue-light);
  border-radius: 8px;
}

.form-section_inner .remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s all;
}

.form-section_inner .remove-button:hover {
  opacity: 0.6;
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

.form__row {
  display: flex;
  flex-direction: column;
}

.form__col + .form-col {
  margin-top: 16px;
}

.form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .form-section.form-section_inner {
    padding: 28px 25% 4px 24px;
  }

  .form-section_inner .remove-button {
    top: 20px;
    right: 20px;
  }

  .form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .form__col {
    flex: 1 1 auto;
    padding: 0 12px;
    margin-top: 0;
  }

  .form__col:first-child {
    margin-left: 0;
  }
}
</style>
