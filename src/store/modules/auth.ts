import { User } from '@/models/user';
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
        email: 'test@test.com',
        password: '1234',
      },
      {
        email: 'john@doe.com',
        password: '1234',
      },
      {
        email: 'juan@perez.com',
        password: '1234',
      },
    ];

    if (users.some((x) => x.email === user.email && x.password === user.password)) {
      commit('logIn', user);
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logOut({ commit }: ActionContext<State, State>): void {
    commit('logout');
  },
};

const mutations = {
  logIn(state: State, user: User): void {
    state.user = user;
  },
  logOut(state: State): void {
    state.user = undefined;
  },
};

export default {
  namespace: true,
  state: new State(),
  getters,
  actions,
  mutations,
};