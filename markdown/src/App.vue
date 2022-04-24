<template>
  <div>
    <div v-if="!loggedIn">
      <router-link v-if="!isOnLoginPage()" to="/login">Login</router-link
      ><router-view />
    </div>
    <div v-if="loggedIn">
      <router-link v-if="!isOnLoginPage()" to="/login" v-on:click="logout()"
        >Logout</router-link
      >
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    loggedIn() {
      return this.$store.getters.getLoggedIn;
    },
  },
  methods: {
    isOnLoginPage: function () {
      return this.$route.path === "/login";
    },
    logout: function () {
      this.$store.dispatch("logout");
    },
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
