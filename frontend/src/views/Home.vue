<template>
  <section>
    <article class="image-header">
      <div class="header-image-wrapper">
        <div class="header-text-wrapper">
          <h1 class="header-text" :class="$mq">Let’s celebrate you.</h1>
          <h1 class="header-text" :class="$mq">The Jewish way.</h1>
          <h2 class="header-text-h2" :class="$mq">
            The Jewish Birthday Makeover Contest
          </h2>
          <h3 class="header-text-h3" :class="$mq">
            HELP CHABAD OF MINEOLA SAVE LIVES.
          </h3>
          <div class="button-wrapper">
            <a href="/about">
              <button class="learn-more-button">Learn More</button>
            </a>
          </div>
        </div>

        <div class="header-secondary-images">
          <!-- <div class="header-secondary-image-1">
            <img src="../../public/images/home/Group 511.png" alt="" />
          </div>
          <div class="header-secondary-image-2">
            <img src="../../public/images/home/Group 359.png" alt="" />
          </div> -->
        </div>
      </div>
    </article>
    <Countdown />

    <div class="once-a-year-wrapper">
      <h2>Who says birthdays come only once a year?</h2>
      <h2>
        Enter the contest. <span style="color: #ef91dc">CELEBRATE NOW.</span>
      </h2>
    </div>

    <div class="home-temp-buttons">
      <div class="home-temp-button-container" style="margin-top: 3rem">
        <a href="/about-birthdays"
          ><button style="background: #ef91dc">
            When is my Jewish birthday?
          </button></a
        >
      </div>
      <div class="home-temp-button-container">
        <a href="/uploadvideo"
          ><button style="background: #699af1">Enter the contest</button></a
        >
      </div>
      <div class="home-temp-button-container">
        <a href="/vote"
          ><button style="background-color: #ef91dc">Vote</button></a
        >
      </div>
    </div>
    <Telethon />
  </section>
</template>

<script>
import Countdown from "../components/Countdown.vue";
import Telethon from "../components/Telethon.vue";
export default {
  name: "Home",
  components: {
    Countdown,
    Telethon,
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
.home-temp-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-temp-buttons button {
  width: 30rem;
  height: auto;
  padding: 1.5rem;
  border: none;
  font-size: 3rem;
  font-weight: 700;
  border-radius: 40px;
  color: #fff;
}
.home-temp-button-container {
  margin-bottom: 3rem;
}
.home-temp-buttons button:hover {
  opacity: 0.8;
}
.once-a-year-wrapper {
  margin: 3rem;
}
.once-a-year-wrapper h2 {
  font-weight: 700;
  font-size: 3.5rem;
  color: #699af1;
  margin-bottom: 2rem;
  text-align: center;
}
.header-image-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
.header-secondary-images {
  position: absolute;
  top: 0;
  right: 0;
}
.image-header {
  position: relative;
  height: 50rem;
  background: url("../../public/images/home/Intersection 4.png");
  background-position: bottom;
}
.header-image {
  width: 100%;
  height: auto;
}
.button-wrapper {
  margin-top: 2rem;
}
.learn-more-button {
  background: #fff;
  color: #000;
  font-size: 2.4rem;
  color: #699af1;
  width: 18rem;
  height: 5.6rem;
  font-weight: 900;
  border: none;
  border-radius: 40px;
}
.learn-more-button:hover {
  background: #fefefe;
}
.header-text-h3.desktop {
  font-size: 3rem;
}
.header-text-h3.tablet {
  font-size: 2rem;
}
.header-text-h3 {
  text-align: left;
  font-weight: 500;
  margin-top: 2rem;
}
.header-text-h2.desktop {
  font-size: 4rem;
}
.header-text-h2 {
  text-align: left;
  font-weight: 700;
  margin-top: 2rem;
}
.header-text.tablet {
  font-size: 3rem;
}
.header-text.desktop {
  font-size: 6rem;
}
.header-text.tablet {
  font-size: 4rem;
}
.header-text {
  text-align: left;
  font-size: 3rem;
  font-weight: 900;
}

.header-text-wrapper {
  color: #fff;
  position: absolute;
  top: 6rem;
  left: 3rem;
}
@media (min-width: 650px) {
  .header-text-wrapper {
    left: 6rem;
  }
  .home-temp-buttons button {
    min-width: 50rem;
    height: initial;
    padding: initial;
  }

  .once-a-year-wrapper h2 {
    font-weight: 800;
    font-size: 5.6rem;
  }
}
</style>
