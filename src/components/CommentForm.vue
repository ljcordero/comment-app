<template>
  <div class="shadow rounded px-5 py-4 text-start">
    <h3 class="mb-4">Tu Comentario</h3>
    <quill-editor v-model="content" />
    <div class="mt-4">
      <button
        @click="cancel"
        type="button"
        class="btn btn-danger"
        style="margin-right: 15px"
      >
        Cancelar
      </button>
      <button @click="save" type="button" class="btn btn-primary">
        Guardar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommentForm extends Vue {
  @Prop() private value: string;

  private content: string = "";

  private mounted(): void {
    this.content = this.value || "";
  }

  private cancel(): void {
    this.$emit("cancel");
  }

  private save(): void {
    if (!!this.content) {
      this.$emit("save", this.content);
      this.content = "";
    } else {
      alert("Empty comment");
    }
  }
}
</script>

<style scoped lang="scss">
</style>
