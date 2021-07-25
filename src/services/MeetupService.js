export const restructureMeetups = meetups => {
  return meetups.result
    .sort((firstMeetup, secondMeetup) => {
      return firstMeetup.date > secondMeetup.date ? -1 : firstMeetup.date < secondMeetup.date ? 1 : 0;
    })
    .map(meetup => ({
      ...meetup,
      date: new Date(meetup.date),
      cover: meetup.imageId ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}` : undefined,
      localDate: new Date(meetup.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      ISODate: new Date(meetup.date).toISOString().substr(0, 10),
    }));
};

export const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

export function restructureMeetup({ result }) {
  const rawMeetup = result;
  return {
    ...rawMeetup,
    date: new Date(rawMeetup.date),
    localDate: new Date(rawMeetup.date).toLocaleString(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    ISODate: new Date(rawMeetup.date).toISOString().substr(0, 10),
    agenda: rawMeetup.agenda.map(meetup => ({
      ...meetup,
      icon: agendaItemIcons[meetup.type],
      title: meetup.title === null ? `${agendaItemTitles[meetup.type]}` : meetup.title,
    })),
    image: rawMeetup.imageId ? { '--bg-url': `url(${getMeetupCoverLink(rawMeetup)})` } : '',
  };
}

export function getMeetupCoverLink(meetup) {
  return `${process.env.VUE_APP_API_URL}/images/${meetup.imageId}`;
}

export const agendaItemIcons = {
  registration: require('@/assets/icons/icon-key.svg'),
  opening: require('@/assets/icons/icon-cal-sm.svg'),
  talk: require('@/assets/icons/icon-tv.svg'),
  break: require('@/assets/icons/icon-clock.svg'),
  coffee: require('@/assets/icons/icon-coffee.svg'),
  closing: require('@/assets/icons/icon-key.svg'),
  afterparty: require('@/assets/icons/icon-cal-sm.svg'),
  other: require('@/assets/icons/icon-cal-sm.svg'),
};

export const agendaIconMap = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const agendaItemTypes = [
  {
    value: 'registration',
    text: 'Регистрация',
  },
  {
    value: 'opening',
    text: 'Открытие',
  },
  {
    value: 'break',
    text: 'Перерыв',
  },
  {
    value: 'coffee',
    text: 'Coffee Break',
  },
  {
    value: 'closing',
    text: 'Закрытие',
  },
  {
    value: 'afterparty',
    text: 'Afterparty',
  },
  {
    value: 'talk',
    text: 'Доклад',
  },
  {
    value: 'other',
    text: 'Другое',
  },
].map(item => ({
  ...item,
  icon: agendaIconMap[item.value],
}));

export const getAgendaItemLanguageOptions = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export const getAgendaItemsFieldSpecifications = () => {
  const common = [
    {
      title: 'Нестандартный текст (необязательно)',
      field: 'title',
      component: 'app-input',
      model: { prop: 'value', event: 'input' },
      props: {},
    },
  ];

  return {
    registration: [...common],
    opening: [...common],
    talk: [
      {
        title: 'Тема',
        field: 'title',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Докладчик',
        field: 'speaker',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Описание',
        field: 'description',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {
          textarea: true,
        },
      },
      {
        title: 'Язык',
        field: 'language',
        component: 'dropdown-button',
        model: { prop: 'value', event: 'change' },
        props: {
          options: getAgendaItemLanguageOptions(),
          title: 'Язык',
        },
      },
    ],
    break: [...common],
    coffee: [...common],
    closing: [...common],
    afterparty: [...common],
    other: [
      {
        title: 'Заголовок',
        field: 'title',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {},
      },
      {
        title: 'Описание',
        field: 'description',
        component: 'app-input',
        model: { prop: 'value', event: 'input' },
        props: {
          multiline: true,
        },
      },
    ],
  };
};
