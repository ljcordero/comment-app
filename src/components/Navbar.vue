<template>
  <nav
    class="
      navbar
      shadow
      bg-white
      rounded
      justify-content-between
      flex-nowrap flex-row
      fixed-top
    "
  >
    <div class="container">
      <a class="navbar-brand float-left"> Comments </a>
      <ul class="nav navbar-nav flex-row float-right">
        <li class="nav-item">
          <span
            v-if="isAuthenticated"
            class="nav-link pr-3 log-out"
            @click="signOut"
            >Log out</span
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class HelloWorld extends Vue {
  @Getter private isAuthenticated: boolean;
  @Action private logOut: () => void;

  private signOut(): void {
    this.logOut();
    router.push("/");
  }
}
</script>

<style scoped lang="scss">
.log-out {
  cursor: pointer;
}
</style>
