<template>
  <section class="countdown-wrapper">
    <article class="countdown-text-wrapper">
      <div class="countdown-text-header">
        Countdown to the <br />Chanukah Telethon
      </div>
      <hr class="telethon-hr" />
      <ul class="countdown-ul">
        <li
          v-for="(eventListItem, index) in eventListItems"
          :key="index"
          class="countdown-li"
        >
          <div class="countdown-icon">
            <BIconCheck style="background: #febf59; border-radius: 50%" />
          </div>
          <div>
            {{ eventListItem }}
          </div>
        </li>
      </ul>
    </article>
    <article class="countdown-numbers">
      <div class="numbers-wrapper">
        <div class="countdown-image-container countdown-days">
          <img src="../../public/images/home/Intersection_2.png" alt="" />
          <div class="countdown-number-wrapper-image">
            <h3>{{ timeRemaining.days }}</h3>
            <h5>Days</h5>
          </div>
        </div>

        <div class="countdown-text-number-wrapper countdown-hours blue-back">
          <div class="">
            <h3>{{ timeRemaining.hours }}</h3>
            <h5>Hours</h5>
          </div>
        </div>
      </div>

      <div class="numbers-wrapper minutes-and-seconds">
        <div class="countdown-text-number-wrapper yellow-back">
          <div class="">
            <h3>{{ timeRemaining.minutes }}</h3>
            <h5>Minutes</h5>
          </div>
        </div>

        <div class="countdown-text-number-wrapper pink-back">
          <div class="">
            <h3>{{ timeRemaining.seconds }}</h3>
            <h5>Seconds</h5>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { BIconCheck } from "bootstrap-vue";
export default {
  name: "Countdown",
  components: {
    BIconCheck,
  },
  data() {
    return {
      eventListItems: [
        "8 Contest Winners",
        "VIP Celebrity Birthday Party",
        "Receive Birthday Gifts on Live Stage at the Chanukah Telethon",
      ],
      timeRemaining: null,
    };
  },
  methods: {
    countdown() {
      // Set the date we're counting down to
      let countDownDate = new Date("Dec 5, 2021 19:00:00").getTime();

      // Update the count down every 1 second
      setInterval(() => {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));

        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        this.timeRemaining = { days, hours, minutes, seconds };
      }, 1000);
    },
  },
  created() {
    this.countdown();
  },
  beforeDestroy() {
    this.timeRemaining = null;
  },
};
</script>

<style scoped>
.countdown-icon {
  margin-right: 1rem;
}
.pink-back {
  background: #ef91dc;
}
.blue-back {
  background: #699af1;
}
.yellow-back {
  background: #febf59;
}
.countdown-text-number-wrapper {
  width: 11rem;
  height: 11rem;
  margin: 2rem 1rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  border-radius: 25px;
  text-align: center;
}
.numbers-wrapper {
  display: flex;
  flex-direction: row;
}
.countdown-number-wrapper-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  border-radius: 30px;
}
.countdown-number-wrapper-image h3,
.countdown-text-number-wrapper h3 {
  font-size: 3rem;
  font-weight: normal;
}
.countdown-number-wrapper-image h5,
.countdown-text-number-wrapper h5 {
  font-size: 2rem;
  font-weight: bold;
}
.countdown-image-container {
  width: 11rem;
  height: auto;
  margin: 2rem 1rem;
  position: relative;
}
.countdown-image-container img {
  width: 100%;
  height: auto;
}
.countdown-wrapper {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.countdown-text-header {
  font-size: 4rem;
  font-weight: 900;
}
.telethon-hr {
  border-top: 4px solid transparent;
  margin: 3rem 2rem 3rem 0;
}
.countdown-ul {
  list-style: none;
  padding: 0;
}
.countdown-li {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1rem;
}
.countdown-li {
  display: flex;
  margin-right: 2rem;
  font-size: 2.5rem;
}
.countdown-numbers {
  display: flex;
  flex-direction: column;
}

.countdown-wrapper {
  flex-direction: row;
}
.countdown-numbers {
  display: flex;
  flex-direction: row;
}
.numbers-wrapper {
  flex-direction: column;
}
.countdown-ul {
  padding-left: 2rem;
}
.countdown-wrapper {
  margin: 5rem;
}

.countdown-days {
  margin: 0 0 0 -1rem;
  width: 13rem;
}

.countdown-hours {
  margin-top: 4rem;
}

</style>
