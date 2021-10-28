<template>
  <section class="countdown-wrapper">
    <article class="countdown-text-wrapper">
      <div class="countdown-text-header">
        Countdown to the Chanukah Telethon
      </div>
      <hr />
      <ul
        class="countdown-ul"
        v-for="(eventListItem, index) in eventListItems"
        :key="index"
      >
        <li class="countdown-li">{{ eventListItem }}</li>
      </ul>
    </article>
    <article class="couwntdown-numbers">
      <div class="countdown-days">
        <img src="../../public/images/home/Intersection_2.png" alt="" />
      </div>
      <div class="countdown-hours"></div>
      <div class="countdown-minutes"></div>
      <div class="countdown-seconds"></div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      eventListItems: ["Contest Winners", "Celebration", "Birthday Presents"],
    };
  },
  methods: {},
};
</script>

<style scoped>
.countdown-wrapper {
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
}
</style>