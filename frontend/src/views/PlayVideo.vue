<template>
  <section class="play-video-section">
    <div class="second-header">
      <article class="image-header">
        <div class="header-image-wrapper">
          <img
              src="../../public/images/register/Intersection_3_bl.png"
              alt=""
              class="header-image"
          />
        </div>
        <div class="header-text-wrapper">
          <h1 class="header-text" :class="$mq">Jewish Birthday Makeover</h1>
        </div>
      </article>
    </div>
    <div v-if="video" class="player">
      <video-player
          class="video-player"
          :options="this.getVideoOptions(video)"
      />
      <div class="video-info-container">
        <div class="video-info">
          <h3 class="video-name">{{ video.title }}</h3>
          <p class="uploader-name"> {{ video.uploaderFirstName }} {{ video.uploaderLastName }}</p>
          <p class="date-birth"><i class="icon icon-calendar"></i> {{ video.uploaderBirthDate }}</p>
          <h3><span>{{ video.votes }}</span> votes</h3>
        </div>
        <button v-if="!video.isVoted"
                class="btn btn-primary vote-btn"
                v-on:click="vote(video.id)"
        >Vote</button>
        <div class="voted-text" v-if="video.isCurrentVideoVoted"><i class="icon icon-checkmark"></i> Voted</div>
      </div>
    </div>
  </section>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";
import "video.js/dist/video-js.css";
import videoService from '../services/video.service';
export default {
  components: {
    VideoPlayer,
  },
  data(){
    return {
      video: null,
      options: null
    }
  },
  async created() {
    if (!this.$route.params.id) {
      await this.$router.push('vote');
      return;
    }
    const video = await videoService.loadVideo(this.$route.params.id);
    if (!video) {
      await this.$router.push('vote');
      return;
    }
    this.options = await this.initVideoOptions(video);
    this.video = video;
  },
  methods: {
    async initVideoOptions(video) {
      return new Promise((resolve) => {
        const thumbnail = video.thumbnail;
        const img = new Image();
        img.width = 0;
        img.height = 0;
        img.addEventListener('load', () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          resolve({
            autoplay: true,
            controls: true,
            poster: video.thumbnail,
            height: ratio < 1 ? this.getVideoHeight() : undefined,
            width: ratio >= 1 ? this.getVideoWidth() : undefined,
            sources: [{ src: video.src, type: video.type }],
          });
        });
        img.addEventListener('error', () => {
          resolve({
            autoplay: true,
            controls: true,
            poster: video.thumbnail,
            sources: [{ src: video.src, type: video.type }],
          });
        });
        img.src = thumbnail;
        document.documentElement.appendChild(img);
      });
    },
    getVideoWidth() {
      let width = window.innerWidth;
      if (width > 800) {
        width = 800;
      } else {
        width = width - 20;
      }
      return width;
    },
    getVideoHeight() {
      let height = window.innerHeight;
      if (height > 768) {
        height = 768;
      } else {
        height = height - 100;
      }
      return height;
    },
    getVideoOptions() {
      return this.options;
    },
    async vote(id) {
      await videoService.vote(id);
      this.video = await videoService.loadVideo(id);
    },
  }
}
</script>
<style scoped>
.player {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  margin: 3rem;
  font-size: 2rem;
}

.video-info-container {
  padding-left: 2rem;
}

.video-info h3 {
  font-weight: bold;
}
.video-info .uploader-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: #699AF1;
}

.video-info .date-birth {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 2rem 0;
  font-size: 1.2rem;
}
.video-info .icon.icon-calendar {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
}
.video-info .video-name {
  font-size: 2rem;
}

.vote-btn.btn {
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #EF91DC;
  border: none;
  padding: 0.75rem 2.2rem;
  border-radius: 2rem;
  color: #fff;
}
.vote-btn.btn:active,
.vote-btn.btn:focus,
.vote-btn.btn:hover,
.vote-btn.btn.active {
  opacity: 0.8;
  background-color: #EF91DC;
}

.voted-text {
  font-size: 2rem;
  font-weight: bold;
  color: #EF91DC;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}
.icon.icon-checkmark {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
}

</style>
