<template>
  <div class="page page_onboarding">
    <div class="container">
      <h1 class="page__title text-center">Вход</h1>
      <form @submit.prevent="submitEvent" class="form">
        <form-group label="Email">
          <app-input placeholder="demo@email" v-model="email" type="email" />
        </form-group>

        <form-group label="Пароль">
          <app-input placeholder="password" v-model="password" type="password" />
        </form-group>

        <div class="form__buttons">
          <primary-button type="submit" block>Войти</primary-button>
        </div>

        <div class="form__append">
          Нет аккаунта?
          <router-link :to="{ name: 'register' }" class="link">Зарегистрируйтесь</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormGroup from '@/components/FormGroup';
import AppInput from '@/components/AppInput';
import PrimaryButton from '@/components/PrimaryButton';
import { login } from '@/data';

export default {
  name: 'LoginPage',

  components: {
    FormGroup,
    AppInput,
    PrimaryButton,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async submitEvent() {
      if (this.email === '') {
        return alert('Требуется ввести Email');
      } else if (this.password === '') {
        return alert('Требуется ввести пароль');
      } else {
        let result = await login(this.email, this.password);
        alert(result.fullname ? result.fullname : result.message);
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
</style>
