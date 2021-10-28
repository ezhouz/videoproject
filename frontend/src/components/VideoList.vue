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
          <div class="video-info">video info</div>
          <div class="video-form">
            <h3>{{ video.uploadedVideoFileName }}</h3>
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
                min="0"
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
        const currentPlaybackId = video.muxVideoId;
        this.videos.push({
          src: `https://stream.mux.com/${currentPlaybackId}.m3u8`,
          thumbnail: `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg`,
          type: "application/x-mpegURL",
          voteTally: video.voteTally,
          newVotes: 0,
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
  },
};
</script>

<style>
 .submission-container {
  display: flex;
  flex-wrap: wrap;
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