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

/*const actions = {
  LOGIN({ state, getters, commit }, { email, password }) {

  },
};*/

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  // actions,
};
