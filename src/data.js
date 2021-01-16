/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Получает список митапов с API
 * @return {Promise}
 */
export async function fetchMeetups() {
  return fetch(`${API_URL}/meetups`).then((res) => res.json());
}

export async function fetchMeetup(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then(response => response.json());
}

export async function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export async function register(email, fullname, password) {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, fullname, password }),
  }).then((res) => res.json());
}

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
].map((item) => ({
  ...item,
  icon: agendaIconMap[item.value],
}));

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

export const getAgendaItemLanguageOptions = () => [
  { value: 'null', text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];