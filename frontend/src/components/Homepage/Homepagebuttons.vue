<template>
  <section class="button-wrapper">
    <article class="top-text">
      <h2>The clock is ticking, upload your video now!</h2>
    </article>
    <article class="button-container">
      <div class="two-buttons-wrapper">
        <a href="submit">
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
        <h2>About the Chanukah Telethon Dec 5, 2021</h2>
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
  font-size: 3.5rem;
  font-weight: 900;
  width: 70%;
}
.button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  font-size: 2.5rem;
  color: #fff;
  font-weight: 800;
  border-radius: 40px;
  margin: 1.5rem;
  padding: 1rem 3rem;
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
@media (min-width: 768px) {
  .bottom-text h2 {
  font-size: 3rem;
  }
  button {
    font-size: 3.6rem;
  }
  .top-text h2 {
    font-size: 5rem;
  }
  .two-buttons-wrapper {
    flex-direction: row;
  }
  .yellow-button {
    width: initial;
  }
}
</style>