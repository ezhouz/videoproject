<template>
  <section>
    <Header title="LOGIN TO SUBMIT A VIDEO" />

    <div class="login-section">
      <article class="form-wrapper">
        <form @submit.prevent="loginUser(email, password)">
          <b-form-group id="email" label="Email:" label-for="email">
            <b-form-input
                id="email"
                v-model="email"
                type="email"
                placeholder="Email"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="password" label="Password:" label-for="password">
            <b-form-input
                id="password"
                v-model="password"
                type="password"
                placeholder="Password"
                required
            ></b-form-input>
          </b-form-group>
          <div v-if="showError">
            <div class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center" style="width: 100%">
            <b-button
                type="submit"
            >Login</b-button
            >
          </div>
        </form>
      </article>

      <article>
        <p style="display: flex; justify-content: center;">
          <a href="/register"
          ><span class="reset-text">I don't have an account. Register here</span></a
          >
        </p>
      </article>
      <article>
        <p style="display: flex; justify-content: center;">
          <a href="/passwordreset"
          ><span class="reset-text reset-password-text">Forgot password? Reset it here.</span></a
          >
        </p>
      </article>

    </div>
  </section>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";

export default {
  name: "Login",
  components: {Header},
  data() {
    return {
      showError: false,
      errorMessage: "",
      email: "",
      password: "",
      accountConfirmed: '',
      accountConfirmedMessage: ''
    };
  },
  methods: {
    async loginUser(email, password) {
      try {
        const loggedInUser = await axios.post(`api/auth/login`, {
          email,
          password,
        });

        if (loggedInUser.data.status === 401) {
          this.showError = true;
          this.errorMessage = loggedInUser.data.message
        } else {
          localStorage.setItem("chabadtoken", loggedInUser.data.token);
          await this.$router.push({
            name: "UploadVideo",
          });
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
.login-section .form-wrapper form {
  margin: 7rem;
}
.login-section .form-wrapper {
  width: 50%;
  margin: 0 auto;
}
.login-section {
  margin: 3rem;
}

.login-section .btn[type="submit"] {
  width: auto;
  background: #febf59;
  border-radius: 20px;
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  padding: 0.5rem 2rem;
  text-transform: uppercase;
}

.reset-text {
  font-size: 2.3rem;
  font-weight: bold;
  color: #ef91dc;
  text-decoration: none;
}

.reset-password-text {
  font-size: 1.6rem;
}

form div {
  font-size: 1.6rem;
}

</style>
