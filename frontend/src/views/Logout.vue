<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    localStorage.removeItem("chabadtoken");
    this.$router.push("/");
  },
};
</script>
