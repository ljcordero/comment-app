import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import comment from './modules/comment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: (auth as any),
    comment: (comment as any),
  },
});
