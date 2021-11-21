<template>
  <section>
    <Header title="ENTER THE CONTEST AND SUBMIT A VIDEO" />
    <div class="register-section">

      <date-converter button-label="Register" hide-header="false" v-on:changed="onDateChanged($event)" />

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

      <div class="rules">
        <h2>RULES:</h2>

        <p><span class="bold">Videos must be uploaded</span> by December 1</p>

        <p><span class="bold">VIP Celebrity Birthday Party</span>  Date To Be Announced

        <p><span class="bold">Winners Announced</span> on December 2</p>

        <p>Chanukah Telethon is on Sunday Dec 5, 2021 7pm-10pm</p>

        <p class="bold">No costs to join. Open to all ages 12-120.</p>

        <p style="font-style: italic">Winning contestants are responsible for their own transportation to the VIP Celebrity Birthday Party in Nassau County NY and to the Live Telethon Studio in Ronkonkoma Long Island.</p>

      </div>
    </div>


  </section>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import DateConverter from "../components/DateConverter";
import Header from "../components/Header";

export default {
  name: "Register",
  components: {
    Header,
    DateConverter,
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
    onDateChanged(val) {
      this.uploaderDOBEnglish = val.dob;
      this.uploaderDOBHebrew = val.hebrewDob;
      this.uploaderDOBHebrewMessage = val.hebrewDob;
    }
  },
};
</script>


<style scoped>

.register-section {
  margin: 3rem;
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

.rules {
  font-size: 2rem;
}
.rules h2 {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 2rem 0;
}
</style>
