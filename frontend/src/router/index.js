import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Vote from "../views/Vote.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import UploadVideo from "../views/UploadVideo";
import Logout from "../views/Logout";
import AboutBirthdays from "../views/AboutBirthdays";
import Success from "../views/Success";
import About from "../views/About";
import Passwordreset from "../views/Passwordreset"
import PasswordResetFinish from "../views/PasswordResetFinish";
import EmailConfirmed from "../views/EmailConfirmed";
import UploadSuccess from "../views/UploadSuccess";
import PlayVideo from "../views/PlayVideo";
import Admin from "../views/Admin";

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
    path: "/about-birthdays",
    name: "AboutBirthdays",
    component: AboutBirthdays,
  },
  {
    path: "/about",
    name: "About",
    component: About,
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
    path: "/email-confirmed",
    name: "EmailConfirmed",
    component: EmailConfirmed,
  },
  {
    path: "/upload-success",
    name: "UploadSuccess",
    component: UploadSuccess,
  },
  {
    path: "/play-video/:id",
    name: "PlayVideo",
    component: PlayVideo,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/passwordreset",
    name: "Passwordreset",
    component: Passwordreset,
  },
  {
    path: "/passwordresetfinish",
    name: "PasswordResetFinish",
    component: PasswordResetFinish,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },

  {
    path: '*',
    component: Home 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentToken = localStorage.getItem("chabadtoken");

    const config = {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    };

    const tokenStatus = await axios.post("api/post/validatetoken", {}, config);

    if (tokenStatus.data.status !== 200) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
