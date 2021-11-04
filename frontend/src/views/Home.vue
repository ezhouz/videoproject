<template>
  <section class="home-page">
    <Homeheader />
    <Uploadfunvideo />
    <Homepagebuttons />
    <Countdown />
    <Telethon />
  </section>
</template>

<script>
import Homeheader from "../components/Homepage/Homeheader.vue";
import Uploadfunvideo from "../components/Homepage/Uploadfunvideo.vue";
import Homepagebuttons from "../components/Homepage/Homepagebuttons.vue";
import Countdown from "../components/Countdown.vue";
import Telethon from "../components/Telethon.vue";
export default {
  name: "Home",
  components: {
    Homeheader,
    Uploadfunvideo,
    Homepagebuttons,
    Countdown,
    Telethon,
  },
  data() {
    return {};
  },
};
</script>
