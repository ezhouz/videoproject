<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <a href="/"><img height="50px" src="./assets/logo.png" alt="" /></a>
        </b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/vote">Vote</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/about-birthdays"
                >About Jewish Birthdays</router-link
              >
            </b-nav-item>
            <b-nav-item>
              <router-link to="/uploadvideo">Upload</router-link>
            </b-nav-item>

            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Account</em>
              </template>
              <b-dropdown-item href="register">Register</b-dropdown-item>
              <b-dropdown-item href="login">Log in</b-dropdown-item>
              <b-dropdown-item href="logout">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <div class="icon-yellow-wrapper">
              <b-icon-facebook />
            </div>
            <div class="icon-yellow-wrapper">
              <b-icon-instagram />
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { BIconFacebook, BIconInstagram } from "bootstrap-vue";
export default {
  components: {
    BIconFacebook,
    BIconInstagram,
  },
};
</script>


<style>
#app {
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
}
body,
html {
  font-size: 62.5%;
}
.nav-item a {
  color: #000;
  text-decoration: none;
}
.icon-yellow-wrapper {
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  background: #febf59;
  border-radius: 50%;
}
.nav-item {
  font-size: 1.8rem;
}
</style>
