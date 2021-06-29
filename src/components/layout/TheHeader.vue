<template>
  <div class="header">
    <div>
      <h1>
        <router-link :to="{ name: 'index' }">
          <img src="@/assets/logo.svg" alt="Meetups" />
        </router-link>
      </h1>
    </div>
    <nav>
      <router-link v-if="showReturnToMeetups" :to="{ name: 'meetups-list' }"> &larr; Вернуться к списку</router-link>

      <template v-if="hideLoginRegister">
        <router-link :to="{ name: 'login' }">Войти</router-link>
        <router-link :to="{ name: 'register' }">Зарегистрироваться</router-link>
      </template>

      <template v-if="showCreateMeetupLinks">
        <router-link to="/meetups?participation=attending">Мои митапы</router-link>
        <router-link to="/meetups?participation=organizing">Организуемые митапы</router-link>
      </template>

      <router-link :to="{ name: 'create' }">Создать митап</router-link>

      <router-link to="">Выйти</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',

  computed: {
    showReturnToMeetups() {
      return this.$route.matched.some(route => route.meta.showReturnToMeetups);
    },
    showCreateMeetupLinks() {
      return this.$route.matched.some(route => route.meta.showCreateMeetupLinks);
    },
    hideLoginRegister() {
      return !this.$route.matched.some(route => route.meta.hideLoginRegister);
    },
  },
};
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}

.header h1,
.header h1 a {
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}

.header nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.header nav a {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline;
}

.header nav a + a {
  margin-top: 8px;
}

.header nav a:hover {
  color: var(--blue);
}

.header nav a:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .header nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .header nav a,
  .header nav a + a {
    margin-top: 0;
  }

  .header nav a:first-child:before {
    display: none;
  }
}
</style>
