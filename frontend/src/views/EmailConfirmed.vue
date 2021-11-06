<template>
  <section>
    <Header title="Yor email is confirmed" />
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
<script>
import Header from "../components/Header";
export default {
  components: {Header}
}
</script>
