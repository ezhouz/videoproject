<template>
  <section>
    <div class="second-header">
      <article class="image-header">
        <div class="header-image-wrapper">
          <img
              src="../../public/images/register/Intersection_3_bl.png"
              alt=""
              class="header-image"
          />
        </div>
        <div class="header-text-wrapper">
          <h1 class="header-text" :class="$mq">Your email is confirmed</h1>
        </div>
      </article>
  </div>
    <div class="mbt-40 button-container ">
      <button class="btn btn-primary" v-on:click="$router.push('Login')">Log in</button>
    </div>
  </section>
</template>
<style scoped>
.button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3rem 0;
}
.button-container .btn {
  border-radius: 3rem;
  font-size: 2rem;
  text-transform: uppercase;
  background-color: #EF91DC;
  font-weight: bold;
  color: #fff;
  padding: 1rem 2rem;
  border: none;

}
.button-container .btn:hover,
.button-container .btn:active,
.button-container .btn:focus {
  color: #fff;
}
</style>
