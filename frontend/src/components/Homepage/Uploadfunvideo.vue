<template>
  <section class="section-wrapper">
    <article class="image-and-text-container top">
      <div class="text-container">
        <h3>
          Upload a fun video about Jewish birthdays and have your friends vote
          for the best one (yours!). One free vote per person.
        </h3>
      </div>
      <div class="image-container">
        <img
          src="../../../public/images/images-exported/Jewish-Bday-image2.png"
          alt=""
        />
      </div>
    </article>

    <article class="image-and-text-container middle">
      <div class="text-container">
        <h3>Every submission earns a prize. Since we are all winners!</h3>
      </div>
      <div class="image-container">
        <img
          src="../../../public/images/images-exported/Artboard 5.png"
          alt=""
        />
      </div>
    </article>

    <article class="image-and-text-container bottom">
      <div class="text-container">
        <h3>
          The 8 winners with the most votes will get a VIP birthday party and
          receive surprise gifts Featured on Live TV, on the Chanukah Telethon
          Dec 5, 2021
        </h3>
      </div>
      <div class="image-container">
        <img
          style="max-height: 200rem"
          src="../../../public/images/images-exported/Artboard 3.png"
          alt=""
        />
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Uploadfunvideo",
  data() {
    return {};
  },
};
</script>

<style scoped>
.middle .image-container {
  margin: -8 0;
}
.top .image-container {
  margin: -20rem 7rem 0 0;
}
.top img {
  max-height: 100rem;
}
.section-wrapper {
  margin: 8rem;
}
article {
  margin: 3rem 0;
}
.text-container h3 {
  font-weight: 700;
  font-size: 2.8rem;
}
.image-and-text-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.image-and-text-container div {
  flex-grow: 1;
}
.image-container img {
  width: 100%;
  height: auto;
}
@media (min-width: 768px) {
  .image-and-text-container.middle {
    display: flex;
    flex-direction: row-reverse;
  }
  .text-container h3 {
    font-weight: 700;
    font-size: 3.5rem;
  }
  .top img {
    max-height: 150rem;
  }
  .image-and-text-container {
    flex-direction: row;
  }
  .middle .image-container {
    margin: -11rem 0;
  }
  .top .image-container {
    margin: -20rem 0;
  }
}
</style>