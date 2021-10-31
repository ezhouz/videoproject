<template>
  <section>
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/register/Intersection_3_bl.png"
          alt=""
          class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">RESET YOUR PASSWORD</h1>
      </div>
    </article>

    <article>
      <form
        style="margin: 7rem"
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
        <b-button
          style="
            width: 100%;
            margin-top: 2rem;
            background: #febf59;
            border-radius: 4rem;
            height: 4rem;
            font-size: 2rem;
            border: none;
          "
          type="submit"
          >Reset Password</b-button
        >
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "passwordreset",
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
.reset-text {
  font-size: 2.3rem;
  font-weight: bold;
  color: #ef91dc;
  text-decoration: none;
}
form div {
  font-size: 1.6rem;
}
.image-header {
  position: relative;
  text-align: center;
}

.header-text.desktop {
  font-size: 6rem;
}
.header-text.tablet {
  font-size: 4rem;
}
.header-text {
  font-size: 3rem;
  font-weight: 900;
}

.header-text-wrapper {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>