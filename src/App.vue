<template>
  <div id="app">
    <!-- Navigation -->
    <Navbar />
    <!-- Main -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.content {
  height: calc(100% - 56px);
}
</style>
