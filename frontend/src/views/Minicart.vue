<template>
<section>
    <div class="cart">
  <span class="cart-size" @click="showCart = !showCart"> {{ cart }} </span>
  <i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>
  
  <div class="cart-items" v-show="showCart">
    <table class="cartTable">
        <tbody>
  <tr class="product" v-for="(product, index) in cart" :key="index">
  <td class="align-left">
      <div class="cartImage" @click="removeProduct(product)" v-bind:style="{ backgroundImage: url('product.image') }" style="background-size: cover; background-position: center;">
          <i class="close fa fa-times"></i>
          </div>
          </td>
  <td class="align-center"><button @click="quantityChange(product, 'decriment')"><i class="close fa fa-minus"></i></button></td>
  <td class="align-center">{{ cart[$index].quantity }}</td>
  <td class="align-center"><button @click="quantityChange(product, 'incriment')"><i class="close fa fa-plus"></i></button></td>
  <td class="align-center">{{ cart[$index] }}</td>
  <!-- <td>{{ product.price | currency }}</td> -->
  </tbody>
  <table>
  </div>
  <!-- <h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal | currency }} </h4></div> -->
  <button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button>
  <button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Checkout </button>
  </section>
</template>

<script>
export default {
  name: "Minicart",
  props: [
    "checkoutBool",
    "cart",
    "cartSize",
    "cartSubTotal",
    "tax",
    "cartTotal",
  ],

  data() {
    return {
      showCart: false,
    };
  },
  methods: {},
};
</script>
