<template>
  <section id="date-converter" class="date-converter-wrapper">
    <article v-if="!hideHeader" class="birthdays-header-text">
      <h1 class="when-is">WHEN IS MY JEWISH BIRTHDAY?</h1>
      <h2 class="lets-convert">LET'S CONVERT THE DATES</h2>
    </article>
    <div class="date-converter">
      <article class="mt-4 d-flex datepicker-container">

        <b-input-group class="mb-3 date-picker-wrapper">
          <div class="date-picker-wrapper-inner d-flex flex-column justify-content-start align-items-start">
            <b-form-input
                id="date"
                v-model="formattedDate"
                type="text"
                v-mask="dateMask"
                placeholder="What is your date of birth?"
                autocomplete="off"
                @keyup="onInputChanged($event)"
                class="datepicker-input"
            ></b-form-input>
            <div class="date-picker-tip">Use the following format: MM/DD/YYYY</div>
            <div class="date-picker-tip">(We won't share the year)</div>
          </div>
          <b-input-group-append>
            <b-form-datepicker
                button-only
                locale="en-US"
                v-model="uploaderDOBEnglish"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                aria-controls="example-input"
                class="mb-3 datepicker-btn"
                @context="onDateContext($event)"
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>

        <b-button
            class="hebrew-convert-button btn btn-primary"
            @click="convertDate(JSON.stringify(uploaderDOBEnglish))"
        >
          {{ buttonLabel || 'Submit' }}
        </b-button>
      </article>
    </div>
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
      formattedDate: '',
      uploaderDOBEnglish: '',
      uploaderDOBHebrew: '',
      uploaderDOBHebrewMessage: "",
      dateMask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    };
  },

  methods: {
    async convertDate(date) {
      try {
        date = this.uploaderDOBEnglish;
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
    onDateContext(e) {
      console.log(e)
      if (e.selectedDate) {
        this.formattedDate = e.selectedFormatted ? e.selectedFormatted.replaceAll(/(^-)(\d{1})-/g, "0$1") : '';
      }
    },
    onInputChanged(event) {
      const split = event.target.value.split('/');
      if (split.filter(v => !!v.trim()).length === 3) {
        const year = parseInt(split[2]);
        if (year > 1900 && year <= 2010) { // 11 - 120 years
          this.uploaderDOBEnglish = `${split[2]}-${split[0]}-${split[1]}`;
          console.log(event.target.value, this.uploaderDOBEnglish);
        }
      }
    },
  },
};
</script>

<style scoped>
.date-converter {
  display: flex;
  justify-content: center;
}

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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 500px;
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
  margin-left: 0;
}

.datepicker-container .btn:active,
.datepicker-container .btn:focus,
.datepicker-container .btn:hover,
.datepicker-container .btn.active {
  opacity: 0.8;
  background-color: #EF91DC;
}


/*-----------*/


.date-picker-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 1rem;
}

.date-picker-wrapper .date-picker-wrapper-inner {
  width: 100%;
}

.date-picker-wrapper .datepicker-input {
  border: 3px solid #EF91DC;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 5rem;
  font-size: 1.4rem;
  border-radius: 2rem !important;
  color: #316EDB;
  height: 4rem;
  margin-bottom: 1rem;
}

.date-picker-wrapper .datepicker-btn >>> .btn.dropdown-toggle {
  color: #316EDB !important;
  background-color: #fff;
  border: none;
  position: absolute;
  left: 1.2rem;
  top: 0.4rem;
  z-index: 5;
}

.date-picker-wrapper .datepicker-input >>> .text-muted,
.date-picker-wrapper .datepicker-input >>> label {
  color: #316EDB !important;
}

.date-picker-wrapper ::placeholder {
  color: #316EDB;
  font-size: 1.2em;
}

.date-picker-wrapper >>> .b-calendar-grid {
  font-size: 1.8rem;
}

.date-converter .date-picker-tip {
  font-size: 1.4rem;
  padding-left: 2rem;
}
</style>
