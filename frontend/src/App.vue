<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light" class="main-navbar navbar-inverse">
        <b-navbar-toggle target="nav-text-collapse" class="navbar-toggler-right">Menu</b-navbar-toggle>

        <b-navbar-brand>
          <a href="/"><img class="app-logo" src="./assets/logo.svg" alt="" /></a>
        </b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/vote">Vote</router-link>
            </b-nav-item>
            <b-nav-item v-if="currentUser">
              <router-link to="/uploadvideo">Upload</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/about">About</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/about-birthdays">Jewish Birthdays</router-link>
            </b-nav-item>
            <b-nav-item v-if="!currentUser">
              <router-link to="/register">Register</router-link>
            </b-nav-item>
            <b-nav-item v-if="!currentUser">
              <router-link to="/login">Login</router-link>
            </b-nav-item>
            <b-nav-item v-if="currentUser">
              <router-link to="/logout">Logout</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>

        <b-navbar-nav class="ml-auto header-social-buttons">

          <div class="icon-yellow-wrapper">
            <a href="https://www.facebook.com/rabbiperl">
              <b-icon-facebook />
            </a>
          </div>
          <div class="icon-yellow-wrapper">
            <a href="https://twitter.com/RabbiPerl">
              <b-icon-twitter />
            </a>
          </div>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { BIconFacebook, BIconTwitter } from "bootstrap-vue";
export default {
  components: {
    BIconFacebook,
    BIconTwitter,
  },
  created() {
    if(localStorage.getItem("chabadtoken")) {
      this.currentUser = true;
    }

  },
  data() {
    return {
      currentUser: null
    };
  },
};
</script>


<style>
@import url("./assets/styles/common.css");

#app {
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
}

.main-navbar.navbar {
  margin: 0;
  padding: 0;
  background-color: #fff !important;
}

#nav-text-collapse {
  justify-content: center;
}

.app-logo {
  height: 110px;
  margin-left: 10rem;
  padding: 1rem;
;
}

.nav-item a {
  color: #000;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
}

.icon-yellow-wrapper {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  background: #febf59;
  border-radius: 50%;
}
.icon-yellow-wrapper a {
  font-size: 1.6rem;
}
.nav-item {
  font-size: 1.4rem;
  margin-right: 1rem;
}
</style>
