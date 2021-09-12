<template>
  <div class="d-flex justify-content-between shadow rounded px-3 py-3">
    <div class="d-flex flex-row">
      <img
        class="user-photo"
        height="50"
        width="50"
        :src="comment.createdBy.photo"
        :alt="comment.createdBy.name"
      />
      <div class="d-flex flex-column">
        <span class="text-start user-name">{{ comment.createdBy.name }}</span>
        <comment-form
          v-if="editing"
          class="text-start mt-2 mb-4"
          :value="comment.content"
          @cancel="editing = false"
          @save="edit"
        />
        <span v-else class="text-start" v-html="comment.content"></span>
        <div class="d-flex align-items-center text-start">
          <span class="badge bg-light text-dark">{{ likes }}</span>
          <b-icon
            v-if="!currentUserLikedComment"
            @click="like"
            class="pointer"
            icon="heart"
          ></b-icon>
          <b-icon v-else class="pointer" icon="heart-fill"></b-icon>
          <b-icon
            @click="reply"
            class="reply pointer"
            icon="reply-fill"
          ></b-icon>
        </div>
      </div>
    </div>
    <div style="min-width: 255px">
      <b-icon
        @click="editing = true"
        class="edit pointer"
        icon="pencil-square"
      ></b-icon>
      <span>{{ createdAt }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Comment } from "@/models/comment";
import { Action, Getter } from "vuex-class";
import { User } from "@/models/user";
import CommentForm from "./CommentForm.vue";

@Component({
  components: {
    CommentForm,
  },
})
export default class CommentViewer extends Vue {
  @Prop({ required: true }) private comment: Comment;
  @Action("like") private likeComment: (values: {
    commentId: string;
    user: User;
  }) => void;
  @Action("edit") private editComment: (comment: Comment) => void;
  @Getter private user: User;

  private editing: boolean = false;

  get likes(): number | undefined {
    return this.comment.likedBy?.length || undefined;
  }

  get currentUserLikedComment(): boolean | undefined {
    return this.comment.likedBy?.some((user) => user.email === this.user.email);
  }

  get createdAt(): string {
    return this.comment.createdAt.toLocaleString("es-DO");
  }

  private like(): void {
    this.likeComment({
      commentId: this.comment.id as string,
      user: this.user,
    });
  }

  private edit(content: string): void {
    this.editComment({
      ...this.comment,
      content,
    });
    this.editing = false;
  }
}
</script>

<style scoped lang="scss">
.user-photo {
  border-radius: 50%;
  margin-right: 20px;
}

.user-name {
  font-weight: bold;
  color: #ffa420;
}

.reply {
  margin-left: 50px;
}

.badge {
  margin-right: 5px;
}

.pointer {
  cursor: pointer;
}

.edit {
  margin-right: 25px;
}
</style>
