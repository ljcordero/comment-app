import { Comment } from '@/models/comment';
import { User } from '@/models/user';
import Vue from 'vue';
import { ActionContext, ActionTree, GetterTree } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export class State {
  public comments: Comment[] = [];
}

const getters: GetterTree<State, State> = {
  comments: (state: State) => state.comments,
};

const actions: ActionTree<State, State> = {
  add({ commit }: ActionContext<State, State>, comment: Comment): void {
    commit('add', {
      ...comment,
      id: uuidv4(),
      likedBy: [],
    });
  },
  edit({ commit }: ActionContext<State, State>, comment: Comment): void {
    commit('edit', comment);
  },
  like({ commit }: ActionContext<State, State>, values: { commentId: string, user: User }): void {
    commit('like', values);
  },
  remove({ commit }: ActionContext<State, State>, commentId: string): void {
    commit('remove', commentId);
  },
};

const mutations = {
  add(state: State, comment: Comment): void {
    state.comments.push(comment);
  },
  edit(state: State, comment: Comment): void {
    const commentIndex = state.comments.findIndex((x) => x.id === comment.id);
    Vue.set(state.comments, commentIndex, comment);
  },
  like(state: State, values: { commentId: string, user: User }): void {
    const comment = state.comments.find((x) => x.id === values.commentId);

    if (comment) {
      comment.likedBy?.push(values.user);
    }
  },
  remove(state: State, commentId: string): void {
    const removeChilds = (parentCommentId: string) => {
      state.comments.forEach((comment, index) => {
        if (comment.parentCommentId === parentCommentId) {
          removeChilds(comment.id as string);
          state.comments.splice(index, 1);
        }
      });
    };

    removeChilds(commentId);
    const commentIndex = state.comments.findIndex((x) => x.id === commentId);
    state.comments.splice(commentIndex, 1);
  },
};

export default {
  namespace: true,
  state: new State(),
  getters,
  actions,
  mutations,
};
