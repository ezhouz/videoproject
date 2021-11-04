<template>
  <section id="date-converter">
    <article v-if="!hideHeader" class="birthdays-header-text">
      <h1 class="when-is">WHEN IS MY JEWISH BIRTHDAY?</h1>
      <h2 class="lets-convert">LET'S CONVERT THE DATES</h2>
    </article>
    <article class="mt-4 d-flex align-items-center justify-content-center flex-row datepicker-container">
      <b-form-datepicker
        id="date"
        placeholder="What is your date of birth?"
        v-model="uploaderDOBEnglish"
        class="mb-3 datepicker"
      ></b-form-datepicker>

      <b-button
        class="hebrew-convert-button btn btn-primary"
        @click="convertDate(JSON.stringify(uploaderDOBEnglish))"
      >
        {{ buttonLabel || 'Submit' }}
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
  props: [
      'hideHeader',
      'buttonLabel'
  ],
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
        date = date ? date.replaceAll('"', "") : date;
        const hebrewDate = await axios.post(`api/post/convertdate`, {
          date,
        });
        if (hebrewDate) {
          this.uploaderDOBHebrewMessage = `${hebrewDate.data.date} ${hebrewDate.data.month_name}`;
          this.uploaderDOBHebrew = `${hebrewDate.data.date}-${hebrewDate.data.month_name}`;
        }
      } catch (error) {
        console.log(error);
      }
      this.$emit('changed', {
        dob: date,
        hebrewDob: this.uploaderDOBHebrew,
      })
    },
  },
};
</script>

<style scoped>
.birthdays-header-text {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.datepicker-container {

}

.datepicker >>> .btn[type=button] {
  color: #316EDB !important;
}
.datepicker >>> .text-muted,
.datepicker >>> label {
  color: #316EDB !important;
}
.datepicker.form-control {
  border: 3px solid #EF91DC;
  width: 300px;
  padding: 0.25rem 1rem;
  font-size: 1.6rem;
  border-radius: 2rem;
  color: #316EDB;
  margin-top: 1rem;
}


.datepicker-container .btn {
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #EF91DC;
  border: none;
  padding: 0.75rem 2.2rem;
  border-radius: 2rem;
  color: #fff;
  text-transform: uppercase;
  margin-left: 2rem;
}
.datepicker-container .btn:active,
.datepicker-container .btn:focus,
.datepicker-container .btn:hover,
.datepicker-container .btn.active {
  opacity: 0.8;
  background-color: #EF91DC;
}
</style>
