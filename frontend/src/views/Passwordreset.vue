<template>
  <section class="password-rest-section ">
    <Header title="Reset your password"/>
    <article class="reset-form">
      <form
          @submit.prevent="resetPassword(email)"
      >
        <b-form-group id="email" label="Email:" label-for="email">
          <b-form-input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              required
          ></b-form-input>
        </b-form-group>
        <div v-if="showError">
          <div class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
        </div>
        <div v-if="showSuccess">
          <div class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center" style="width: 100%">
          <b-button
              type="submit"
          >Reset Password
          </b-button
          >
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";

export default {
  name: "passwordreset",
  components: {Header},
  data() {
    return {
      showError: false,
      errorMessage: "",
      showSuccess: false,
      successMessage: "",
      email: "",
    };
  },
  methods: {
    async resetPassword(email) {
      try {
        const existingUserSearch = await axios.post("api/auth/password-reset", {
          email,
        });
        if (existingUserSearch.data.status === 201) {
          this.showError = true;
          this.showSuccess = false;
          this.errorMessage = existingUserSearch.data.message;
        } else {
          this.showSuccess = true;
          this.showError = false;
          this.successMessage = existingUserSearch.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

.reset-form {
  width: 50%;
  margin: 0 auto;

}

.reset-form form {
  margin: 7rem;
}


.reset-form .btn[type="submit"] {
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

form div {
  font-size: 1.6rem;
}

</style>
