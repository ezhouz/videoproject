<template>
  <section class="">
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/register/Intersection_3_bl.png"
          alt=""
          class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">
          ENTER THE CONTEST AND SUBMIT A VIDEO
        </h1>
      </div>
    </article>

    <article class="d-flex align-items-center flex-column">
      <label class="display-4 mt-4 mb-5" for="date"
        >Enter your Date of Birth</label
      >
      <b-form-datepicker
        id="date"
        v-model="uploaderDOBEnglish"
        class="mb-2"
      ></b-form-datepicker>

      <b-button
        class="hebrew-convert-button"
        @click="convertDate(JSON.stringify(uploaderDOBEnglish))"
      >
        Show my Jewish Date of Birth and Register
      </b-button>
    </article>

    <article v-if="uploaderDOBHebrew">
      <div
        style="
          display: flex;
          justify-content: center;
          margin: 3rem auto 0rem auto;
        "
      >
        <h3 style="font-weight: 900">
          {{ uploaderDOBHebrewMessage }}
        </h3>
      </div>
      <RegisterForm :engdob="uploaderDOBEnglish" :hebdob="uploaderDOBHebrew" />
    </article>
    
    <article>
      <p style="display: flex; justify-content: center; margin: 3rem auto">
        <a href="/login"
          ><span class="login-text">I have an account. Login.</span></a
        >
      </p>
    </article>


  </section>
</template>

<script>
import axios from "axios";
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "Register",
  components: {
    RegisterForm,
  },
  data() {
    return {
      uploaderDOBEnglish: "",
      uploaderDOBHebrew: "",
      uploaderDOBHebrewMessage: "",
    };
  },

  methods: {
    async convertDate(date) {
      try {
        const hebrewDate = await axios.post(`api/post/convertdate`, {
          date,
        });
        if (hebrewDate) {
          this.uploaderDOBHebrewMessage = `Your Jewish Date of birth is ${hebrewDate.data.date} ${hebrewDate.data.month_name} ${hebrewDate.data.year}`;
          this.uploaderDOBHebrew = `${hebrewDate.data.date}-${hebrewDate.data.month_name}-${hebrewDate.data.year}`;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
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
.b-form-btn-label-control.form-control {
  width: 60%;
  font-size: 2rem;
}
.hebrew-convert-button {
  font-size: 2rem;
  margin-top: 2rem;
}
.register-button {
  margin-top: 2rem;
  width: 31rem;
  height: 6rem;
  color: #fff;
  border-radius: 4rem;
  font-size: 2.6rem;
  font-weight: bold;
  background: #ef91dc;
}

.login-text {
  font-size: 2.3rem;
  font-weight: bold;
  color: #ef91dc;
  text-decoration: none;
}
</style>