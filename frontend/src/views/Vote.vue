<template>
  <div>
    <div class="notices">
      <div v-if="loadError" class="errornotice">
        <h3>{{ loadErrorMessge }}</h3>
      </div>
    </div>
    {{voteInfoVideoIds}}
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
      <video-player
        :options="{
          autoplay: false,
          controls: true,
          poster: video.thumbnail,
          sources: [{ src: video.src, type: video.type }],
        }"
      />
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
  data() {
    return {
      loadError: false,
      loadErrorMessge: "",
      videos: [],
      voteInfo: [],
      voteInfoVideoIds: [],
      videoOptions: {},
    };
  },
  async created() {
    const voteInfo = await axios.get(
      "http://localhost:3000/getall/current-vote-count"
    );
    if (voteInfo.status !== 200) {
      this.loadError = true;
      this.loadErrorMessge = "Error loading vote information";
    } else {
      try {
        this.voteInfo = voteInfo.data;
        voteInfo.data.forEach(item => this.voteInfoVideoIds.push(item.muxVideoId));
      } catch (error) {
        console.log(error)
      }
    }

    const allVideos = await axios.get("http://localhost:3000/getall/allvideos");
    if (allVideos.status !== 200) {
      this.loadError = true;
      this.loadErrorMessge = "Error loading videos";
    } else {
      try {
        allVideos.data.data.forEach((video) => {
          if(this.voteInfoVideoIds.includes(video.upload_id)) { 
          const currentPlaybackId = video.playback_ids[0].id;
          this.videos.push({
            src: `https://stream.mux.com/${currentPlaybackId}.m3u8`,
            thumbnail: `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg`,
            type: "application/x-mpegURL",
            id: video.id,
          });
        }});
      } catch (error) {
        console.log(error);
      }
    }
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