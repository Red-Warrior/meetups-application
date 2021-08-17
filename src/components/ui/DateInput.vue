<template>
  <AppInput
    @input.native="updatedDate($event.target)"
    :value="formattedDate"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    value: {},
    type: {
      type: String,
      default: 'date',
      validator: value => ['date', 'time', 'datetime-local'].includes(value),
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
  },
  methods: {
    updatedDate(value) {
      let inputValueAsNumber = value.valueAsNumber;
      if (inputValueAsNumber.length <= 8) {
        let timeValue = inputValueAsNumber.split(':');
        if (timeValue.length === 2) {
          inputValueAsNumber = new Date(this.actualParameter).setUTCHours(timeValue[0], timeValue[1]);
        } else {
          inputValueAsNumber = new Date(this.actualParameter).setUTCHours(timeValue[0], timeValue[1], timeValue[2]);
        }
      }
      let inputValueAsDate = inputValueAsNumber.valueAsDate ? inputValueAsNumber.valueAsDate : +inputValueAsNumber;
      this.$emit('update:valueAsNumber', new Date(inputValueAsNumber));
      this.$emit('update:valueAsDate', new Date(inputValueAsDate));
    },

    getDate(value) {
      let monthAndDay = [new Date(value).getUTCMonth() + 1, new Date(value).getUTCDate()].map(item =>
        item.toString().padStart(2, '0')
      );
      if (monthAndDay[0] === '00') {
        monthAndDay[0] = '12';
      }
      return `${new Date(value).getUTCFullYear()}-${monthAndDay.join('-')}`;
    },

    getTime(value) {
      let timeTwoPart = [new Date(value).getUTCHours(), new Date(value).getUTCMinutes()]
        .map(item => item.toString().padStart(2, '0'))
        .join(':');
      let timeThreePart = `${timeTwoPart}:${new Date(value).getUTCSeconds()}`;

      if (new Date(value).getUTCSeconds() % 60 !== 0) {
        return timeThreePart;
      } else {
        return timeTwoPart;
      }
    },

    getDateTimeLocal(value) {
      return `${this.getDate(value)}T${this.getTime(value)}`;
    },
  },

  computed: {
    actualParameter() {
      if (this.valueAsNumber) {
        return this.valueAsNumber;
      } else if (this.valueAsDate) {
        return this.valueAsDate;
      } else {
        return this.value;
      }
    },

    formattedDate() {
      if (this.type === 'time') {
        return this.getTime(this.actualParameter);
      } else if (this.type === 'datetime-local') {
        return this.getDateTimeLocal(this.actualParameter);
      } else {
        return this.getDate(this.actualParameter);
      }
    },
  },
};
</script>

<style scoped></style>
