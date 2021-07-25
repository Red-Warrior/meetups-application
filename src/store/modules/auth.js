import * as Types from '@/store/modules/types';

const state = () => ({
  user: null,
});

const getters = {
  [Types.IS_AUTHENTICATED](state) {
    return !!state.user;
  },
};

const mutations = {
  [Types.SET_USER](state, user) {
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
