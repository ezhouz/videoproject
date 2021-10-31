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
              <router-link to="/uploadvideo">Upload</router-link>
            </b-nav-item>
            <b-nav-item-dropdown>
              <template #button-content>
                <em>About</em>
              </template>
              <b-dropdown-item class="dropdown-nav-item" href="about"
                >About Us</b-dropdown-item
              >
              <b-dropdown-item class="dropdown-nav-item" href="about-birthdays"
                >Jewish Birthdays</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown>
              <template #button-content>
                <em>Account</em>
              </template>
              <b-dropdown-item class="dropdown-nav-item" href="register"
                >Register</b-dropdown-item
              >
              <b-dropdown-item class="dropdown-nav-item" href="login"
                >Log in</b-dropdown-item
              >
              <b-dropdown-item class="dropdown-nav-item" href="logout"
                >Log Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Cart</em>
              </template>
              <b-dropdown-item>
                <CartItems />
              </b-dropdown-item>
            </b-nav-item-dropdown>

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
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { BIconFacebook, BIconTwitter } from "bootstrap-vue";
import CartItems from "./components/CartItems.vue";
export default {
  components: {
    BIconFacebook,
    BIconTwitter,
    CartItems,
  },
  data() {
    return {};
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
.dropdown-nav-item {
  font-size: 1.6rem;
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
  font-size: 1.8rem;
  margin-right: 1rem;
}
</style>
