<template>
  <section>
    <article>
      <h2>Log In</h2>
      <form @submit.prevent="loginUser(email, password)">
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" id="email" />

        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />

        <button>Log In</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      showError: false,
      errorMessage: "",
      email: "mediablokedeals@gmail.com",
      password: "password",
    };
  },
  methods: {
    async loginUser(email, password) {
      console.log(email, password);
      try {
        const loggedInUser = await axios.post(
          "http://localhost:3000/auth/login",
          { email, password }
        );
        console.log(loggedInUser);

        if (loggedInUser) {
          localStorage.setItem('chabadtoken', loggedInUser.data.token);
          this.$router.push({
            name: "UploadVideo",
          });
        } else {
          this.showError = true;
          this.errorMessage = loggedInUser;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
</style>