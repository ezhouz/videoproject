<template>
  <section style="margin-bottom: 5rem; padding: 3rem">
    <hr class="telethon-hr">
    <div style="width: 16rem; margin: 2rem 0">
      <img
        style="width: 100%; height: auto"
        src="../../public/images/home/pressrelease_66915_1224266498-_i.png"
        alt=""
      />
    </div>

    <p>
      The NCFJE Chabad’s tireless effort on behalf of all people, has achieved
      widespread recognition. Children and adults from all walks of life benefit
      directly from the public support of the Telethon.
    </p>
    <p>
      As a non-profit 501(c)(3) agency, the NCFJE on Long Island relies entirely
      on private contributions and receives no government funds.
    </p>
  </section>
</template>

<script>
export default {
  name: "Telethon",
};
</script>

<style scoped>
.telethon-hr {
  border-top: 7px solid #febf59;
  width: 50%;
  display: inline-block;
  margin-top: 8rem;
}
p {
  font-size: 1.2rem;
}
@media (min-width: 768px) {
  p {
    font-size: 1.7rem;
  }
}
</style>