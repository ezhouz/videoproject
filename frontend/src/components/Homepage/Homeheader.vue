<template>
  <section>
    <article class="image-header">
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">
          Let’s throw you a party and shower you with gifts on LIVE TV
        </h1>
        <h2 class="header-secondary-text uc" :class="$mq">
          Join the Jewish Birthday Makeover Contest
        </h2>
        <h2 class="header-secondary-text" :class="$mq">Project of Chabad Mineola Rabbi <br/>Anchelle Perl, Director
        </h2>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Homeheader",
};
</script>

<style scoped>
.image-header {
  min-height: 54rem;
  background: url("../../../public/images/images-exported/Header.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.header-image {
  width: 100%;
  height: auto;
}
.header-secondary-text {
  max-width: 80%;
  margin-top: 2rem;
  font-weight: 600;
  margin-left: 4rem;
}
.header-secondary-text.desktop {
  font-size: 3.5rem;
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
  font-size: 2.5rem;
}
.header-text.desktop {
  font-size: 6rem;
  margin-left: 4rem;
}

.header-text {
  text-align: left;
  font-size: 3rem;
  font-weight: 900;
  max-width: 70%;
}

.header-text-wrapper {
  color: #fff;
  position: absolute;
  top: 5rem;
  left: 3rem;
}

</style>
