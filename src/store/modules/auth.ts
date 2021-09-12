import { User } from '@/models/user';
import Vue from 'vue';
import { ActionContext, ActionTree, GetterTree } from 'vuex';

export class State {
  public user?: User;
}

const getters: GetterTree<State, State> = {
  isAuthenticated: (state: State) => !!state.user,
  user: (state: State) => state.user,
};

const actions: ActionTree<State, State> = {
  logIn({ commit }: ActionContext<State, State>, user: User): void {
    const users: User[] = [
      {
        name: 'test',
        photo: 'https://via.placeholder.com/150/000000/FFFFFF/?text=TEST',
        email: 'test@test.com',
        password: '1234',
      },
      {
        name: 'john',
        photo: 'https://via.placeholder.com/150/0000FF/FFFFFF/?text=JOHN',
        email: 'john@doe.com',
        password: '1234',
      },
      {
        name: 'juan',
        photo: 'https://via.placeholder.com/150/FF0000/FFFFFF/?text=JUAN',
        email: 'juan@perez.com',
        password: '1234',
      },
    ];

    const existingUser = users.find((x) => x.email === user.email && x.password === user.password);

    if (!!existingUser) {
      commit('logIn', existingUser);
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logOut({ commit }: ActionContext<State, State>): void {
    commit('logOut');
  },
};

const mutations = {
  logIn(state: State, user: User): void {
    Vue.set(state, 'user', user);
  },
  logOut(state: State): void {
    Vue.set(state, 'user', undefined);
  },
};

export default {
  namespace: true,
  state: new State(),
  getters,
  actions,
  mutations,
};
