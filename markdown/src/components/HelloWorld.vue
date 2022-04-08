<template>
  <div>
    <div>Markdown!</div>
    <div>
      <Markdown :html="true" :source="source" />
      <textarea type="text" v-model="source" />
    </div>

    <button v-on:click="savePost">Save</button>
    <div v-for="item in md" :key="item.id">
      <!-- <div>{{ item }}</div> -->
      <Markdown :html="true" :source="item.start" />
    </div>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  components: {
    Markdown,
  },
  data() {
    return {
      source: "",
    };
  },
  computed: {
    md() {
      return this.$store.getters.getMd;
    },
  },
  methods: {
    savePost() {
      const { source } = this;
      // this.$store.commit("addMarkdown", source);
      this.$store.dispatch("savePosts", source);
      // console.log(source);
    },
  },
  created() {
    this.$store.dispatch("loadPosts");
  },
};
</script>
