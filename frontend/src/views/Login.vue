<template>
  <section>
    <article class="container">

      <div id="login">
        <h3 class="text-center text-white pt-5">Login form</h3>
        <div class="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form id="login-form" class="form" @submit.prevent="loginUser(email, password)">
                  <h3 class="text-center text-info">Login</h3>
                  <div class="form-group">
                    <label for="email" class="text-info">Email Address:</label
                    ><br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password" class="text-info">Password:</label
                    ><br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    ><br />
                    <input
                      type="submit"
                      name="submit"
                      class="btn btn-info btn-md"
                      value="submit"
                    />
                  </div>
                  <div id="register-link" class="text-right">
                    <a href="/register" class="text-info">Register here</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      try {
        const loggedInUser = await axios.post(`api/auth/login`, {
          email,
          password,
        });

        if (loggedInUser) {
          localStorage.setItem("chabadtoken", loggedInUser.data.token);
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
#login .container #login-row #login-column #login-box {
  margin-top: 120px;
  max-width: 600px;
  height: 320px;
  border: 1px solid #9c9c9c;
  background-color: #eaeaea;
}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login
  .container
  #login-row
  #login-column
  #login-box
  #login-form
  #register-link {
  margin-top: -85px;
}
</style>