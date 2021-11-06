<template>
  <section class="second-header">
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
            src="../../public/images/register/Intersection_3_bl.png"
            alt=""
            class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">{{title}}</h1>
        <h3 v-if="subtitle">{{ subtitle }}</h3>
      </div>
    </article>
  </section>
</template>
<script>
export default {
  props: ['title', 'subtitle'],
  data() {
    return {};
  }
};
</script>
