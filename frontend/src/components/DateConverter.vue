<template>
  <section>
    <article class="birthdays-header-text">
      <h1 class="when-is">WHEN IS MY JEWISH BIRTHDAY?</h1>
      <h2 class="lets-convert">LET'S CONVERT THE DATES</h2>
    </article>
    <article class="d-flex align-items-center flex-column">
      <label style="font-size: 2rem" class="mt-4 mb-2" for="date"
        >Enter your Date of Birth</label
      >
      <b-form-datepicker
        id="date"
        v-model="uploaderDOBEnglish"
        class="mb-3"
      ></b-form-datepicker>

      <b-button
        class="hebrew-convert-button"
        @click="convertDate(JSON.stringify(uploaderDOBEnglish))"
      >
        Show my Jewish Date of Birth
      </b-button>
    </article>
    <article v-if="uploaderDOBHebrew">
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 3rem auto 0rem auto;
        "
      >
        <h3 style="font-weight: 900; color: #ef91dc">
          Your Jewish Date of birth is
        </h3>
        <h3 style="font-weight: 900; color: #3168db">
          {{ uploaderDOBHebrewMessage }}
        </h3>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "DateConverter",

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
          this.uploaderDOBHebrewMessage = `${hebrewDate.data.date} ${hebrewDate.data.month_name} ${hebrewDate.data.year}`;
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
.birthdays-header-text {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.when-is {
  font-weight: 900;
  color: #ef91dc;
}
.lets-convert {
  color: #3168db;
  font-weight: 800;
}
.hebrew-convert-button {
  font-size: 1.6rem;
}
</style>
