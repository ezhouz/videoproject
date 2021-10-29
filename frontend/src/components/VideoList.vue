<template>
  <section>
    <div class="notices">
      <div v-if="loadError" class="errornotice">
        <h3>{{ loadErrorMessge }}</h3>
      </div>
    </div>
    <div class="submission-container">
      <div v-for="video in videos" :key="video.id" class="submission">
        <article class="video-component-container">
          <div class="player-wrapper">
            <video-player
              class="video-player"
              :options="{
                autoplay: false,
                controls: true,
                poster: video.thumbnail,
                sources: [{ src: video.src, type: video.type }],
              }"
            />
          </div>

          <div class="video-info-container">
            <div style="margin: 3rem 0" class="video-info">
              <h2 style="font-weight: 900">Submission Information</h2>
              <h3>Name: {{ video.uploadedVideoFileName }}</h3>
              <h3>Votes: {{ video.voteTally }}</h3>
            </div>
            <div v-if="addedToCart" class="messages">
              {{ addedToCartMessage }}
            </div>
            <div class="video-form">
              <b-input-group>
                <b-input-group-prepend>
                  <b-btn
                    variant="outline-info"
                    @click="changeVoteCount('minus', video.newVotes, video.id)"
                    >-</b-btn
                  >
                </b-input-group-prepend>

                <b-form-input
                  v-model="video.newVotes"
                  type="number"
                  min="1"
                  @change="changeVoteCount(video.newVotes, video.id)"
                ></b-form-input>

                <b-input-group-append>
                  <b-btn
                    variant="outline-secondary"
                    @click="changeVoteCount('plus', video.newVotes, video.id)"
                    >+</b-btn
                  >
                </b-input-group-append>

                <b-input-group-append>
                  <b-btn
                    variant="warning"
                    @click="
                      addToCart(
                        video.uploadedVideoFileName,
                        video.newVotes,
                        video.thumbnail,
                        video.id
                      )
                    "
                    >Add to cart</b-btn
                  >
                </b-input-group-append>

                <b-input-group-append>
                  <b-btn variant="success" @click="submitStripePayment()"
                    >Purchase Votes</b-btn
                  >
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer.vue";
import "video.js/dist/video-js.css";

export default {
  name: "VideoList",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      voteInfoVideoIds: [],
      loadError: false,
      loadErrorMessge: "",
      videos: [],
      cartForDisplay: [],
      addedToCart: false,
      addedToCartMessage: "Succesfully added to cart",
    };
  },
  async created() {
    const voteInfo = await axios.get(`api/getall/current-vote-count`);
    if (voteInfo.status !== 200) {
      this.loadError = true;
      this.loadErrorMessge = "Error loading vote information";
    } else {
      try {
        this.voteInfo = voteInfo.data;
        voteInfo.data.forEach((item) =>
          this.voteInfoVideoIds.push(item.muxVideoId)
        );
      } catch (error) {
        console.log(error);
      }
    }

    const allVideos = await axios.get(`api/getall/allvideos`);
    try {
      allVideos.data.forEach((video) => {
        const currentPlaybackId = video.muxPlaybackId;
        this.videos.push({
          src: `https://stream.mux.com/${currentPlaybackId}.m3u8`,
          thumbnail: `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg`,
          type: "application/x-mpegURL",
          voteTally: video.voteTally,
          newVotes: 1,
          id: currentPlaybackId,
          uploadedVideoFileName: video.uploadedVideoFileName,
          uploaderEmail: video.uploaderEmail,
          uploaderId: video.uploaderId,
        });
      });
    } catch (error) {
      this.loadError = true;
      this.loadErrorMessge = "Error loading videos";
      console.log(error);
    }

    const onCreateLocalCartExistingItems = localStorage.getItem("shoppingCart");
    let onCreateLocalCartExistingItemsFormatted = JSON.parse(
      onCreateLocalCartExistingItems
    );
    this.cartForDisplay = onCreateLocalCartExistingItemsFormatted;
  },
  methods: {
    changeVoteCount(operator = null, number, id) {
      if (operator !== null) {
        if (operator === "minus") {
          number--;
        } else if (operator === "plus") {
          number++;
        }
      }
      this.videos.forEach((video) => {
        if (video.id === id) {
          video.newVotes = number;
        }
      });
    },

    addToCart(name, newVotes, thumbnail, id) {
      const localCartExistingItems = localStorage.getItem("shoppingCart");
      let localCartExistingItemsFormatted = JSON.parse(localCartExistingItems);

      if (localCartExistingItemsFormatted) {
        //check if the product is in the cart
        let existing = localCartExistingItemsFormatted
          .map((product) => product.name)
          .includes(name);

        if (!existing) {
          localCartExistingItemsFormatted.push({
            name,
            newVotes: newVotes,
            thumbnail,
            id,
          });
          this.addUpdateLocalCart(localCartExistingItemsFormatted);
          //loop through the products and add newvotes to the produt in the cart
        } else {
          localCartExistingItemsFormatted.forEach((product) => {
            if (product.name === name) {
              let newVotesParsed = parseInt(newVotes);
              let existingVotesNumber = parseInt(product.newVotes, 10);
              existingVotesNumber += newVotesParsed;
              product.newVotes = existingVotesNumber;
              return product;
            }
          });
          this.addUpdateLocalCart(localCartExistingItemsFormatted);
        }
      } else {
        // if the cart is empty, push the new product
        this.addUpdateLocalCart([{ name, newVotes: newVotes, thumbnail, id }]);
      }
    },

    addUpdateLocalCart(cart) {
      const cartString = JSON.stringify(cart)
      localStorage.setItem("shoppingCart", cartString);
      let updatedCart = localStorage.getItem("shoppingCart");
      let updatedCartParsed = JSON.parse(updatedCart);
      this.cartForDisplay = updatedCartParsed;
      location.reload();
    },

    async submitStripePayment() {
      let formattedProducts = [];
      this.cartForDisplay.forEach((product) => {
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

<style>
.submission-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.video-form {
  font-size: 1.6rem;
}
.video-component-container {
  margin: 3rem;
}
.input-group-append .btn,
input.form-control {
  font-size: 1.6rem !important;
  margin-left: 0.5rem;
}
/*
.player-wrapper,
.video-info-container {
  width: 50%;
}
.video-player div {
  width: 50%;
}
.video-js {
  width: 100% !important;
} */
</style>