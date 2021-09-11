<template>
  <div class="container pt-5">
    <div class="d-flex justify-content-between mb-4">
      <h2 class="mb-0">
        Comentarios
        <span class="badge bg-light text-dark">{{ comments.length }}</span>
      </h2>
      <div class="d-flex align-items-center">
        <label class="label">Ordenar por:</label>
        <select class="form-select form-select">
          <option value="ASC">Fecha Asc</option>
          <option value="DESC">Fecha Desc</option>
        </select>
      </div>
    </div>

    <div class="mt-4">
      <button
        v-if="!commentFormVisible"
        type="button"
        class="btn btn-info"
        @click="commentFormVisible = true"
      >
        Nuevo Comentario
      </button>
      <comment-form
        v-if="commentFormVisible"
        @cancel="commentFormVisible = false"
        @save="saveNewComment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommentForm from "@/components/CommentForm.vue";
import { Action, Getter } from "vuex-class";
import { Comment } from "@/models/comment";
import { User } from "@/models/user";

@Component({
  components: {
    CommentForm,
  },
})
export default class Comments extends Vue {
  @Action("add") private addComment: (comment: Comment) => void;
  @Getter private comments: Comment[];
  @Getter private user: User;

  private commentFormVisible: boolean = true;

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
