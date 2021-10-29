

export default {
  async submitStripePayment(cart) {
    let formattedProducts = [];
    cart.forEach((product) => {
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
      let stripeSession = await axios.post("api/post/create-checkout-session", {
        products: formattedProducts,
      });
      window.location = stripeSession.data.url;
    } catch (error) {
      console.log(error);
    }
  },
};
