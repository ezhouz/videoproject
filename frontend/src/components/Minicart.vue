<template>
  <section style="background: lime; height: 20rem; width: 20rem">
    <div class="cart">
      <span class="cart-size" @click="showCart = !showCart"> {{ cart }} </span>
      <i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>

      <div class="cart-items" v-show="showCart">
        <table class="cartTable">
          <tbody>
            <tr class="product" v-for="(product, index) in cart" :key="index">
              <td class="align-left">
                <div
                  class="cartImage"
                  @click="removeProduct(product)"
                  v-bind:style="{ backgroundImage: url('product.image') }"
                  style="background-size: cover; background-position: center"
                >
                  <i class="close fa fa-times"></i>
                </div>
              </td>
              <td class="align-center">
                <button @click="quantityChange(product, 'decriment')">
                  <i class="close fa fa-minus"></i>
                </button>
              </td>
              <td class="align-center">{{ cart[$index].quantity }}</td>
              <td class="align-center">
                <button @click="quantityChange(product, 'incriment')">
                  <i class="close fa fa-plus"></i>
                </button>
              </td>
              <td class="align-center">{{ cart[$index] }}</td>
              <!-- <td>{{ product.price | currency }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal | currency }} </h4></div> -->
      <button class="clearCart" v-show="checkoutBool" @click="clearCart()">
        Clear Cart
      </button>
      <button
        class="checkoutCart"
        v-show="checkoutBool"
        @click="propagateCheckout()"
      >
        Checkout
      </button>
    </div>
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

<style scoped lang="scss">
// .cart {
//   position: fixed;
//   right: 0em;
//   bottom: 0em;
//   text-align: right;
//   background: rgba(0, 0, 0, 0.85);
//   color: white;
//   z-index: 1;
// }

.cart {
      position: fixed;
      right: 0em;
      top: 0em;
      text-align: right;
      background: rgba(0,0,0,0.85);
      color: white;
      z-index: 1;

      .fa-shopping-cart, .cart-size {
        cursor: pointer;
        font-size: 1.25em;
        user-select: none;
      }

      .fa-shopping-cart {
        padding: 1em 1em 1em 0;
      }

      .cart-size {
        padding: 1em 0 1em 1em;
      }


      .cart-items {
        padding: 0 1em 2em 1em;

        .cartTable {
          width: 20em;
        }
        
        .cartImage {
          width: 4em;
          height: 4em;
          margin: 0.5em auto;
          position: relative;
          cursor: pointer;
          
          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.25);
            transition: all 0.1s;
          }
          
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5em;
            z-index: 1;
            transition: all 0.25s;
          }
          
          &:hover {
            i {
              text-shadow: 1px 2px 5px black;
            }
            
            &:after {
              background: rgba(0,0,0,0.5);
            }
          }
          
          &:active {
             i {
              text-shadow: 0px 0px 1px black;
            }
          }
        }

        .cartSubTotal {
          border-top: 1px solid white;
          font-size: 1.25em;
        }

        .clearCart {
          float: left;
          margin-top: 2em;
          margin-bottom: 1.25em;
        }
        
        .checkoutCart {
          float: right;
          margin-top: 2em;
          margin-bottom: 1.25em;
        }
      }
    }
</style>
