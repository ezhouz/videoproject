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
        <h1 class="header-text" :class="$mq">FINISH RESETTING YOUR PASSWORD</h1>
      </div>
    </article>

    <article>
      <form
        style="margin: 7rem"
        @submit.prevent="
          finishResettingPassword(email, newPassword, repeatNewPassword)
        "
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

        <b-form-group id="password" label="New Password:" label-for="password">
          <b-form-input
            id="password"
            v-model="newPassword"
            type="password"
            placeholder="Password ust be a minimum of 8 characters"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="repeatPassword"
          label="Repeat New Password:"
          label-for="repeatPassword"
        >
          <b-form-input
            id="repeatPassword"
            v-model="repeatNewPassword"
            type="password"
            placeholder="Repeat New Password"
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
          >Finish Resetting Password</b-button
        >
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "PasswordResetFinish",
  data() {
    return {
      email: "",
      newPassword: "",
      repeatNewPassword: "",
      showError: "",
      errorMessage: "",
      showSuccess: false,
      successMessage: "",
    };
  },
  methods: {
    async finishResettingPassword(email, newPassword, repeatNewPassword) {
      if (newPassword !== repeatNewPassword) {
        this.showError = true;
        this.errorMessage = "Passwords do not match";
        return;
      } 
      if(newPassword.length < 8) {
        this.showError = true;
        this.errorMessage = "Password much be at lest 8 characters"
      }
      else {
        const resetUser = await axios.post("api/auth/password-reset-finish", {
          email,
          newPassword,
          repeatNewPassword,
        });
        if (resetUser.data.status === 200) {
          this.showError = false
          this.showSuccess = true;
          this.successMessage = resetUser.data.message;
        } else if (resetUser.data.status === 201) {
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = resetUser.data.message;
        }
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