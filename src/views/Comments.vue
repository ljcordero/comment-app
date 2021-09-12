<template>
  <div class="container pt-5 pb-5">
    <div class="d-flex justify-content-between mb-4">
      <h2 class="mb-0">
        Comentarios
        <span class="badge bg-light text-dark">{{ comments.length }}</span>
      </h2>
      <div class="d-flex align-items-center">
        <label class="label">Ordenar por:</label>
        <select v-model="commentsOrder" class="form-select form-select">
          <option value="ASC">Fecha Asc</option>
          <option value="DESC">Fecha Desc</option>
        </select>
      </div>
    </div>
    <comment-viewer
      class="mt-3"
      v-for="comment in commentsOrdered"
      :key="comment.id"
      :comment="comment"
    />
    <div class="mt-4">
      <button
        v-if="!commentFormVisible"
        type="button"
        class="btn btn-info"
        @click="commentFormVisible = true"
      >
        Nuevo Comentario
      </button>
      <div class="shadow rounded px-5 py-4 text-start">
        <h3 class="mb-4">Tu Comentario</h3>
        <comment-form
          v-if="commentFormVisible"
          @cancel="commentFormVisible = false"
          @save="saveNewComment"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommentForm from "@/components/CommentForm.vue";
import CommentViewer from "@/components/CommentViewer.vue";
import { Action, Getter } from "vuex-class";
import { Comment } from "@/models/comment";
import { User } from "@/models/user";

@Component({
  components: {
    CommentForm,
    CommentViewer,
  },
})
export default class Comments extends Vue {
  @Action("add") private addComment: (comment: Comment) => void;
  @Getter private comments: Comment[];
  @Getter private user: User;

  private commentFormVisible: boolean = true;
  private commentsOrder: string = "ASC";

  get commentsOrdered(): Comment[] {
    return this.comments.sort((a, b) => {
      if (this.commentsOrder === "ASC") {
        return a.createdAt < b.createdAt ? -1 : 1;
      } else {
        return a.createdAt > b.createdAt ? -1 : 1;
      }
    });
  }

  private saveNewComment(content: string) {
    this.addComment({
      content,
      createdAt: new Date(),
      createdBy: this.user,
    });
  }
}
</script>

<style scoped lang="scss">
.label {
  margin-right: 10px;
}

.form-select {
  width: unset;
}
</style>
