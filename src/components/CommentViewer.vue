<template>
  <div
    class="rounded px-3 py-3"
    v-bind:class="{ shadow: level === 1, 'border-bottom': level === 2 }"
  >
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-row w-100">
        <img
          class="user-photo"
          height="50"
          width="50"
          :src="comment.createdBy.photo"
          :alt="comment.createdBy.name"
        />
        <div class="d-flex flex-column w-100">
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
              v-if="level < 3"
              @click="replying = true"
              class="reply pointer"
              icon="reply-fill"
            ></b-icon>
          </div>
        </div>
      </div>
      <div style="min-width: 260px">
        <b-icon
          v-if="isEditable"
          @click="editing = true"
          class="mr-25 pointer"
          icon="pencil-square"
        ></b-icon>
        <b-icon
          v-if="isEditable"
          @click="remove"
          class="mr-25 pointer"
          icon="x"
        ></b-icon>
        <span>{{ createdAt }}</span>
      </div>
    </div>
    <div class="sub-comments">
      <comment-viewer
        class="mt-2"
        v-for="sub in subComments"
        :key="sub.id"
        :comment="sub"
        :level="level + 1"
      />
      <comment-form
        v-if="replying"
        class="text-start mt-2"
        @cancel="replying = false"
        @save="reply"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Comment } from "@/models/comment";
import { Action, Getter } from "vuex-class";
import { User } from "@/models/user";
import CommentForm from "./CommentForm.vue";
import { v4 as uuidv4 } from "uuid";

@Component({
  components: {
    CommentForm,
  },
})
export default class CommentViewer extends Vue {
  @Prop({ required: true }) private comment: Comment;
  @Prop({ required: true }) private level: number;

  @Action("like") private likeComment: (values: {
    commentId: string;
    user: User;
  }) => void;
  @Action("add") private addComment: (comment: Comment) => void;
  @Action("edit") private editComment: (comment: Comment) => void;
  @Action("remove") private removeComment: (commentId: string) => void;

  @Getter private user: User;
  @Getter private comments: Comment[];

  private editing: boolean = false;
  private replying: boolean = false;

  get likes(): number | undefined {
    return this.comment.likedBy?.length || undefined;
  }

  get currentUserLikedComment(): boolean | undefined {
    return this.comment.likedBy?.some((user) => user.email === this.user.email);
  }

  get isEditable(): boolean {
    return this.comment.createdBy.email === this.user.email;
  }

  get createdAt(): string {
    return this.comment.createdAt.toLocaleString("es-DO");
  }

  get subComments(): Comment[] {
    return this.comments.filter((x) => x.parentCommentId === this.comment.id);
  }

  private like(): void {
    this.likeComment({
      commentId: this.comment.id as string,
      user: this.user,
    });
  }

  private reply(content: string): void {
    this.addComment({
      id: uuidv4(),
      content,
      createdBy: this.user,
      createdAt: new Date(),
      likedBy: [],
      parentCommentId: this.comment.id,
    });

    this.replying = false;
  }

  private edit(content: string): void {
    this.editComment({
      ...this.comment,
      content,
    });
    this.editing = false;
  }

  private remove(commentId: string) {
    this.removeComment(this.comment.id as string);
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

.mr-25 {
  margin-right: 25px;
}

.sub-comments {
  margin-left: 55px;
  width: 90%;
}
</style>
