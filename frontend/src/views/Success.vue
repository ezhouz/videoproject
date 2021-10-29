<template>
  <section>
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/register/Intersection_3_bl.png"
          alt=""
          class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">THANK YOU FOR SUPPORTING CHABAD OF MINEOLA</h1>
      </div>
    </article>
  
  </section>
</template>

<script>

export default {
  name: "Success",
  created() {
    localStorage.removeItem("shoppingCart")
  }
};
</script>


<style scoped>
form div {
  font-size: 1.6rem;
}
.image-header {
  position: relative;
  text-align: center;
}

.header-text.desktop {
  font-size: 6rem;
}
.header-text.tablet {
  font-size: 4rem;
}
.header-text {
  font-size: 3rem;
  font-weight: 900;
}

.header-text-wrapper {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>