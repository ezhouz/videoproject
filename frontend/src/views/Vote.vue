<template>
  <div>
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/register/Intersection_3_bl.png"
          alt=""
          class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">
          WATCH, VOTE, SUPPORT, CELEBRATE.
        </h1>
        <h3 style="font-size: 3rem; margin-top: 2rem">CHABAD OF MINEOLA</h3>
      </div>
    </article>

    <section>
      <form @submit.prevent="submitStripePayment()">
        <button type="submit" id="checkout-button">Checkout</button>
      </form>
    </section>

    <VideoList />

  </div>
</template>

<script>
import axios from "axios";
import VideoList from "../components/VideoList.vue";

export default {
  name: "Votes",
  components: {
    VideoList
  },
  data() {
    return {
      voteInfo: [],
      votingData: {},
      products: [
        {
          price: "price_1Jp068Ldf9pUITPXyqzpAb8E",
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: 1,
        },
      ],
    };
  },


  methods: {
    async submitStripePayment() {
      try {
        const stripeSession = await axios.post(
          `http://localhost:3001/api/post/create-checkout-session`,
          { products: this.products }
        );
        console.log(stripeSession);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
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
  width: 85%;
}
</style>