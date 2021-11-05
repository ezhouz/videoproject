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
          <h1 class="header-text" :class="$mq">THANK YOU FOR UPLOADING.<br />
            NOW GET YOUR FRIENDS TO VOTE!</h1>
        </div>
      </article>
    </div>
    <div class="mbt-40 button-container ">
      <i class="icon icon-success"></i>
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

.icon-success {
  width: 150px;
  height: 150px;
}
</style>
