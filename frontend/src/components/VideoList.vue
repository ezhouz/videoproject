<template>
  <section>
    <div class="notices">
      <div v-if="loadError" class="errornotice">
        <h3>{{ loadErrorMessge }}</h3>
      </div>
    </div>
    <div class="submission-container">
      <div v-for="video in filtered" :key="video.id" class="submission">
        <article class="video-component-container">
          <div class="player-wrapper" v-on:click="playVideo(video)" v-b-modal.modal-1>
            <div class="player-thumb" :style="{ backgroundImage: 'url('+video.thumbnail+')' }"></div>
          </div>
          <div class="video-info-container">
            <div class="video-info">
              <h3 class="video-name">{{ video.title }}</h3>
              <p class="uploader-name"> {{ video.uploaderFirstName }} {{ video.uploaderLastName }}</p>
              <p class="date-birth"><i class="icon icon-calendar"></i> {{ video.uploaderBirthDate }}</p>
              <h3><span>{{ video.votes }}</span> votes</h3>
            </div>
            <div class="voted-text" v-if="video.isCurrentVideoVoted"><i class="icon icon-checkmark"></i> Voted</div>
            <div class="buttons d-flex flex-row align-items-start justify-content-start">
              <button v-if="!video.isVoted"
                  class="btn btn-primary vote-btn"
                  v-on:click="vote(video.id)"
              >Vote</button>

              <button class="btn btn-primary vote-btn share-btn"
                      v-b-modal.modal-share
                      v-on:click="showLink(video)">Share</button>
            </div>
            </div>
        </article>
      </div>
    </div>
    <div class="submit-video">
      <button class="btn-primary vote-btn btn" v-on:click="onVideoSubmit()">Submit a Video</button>
    </div>

    <b-modal id="modal-1" centered hide-footer :title="selectedVideo ? selectedVideo.title: ''">
      <video-player
          v-if="selectedVideo"
          class="video-player"
          :options="this.getVideoOptions(selectedVideo)"
      />
    </b-modal>
    <b-modal id="modal-share" centered ok-title="Copy Link" cancel-title="Hide" title="Copy a link to this video" v-on:ok="copyLink()">
      <textarea ref="copy-text" readonly class="form-control copy-area" v-if="selectedVideo" v-model="selectedLink" style="font-size: 2rem; margin: 5rem 0;min-height: 150px">
      </textarea>
    </b-modal>
  </section>
</template>

<script>
import videoService from "../services/video.service";
import userService from "../services/user.service";
import VideoPlayer from "../components/VideoPlayer.vue";
import "video.js/dist/video-js.css";

const filter = (videos, searchTerm) => {
  console.log(searchTerm)
  const res = (searchTerm !== undefined && searchTerm.length > 0) ? videos.filter(v =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase())
      || v.uploaderFirstName.toLowerCase().includes(searchTerm.toLowerCase())
      || v.uploaderLastName.toLowerCase().includes(searchTerm.toLowerCase())
  ): videos;
  console.log(res)
  return res;
}

export default {
  name: "VideoList",
  components: {
    VideoPlayer,
  },
  props: {
    searchTerm: String
  },
  watch: {
    searchTerm: function(newVal, oldVal) {
      console.log(this);
      if (newVal !== oldVal && this.videos) {
        this.filtered = filter(this.videos, newVal);
      }
    },
    videos: function(newVal) {
      this.filtered = filter(newVal, this.searchTerm);
    }
  },
  data() {
    return {
      selectedLink: '',
      selectedVideo: null,
      voteInfoVideoIds: [],
      loadError: false,
      loadErrorMessge: "",
      videos: [],
      filtered: [],
      cartForDisplay: [],
      addedToCart: false,
      addedToCartMessage: "Succesfully added to cart",
      isLoggedIn: false,
      options: {}
    };
  },
  async created() {
    this.videos = await videoService.loadVideos();
    const user = await userService.getCurrentUser();
    console.log(user)
    this.isLoggedIn = !!user;
    for(let i = 0; i < this.videos.length; i++) {
      const v = this.videos[i];
      this.options[v.id] = await this.initVideoOptions(v);
    }
  },
  methods: {
    async vote(id) {
      await videoService.vote(id);
      this.videos = await videoService.loadVideos();
    },
    onVideoSubmit() {
      this.$router.push({
        name: "UploadVideo",
      });
    },
    playVideo(video) {
      this.selectedVideo = video;
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
    getVideoOptions(video) {
      return this.options[video.id];
    },
    showLink(video) {
      this.selectedVideo = video;
      this.selectedLink = window.location.protocol + '//' + window.location.host + '/play-video/' + video.id;
    },
    copyLink() {
      let testingCodeToCopy = this.$refs['copy-text'];
      testingCodeToCopy.select()

      try {
        document.execCommand('copy');
      } catch (err) {
        console.error(err);
      }

      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style>
.submission-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.submission-container article {
  display: flex;
  flex-direction: row;
}

.video-form {
  font-size: 1.6rem;
}
.video-component-container {
  margin: 3rem;
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

.video-info-container {
  padding: 1rem;
  white-space: normal;
  width: 210px;
  overflow: hidden;
}

.vote-btn.btn {
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #EF91DC;
  border: none;
  padding: 0.75rem 2.2rem;
  border-radius: 2rem;
  color: #fff;
  margin-right: 1rem;
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
.video-info-container .icon.icon-checkmark {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
}

.share-btn {
  background-color: #699AF1 !important;
}


.player-wrapper {
  border-radius: 1.6rem;
}

.player-wrapper .vjs-big-play-button {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.submit-video {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3rem 0;
}
.submit-video .btn {
  border-radius: 3rem;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  padding: 1.4rem 4rem;

}
.submit-video .btn:hover,
.submit-video .btn:active,
.submit-video .btn:focus {
  color: #fff;
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
