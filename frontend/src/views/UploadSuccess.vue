<template>
  <section>
    <Header title="THANK YOU FOR UPLOADING. NOW GET YOUR FRIENDS TO VOTE!" />
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
<script>
import Header from "../components/Header";
export default {
  components: {Header}
}
</script>
