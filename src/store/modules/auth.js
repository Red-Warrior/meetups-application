// import { IS_AUTHENTICATED, SET_USER } from './types';

const state = () => ({
  user: null,
});

const getters = {
  IS_AUTHENTICATED(state) {
    return !!state.user;
  },
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
