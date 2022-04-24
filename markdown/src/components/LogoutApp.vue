<template>
  <div>
    <h3>Login</h3>
    <form action="submit" @submit.prevent="">
      <label for="username">Username</label>
      <br />
      <input type="text" id="username" v-model="username" />
      <br />
      <label for="password">Password</label>
      <br />
      <input type="text" id="username" v-model="password" />
      <br />
      <button type="submit" v-on:click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginApp",
  data() {
    return { username: "", password: "" };
  },
  methods: {
    login() {
      const { username, password } = this;
      // console.log(username, password);
      let loggedin = this.$store.dispatch("login", { username, password });
      if (loggedin) {
        this.$router.push("/");
      }
    },
  },
};
</script>
