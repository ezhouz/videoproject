import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Vote from "../views/Vote.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import UploadVideo from "../views/UploadVideo";
import Logout from "../views/Logout";

Vue.use(VueRouter);

import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/uploadvideo",
    name: "UploadVideo",
    component: UploadVideo,
    meta: { requiresAuth: true },
  },
  {
    path: "/vote",
    name: "Vote",
    component: Vote,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentToken = localStorage.getItem("chabadtoken");

    const config = {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    };

    axios
      .post(`http://${process.env.VUE_APP_BACKEND_URL}/post/validatetoken`, {}, config)
      .then((res) => {
        if (res.data.status !== 200) {
          next({ name: "Login" });
        } else {
          next();
        }
      });
  } else {
    next();
  }
});

export default router;
