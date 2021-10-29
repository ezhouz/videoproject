<template>
  <section>
    <article v-if="cartItems.length > 0" class="cart-list">
      <button
        class="cart-checkout-button"
        @click="submitStripePayment(cartItems)"
      >
        Checkout
      </button>
      <ul class="cart-list">
        <li v-for="(product, index) in cartItems" :key="index">
          <div class="cart-item-wrapper">
            <article class="cart-item-image-wrapper">
              <img :src="product.thumbnail" />
              <article>
                <button
                  @click.prevent="removeFromCart(product.id)"
                  type="button"
                  class="btn btn-danger"
                >
                  Rmove From Cart
                </button>
              </article>
            </article>

            <article class="cart-text">
              <h4>Video Title</h4>
              <p>{{ product.name }}</p>
              <div>
                <h4>Total Votes</h4>
                <p>{{ product.newVotes }}</p>
              </div>
            </article>
          </div>

          <hr />
        </li>
      </ul>
    </article>
    <article v-else>
      <h2>There are no products in your shopping cart</h2>
      <h3>
        <a href="/vote"
          >Please go to the Vote page to vote for your contenst entries</a
        >
      </h3>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CartItems",
  data() {
    return {
      cartItems: [],
    };
  },
  created: function () {
    this.getCartItems();
  },
  methods: {
    getCartItems() {
      let existingItemsUnformatted = localStorage.getItem("shoppingCart");
      if (existingItemsUnformatted) {
        let existingItems = JSON.parse(existingItemsUnformatted);
        console.log(existingItems);
        if (existingItems.length) {
          this.cartItems = existingItems;
        }
      }
    },

    removeFromCart(id) {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      localStorage.setItem("shoppingCart", JSON.stringify(this.cartItems))
    },

    async submitStripePayment() {
      let formattedProducts = [];
      this.cartItems.forEach((product) => {
        formattedProducts.push({
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 999,
          },
          price_data: {
            currency: "usd",
            unit_amount: 100,
            product_data: {
              name: product.name,
            },
          },
          quantity: product.newVotes,
        });
      });

      try {
        let stripeSession = await axios.post(
          "api/post/create-checkout-session",
          { products: formattedProducts }
        );
        window.location = stripeSession.data.url;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
button.btn-danger {
  margin-top: 2.5rem;
}
.cart-text {
  margin-left: 4rem;
}
.cart-item-wrapper {
  display: flex;
}
.cart-item-image-wrapper {
  height: 6rem;
  width: 8rem;
}
.cart-item-image-wrapper img {
  width: 100%;
  height: auto;
}
.cart-item-wrapper p {
  font-size: 1.4rem;
}
.cart-list {
  list-style: none;
}
.cart-checkout-button {
  width: 100%;
  text-align: center;
  height: 4rem;
  margin: 2rem 0;
  background: #ff8ccf;
  color: #fff;
  font-size: 2rem;
}
.cart-checkout-button:hover {
  background: #ff8ccfb2;
}
</style>