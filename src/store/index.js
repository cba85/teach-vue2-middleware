import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false, // Change this value to test
      user: {
        data: {
          isCustomer: false
        }
      }
    }
  },
  getters: {
    auth(state) {
      return state.auth;
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
