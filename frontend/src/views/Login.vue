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
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser(email, password) {
      console.log(email, password);
      try {
        const loggedInUser = await axios({
          method: "POST",
          url: "http://localhost:3000/auth/login",
          data: {
            email,
            password
          },
        });

        console.log(loggedInUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
</style>