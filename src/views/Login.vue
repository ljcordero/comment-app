<template>
  <div class="log-in mx-auto">
    <form @submit.prevent="signIn">
      <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
      <h3>Log In</h3>
      <div class="form-group mt-3">
        <label>Email address</label>
        <input
          v-model="email"
          required
          type="email"
          class="form-control form-control-lg"
        />
      </div>
      <div class="form-group mt-3">
        <label>Password</label>
        <input
          v-model="password"
          required
          type="password"
          class="form-control form-control-lg"
        />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block mt-4">
        Log In
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { User } from "@/models/user";
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({
  components: {},
})
export default class Login extends Vue {
  @Action private logIn: (user: User) => void;

  private email: string = "";
  private password: string = "";
  private error: string = "";

  private signIn(): void {
    try {
      this.logIn({
        email: this.email,
        password: this.password,
      });
      router.push({ name: "Comments" });
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

<style scoped lang="scss">
.log-in {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 500px;
}
</style>
