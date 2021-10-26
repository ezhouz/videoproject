<template>
  <section>
    <article>
      <label for="date">Enter your DOB</label>
      <input v-model="uploaderDOBEnglish" type="date" name="" id="date" />
      <button @click="convertDate(JSON.stringify(uploaderDOBEnglish))">
        Submit
      </button>
    </article>

    <article v-if="uploaderDOBHebrew">
      {{ uploaderDOBHebrewMessage }}

      <h2>Register</h2>

      <div v-if="showError">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="registerUser(user)">
        <input type="hidden" name="hebDate" />

        <label for="firstname">First Name</label>
        <input
          v-model="user.firstname"
          type="text"
          name="firstname"
          id="firstname"
        />

        <label for="lastname">First Name</label>
        <input
          v-model="user.lastname"
          type="text"
          name="lastname"
          id="lastname"
        />

        <label for="email">Email</label>
        <input v-model="user.email" type="email" name="email" id="email" />

        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          name="password"
          id="password"
        />

        <label for="passwordrepeat">Repeat Password</label>
        <input
          v-model="user.passwordrepeat"
          type="password"
          name="passwordrepeat"
          id="passwordrepeat"
        />

        <button>Register</button>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      showError: false,
      errorMessage: "",
      uploaderDOBEnglish: "",
      uploaderDOBHebrew: "",
      uploaderDOBHebrewMessage: "",
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordRepeat: "",
      },
    };
  },

  methods: {
    async convertDate(date) {
      try {
        const hebrewDate = await axios.post(`api/post/convertdate`, {
          date,
        });
        if (hebrewDate) {
          this.uploaderDOBHebrewMessage = `Your Hebrew Date of birth is ${hebrewDate.data.date} ${hebrewDate.data.month_name} ${hebrewDate.data.year}`;
          this.uploaderDOBHebrew = `${hebrewDate.data.date}-${hebrewDate.data.month_name}-${hebrewDate.data.year}`;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async registerUser(userInput) {
      const user = userInput;

      if (user.password !== user.passwordrepeat) {
        this.showError = true;
        this.errorMessage = "Passwords don't match";
        return;
      }
      user.uploaderDOBEnglish = this.uploaderDOBEnglish;
      user.uploaderDOBHebrew = this.uploaderDOBHebrew;
      try {
        const newuser = await axios.post(`api/auth/register`, {
          user,
        });

        if (newuser.data.status === 201) {
          this.showError = true;
          this.errorMessage = newuser.data.message;
        } else if (newuser.data.status === 200) {
          this.$router.push("/login");
        } else {
          this.showError = true;
          this.errorMessage = newuser.data.message;
        }
      } catch (error) {
        this.showError = true;
        this.errorMessage = error;
      }
    },
  },
};
</script>


<style scoped>
</style>