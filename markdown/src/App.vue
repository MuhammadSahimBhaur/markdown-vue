<template>
  <div>
    <AddMarkdown />
  </div>
</template>

<script>
import AddMarkdown from "./components/AddMarkdown.vue";

export default {
  name: "App",
  components: {
    AddMarkdown,
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  margin-left: 60px;
  display: flex;
}
</style>
