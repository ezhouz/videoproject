<template>
  <section>
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/home/Intersection 4.png"
          alt=""
          class="header-image"
        />

        <div style="display: flex">
          <div>
            <div class="header-text-wrapper">
              <h1 class="header-text" :class="$mq">Let’s celebrate you.</h1>
              <h1 class="header-text" :class="$mq">The Jewish way.</h1>
              <h2 class="header-text-h2" :class="$mq">
                The Jewish Birthday Makeover Contest
              </h2>
              <h3 class="header-text-h3" :class="$mq">
                HELP CHABAD OF MINEOLA SAVE LIVES.
              </h3>
            </div>
            <div class="button-wrapper">
              <button class="learn-more-button">Learn More</button>
            </div>
          </div>

          <div class="header-secondary-images">
            <div class="header-secondary-image-1">
              <img src="../../public/images/home/Group 511.png" alt="" />
            </div>
            <div class="header-secondary-image-2">
              <img src="../../public/images/home/Group 359.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </article>
    <Countdown />
  </section>
</template>

<script>
import Countdown from "../components/Countodwn.vue";
export default {
  name: "Home",
  components: {
    Countdown,
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
.header-secondary-images {
  position: absolute;
  top: 0;
  right: 0;
}
.image-header {
  position: relative;
  text-align: center;
  height: 50rem;
}
.header-image {
  width: 100%;
  height: auto;
}
.button-wrapper {
  position: absolute;
  bottom: 6rem;
  left: 6rem;
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
  left: 6rem;
}
</style>
