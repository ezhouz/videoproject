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
        <h1 class="header-text" :class="$mq">LOGIN TO SUBMIT A VIDEO</h1>
      </div>
    </article>
    <article>
      <form style="margin: 7rem" @submit.prevent="loginUser(email, password)">
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
          >Login</b-button
        >
      </form>
    </article>

     <article>
      <p style="display: flex; justify-content: center;">
        <a href="/passwordreset"
          ><span class="reset-text">Forgot password? Reset it here.</span></a
        >
      </p>
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
          this.$router.push({
            name: "UploadVideo",
          });
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