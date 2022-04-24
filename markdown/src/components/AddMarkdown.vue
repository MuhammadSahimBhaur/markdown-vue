<template>
  <div>
    <div>
      <button v-on:click="save">Save</button>
      <h2>Markdown</h2>
      <div>
        <Markdown :html="true" :source="source" />
        <textarea type="text" v-model="source" />
      </div>

      <button v-on:click="savePost">Add</button>
      <div v-for="item in md" :key="item._id">
        <div class="item">
          <Markdown :html="true" :source="item.start" class="mrkdwn" />
          <button class="delbtn" v-on:click="deletePost(item.key)">
            Delete
          </button>
        </div>
      </div>
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
      deleteId: "",
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
      this.$store.dispatch("savePosts", source);
      // console.log(source);
    },
    deletePost(key) {
      this.$store.dispatch("deletePost", key);
      // this.$store.dispatch("loadPosts");
      // console.log("Hey comp", ID);
      // this.$store.dispatch("loadPosts");
    },
    save() {
      const { source } = this;
      this.$store.dispatch("save", source);
    },
  },
  created() {
    this.$store.dispatch("loadPosts");
  },
};
</script>

<style scoped>
/* .item {
  display: flex;
  align-items: center;
}
.mrkdwn {
  margin: 5px;
  flex: 50%;
  width: 250px;
} */
</style>