<template>
  <div>
    <div class="notices">
      <div v-if="loadError" class="errornotice">
        <h3>Problem Loading Videos</h3>
      </div>
    </div>
    {{voteInfo}}
    <!-- <section>
      <div class="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />

        <div class="description">
          <h3>Stubborn Attachments</h3>

          <h5>$1.00</h5>
        </div>
      </div>

      <form @submit="submitStripePayment()">
        <button type="submit" id="checkout-button">Checkout</button>
      </form>
    </section> -->
    <div v-for="video in videos" :key="video.id" class="submission">
      <video-player :options="{
        autoplay: false,
        controls: true,
        poster: video.thumbnail,
        sources: [{src: video.src, type: video.type}] }"  />
    </div>

  </div>
</template>

<script>
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer.vue";
import "video.js/dist/video-js.css";

export default {
  name: "Votes",
  components: {
    VideoPlayer,
  },
  created() {
    axios({
      method: "get",
      url: "http://localhost:3000/getall/allvideos",
    }).then((res) => {
      if (!res || !res.status || res.status !== 200) {
        this.loadError = true;
      } else {
        const allVideos = res.data.data;
        allVideos.forEach((video) => {
          const currentId = video.playback_ids[0].id;
          this.videos.push({
            src: `https://stream.mux.com/${currentId}.m3u8`,
            thumbnail: `https://image.mux.com/${currentId}/thumbnail.jpg`,
            type: "application/x-mpegURL",
            id: video.id
          });
        });
      }
    }).then(
      axios({
        method: "get",
        url: "http://localhost:3000/getall/current-vote-count"
      }).then(res => {
        console.log(res)
        this.voteInfo = res.data
        })
    )
  },
  data() {
    return {
      loadError: false,
      videos: [],
      voteInfo: [],
      videoOptions: {
      },
    };
  },
  methods: {
    submitStripePayment() {
      axios.post("http://localhost:3000/post/create-checkout-session");
    },
  },
};
</script>

<style scoped>
</style>