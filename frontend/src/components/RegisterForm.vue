<template>
  <article class="register-form">
    <div style="font-size: 1.6rem">
      <div v-if="showError">
        <div v-for="(message, index) in errorMessages" :key="index" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
      <div v-if="showSuccess">
        <div class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>
      </div>
    </div>

    <form class="register-user" v-if="showForm" @submit.prevent="registerUser(user)">
      <b-form-group id="firstname" label="First Name:" label-for="firstname">
        <b-form-input
          id="firstname"
          v-model="user.firstname"
          type="text"
          placeholder="First Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="lastname" label="Last Name:" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="user.lastname"
          type="text"
          placeholder="Last Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="email" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="Passwords must be at least 8 characters"
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
      <div class="d-flex align-items-center justify-content-center" style="width: 100%">
        <b-button
            type="submit"
        >Submit</b-button
        >
      </div>
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
      errorMessages: [],
      showSuccess: false,
      successMessage: "",
      showForm: true,
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
      
      this.errorMessages = [];
      const user = userInput;
      console.log(user.password.length)

      if (user.password !== user.passwordrepeat) {
        this.showError = true;
        this.errorMessages.push("Passwords don't match");
        return;
      }
      if(user.password.length < 8) {
        this.showError = true;
        this.errorMessages.push("Password must be at least 8 characters")
        return
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
          this.showSuccess = true;
          this.successMessage = newuser.data.message;
          this.showForm = false;
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

<style>
.register-user {
  width:  50%;
  margin:  0 auto;
}
.register-user div {
  font-size: 1.6rem;
}
.register-user .btn[type="submit"] {
  width: auto;
  background: #febf59;
  border-radius: 20px;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  padding: 1rem 2rem;
  text-transform: uppercase;
}
.register-user .form-group label {
  margin-left: 1rem !important;
}
</style>
