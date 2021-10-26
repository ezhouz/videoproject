<template>
  <div>
    <div class="notices">
      <div v-if="loadError" class="errornotice">
        <h3>{{ loadErrorMessge }}</h3>
      </div>
    </div>

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
      <div class="player">
        <video-player
          :options="{
            autoplay: false,
            controls: true,
            poster: video.thumbnail,
            sources: [{ src: video.src, type: video.type }],
          }"
        />
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
            min=0
            @change="changeVoteCount(video.newVotes, video.id)"
          ></b-form-input>

          <b-input-group-append>
            <b-btn
              variant="outline-secondary"
              @click="changeVoteCount('plus', video.newVotes, video.id)"
              >+</b-btn
            >
          </b-input-group-append>
        </b-input-group>
      </div>
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
      votingData: {},
    };
  },
  async created() {
    const voteInfo = await axios.get(
      `api/getall/current-vote-count`
    );
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
        const currentPlaybackId = video.muxVideoId;
        this.videos.push({
          src: `https://stream.mux.com/${currentPlaybackId}.m3u8`,
          thumbnail: `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg`,
          type: "application/x-mpegURL",
          voteTally: video.voteTally,
          newVotes: 0,
          id: currentPlaybackId,
        });
      });
    } catch (error) {
      this.loadError = true;
      this.loadErrorMessge = "Error loading videos";
      console.log(error);
    }
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
        console.log(video.id);
        if (video.id === id) {
          console.log(number)
          video.newVotes = number;
        }
        console.log(this.videos)
      });
    },
    submitStripePayment() {
      axios.post(`api/post/create-checkout-session`);
    },
  },
};
</script>

<style scoped>
</style>