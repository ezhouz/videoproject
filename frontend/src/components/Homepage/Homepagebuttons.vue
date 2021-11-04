<template>
  <section class="button-wrapper">
    <article class="top-text">
      <h2>The clock is ticking, upload your video now!</h2>
    </article>
    <article class="button-container">
      <div class="two-buttons-wrapper">
        <a href="uploadvideo">
          <button class="btn yellow-button">Submit my video</button>
        </a>
        <a href="vote">
          <button class="btn yellow-button">Vote</button>
        </a>
      </div>
      <div>
        <a href="about-birthdays">
          <button class="btn pink-button">What is a Jewish Birthday?</button>
        </a>
      </div>
      <div>
        <a href="about-birthdays#date-converter">
          <button class="btn blue-button">When is my Jewish Birthday</button>
        </a>
      </div>
    </article>
    <article class="bottom-text">
      <a href="about">
        <button class="btn yellow-button about-btn">About the Chanukah Telethon Dec 5, 2021</button>
      </a>
    </article>
  </section>
</template>

<script>
export default {
  name: "Homepagebuttons",
};
</script>

<style scoped>
.two-buttons-wrapper {
  display: flex;
  flex-direction: column;
}

.bottom-text h2 {
  font-size: 2.5rem;
  text-align: center;
  font-weight: 400;
  margin-top: 3rem;
  color: #000;
  text-decoration: underline;
}

.bottom-text h2:hover {
  opacity: 0.8;
}

.top-text {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 2rem;
}

.top-text h2 {
  font-size: 4rem;
  font-weight: 900;
  width: 80%;
  text-transform: uppercase;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  font-size: 4.2rem;
  color: #fff;
  font-weight: 800;
  border-radius: 6rem;
  margin: 1.5rem;
  padding: 1rem 3rem;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.pink-button {
  background: #ef91dc;
}

.yellow-button {
  background: #febf59;
  color: #000;
  width: 90%;
}

.blue-button {
  background: #699af1;
}

.bottom-text h2 {
  font-size: 3rem;
}

.top-text h2 {
  font-size: 5rem;
}

.two-buttons-wrapper {
  flex-direction: row;
  justify-content: space-between;
}

.two-buttons-wrapper button {
  padding-left: 4rem;
  padding-right: 4rem;
}

.yellow-button {
  width: initial;
}

</style>
