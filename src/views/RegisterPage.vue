<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Регистрация</h1>
      <form @submit.prevent="submitEvent" class="form">
        <form-group label="Email">
          <app-input v-model="email" type="email"></app-input>
        </form-group>

        <form-group label="Имя">
          <app-input v-model="fullName" type="text" />
        </form-group>

        <form-group label="Пароль">
          <app-input v-model="password" type="password" />
        </form-group>

        <form-group label="Повтор пароля">
          <app-input v-model="repeatedPassword" type="password" />
        </form-group>

        <div class="form-group">
          <label class="checkbox"
            ><input v-model="checked" type="checkbox"/> Я согласен с условиями <span></span
          ></label>
        </div>

        <div class="form__buttons">
          <primary-button type="submit">Зарегистрироваться</primary-button>
        </div>

        <div class="form__append">
          Уже есть аккаунт?
          <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/FormGroup';
import AppInput from '@/components/AppInput';
import PrimaryButton from '@/components/PrimaryButton';
import { register } from '@/data';

export default {
  name: 'RegisterPage',

  components: {
    FormGroup,
    AppInput,
    PrimaryButton,
  },

  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      repeatedPassword: '',
      checked: false,
    };
  },

  methods: {
    async submitEvent() {
      if (this.email === '') {
        return alert('Требуется ввести Email');
      } else if (this.fullName === '') {
        alert('Требуется ввести полное имя');
      } else if (this.password === '') {
        alert('Требуется ввести пароль');
      } else if (this.password !== this.repeatedPassword) {
        alert('Пароли не совпадают');
      } else if (this.checked === false) {
        alert('Требуется согласиться с условиями');
      } else {
        let result = await register(this.email, this.fullName, this.password);
        alert(result.id ? result.id : result.message);
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 48px 0;
}

.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
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

.form__buttons {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 40px;
}

.form__append {
  margin-top: 40px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
}

.form__buttons .button + .button {
  margin-bottom: 8px;
}

@media all and (max-width: 992px) {
  .container {
    padding: 0 16px;
  }
}

.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('../assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
