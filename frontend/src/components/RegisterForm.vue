<template>
  <article>
    <div v-if="showError">
      <div class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </div>
    <form @submit.prevent="registerUser(user)">
      <b-form-group
        id="firstname"
        label="First Name:"
        label-for="firstname"
      >
        <b-form-input
          id="firstname"
          v-model="user.firstname"
          type="text"
          placeholder="First Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="lastname"
        label="Last Name:"
        label-for="lastname"
      >
        <b-form-input
          id="lastname"
          v-model="user.lastname"
          type="text"
          placeholder="Last Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="email"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="passwordrepeat"
        label="Repeat Password:"
        label-for="passwordrepeat"
      >
        <b-form-input
          id="passwordrepeat"
          v-model="user.passwordrepeat"
          type="password"
          placeholder="Repeat Password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button style="width: 100%; background: #febf59; border-radius: 4rem; height: 4rem; font-size: 2rem; border: none;" type="submit">Submit</b-button>
    </form>
  </article>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  props: ["engdob", "hebdob"],
  data() {
    return {
      showError: false,
      errorMessage: "",
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordRepeat: "",
      },
    };
  },
  methods: {
    async registerUser(userInput) {
      const user = userInput;

      if (user.password !== user.passwordrepeat) {
        this.showError = true;
        this.errorMessage = "Passwords don't match";
        return;
      }
      user.uploaderDOBEnglish = this.engdob;
      user.uploaderDOBHebrew = this.hebdob;
      try {
        const newuser = await axios.post(`api/auth/register`, {
          user,
        });

        if (newuser.data.status === 201) {
          this.showError = true;
          this.errorMessage = newuser.data.message;
        } else if (newuser.data.status === 200) {
          this.$router.push("/login");
        } else {
          this.showError = true;
          this.errorMessage = newuser.data.message;
        }
      } catch (error) {
        this.showError = true;
        this.errorMessage = error;
      }
    },
  },
};
</script>

<style scoped>
form div {
  font-size: 1.6rem;
}

</style>