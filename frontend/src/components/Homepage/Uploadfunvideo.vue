<template>
  <section class="section-wrapper home-upload-info">
    <article class="image-and-text-container top">
      <div class="text-container">
        <h3>
          Upload a fun video about Jewish birthdays and have your friends vote
          for the best one (yours!). One free vote per person.
        </h3>
      </div>
      <div class="image-container">
        <div class="home-image home-image-birthday"></div>
      </div>
    </article>

    <article class="image-and-text-container middle">
      <div class="text-container">
        <h3>Every submission earns a prize. Since we are all winners!</h3>
      </div>
      <div class="image-container">
        <div class="home-image home-image-friends"></div>
      </div>
    </article>

    <article class="image-and-text-container bottom">
      <div class="text-container">
        <h3>
          The 8 winners with the most
          votes will join a VIP Celebrity Birthday Party and will also be invited to make a Cameo Appearance, to receive
          surprise gifts, on the Live TV
          Stage during the Chanukah Telethon Dec 5, 2021
        </h3>
      </div>
      <div class="image-container">
        <div class="home-image home-image-happy-guy"></div>
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

.image-container .home-image {
  background-repeat: no-repeat;
  background-size: contain;
}

.image-container .home-image.home-image-birthday {
  width: 435px;
  height: 350px;
  background-image: url("../../../public/images/home/home-image-birthday.svg");
}

.image-container .home-image.home-image-happy-guy {
  width: 530px;
  height: 500px;
  background-image: url("../../../public/images/home/home-image-happy-guy.svg");
}

.image-container .home-image.home-image-friends {
  width: 530px;
  height: 400px;
  background-image: url("../../../public/images/home/home-image-friends.svg");
}

article.top {
  height: 360px;
}

article.middle {
  height: 200px;
}

.section-wrapper {
  margin: 4rem 8rem;
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
</style>
