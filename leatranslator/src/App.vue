<template>
  <v-app id="app">
    <ColorTranslator />
  </v-app>
</template>

<script>
import ColorTranslator from "./components/ColorTranslator.vue";

export default {
  name: "app",
  components: {
    ColorTranslator
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
