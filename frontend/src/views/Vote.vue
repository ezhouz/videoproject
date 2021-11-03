<template>
  <div>
    <article class="image-header">
      <div class="header-image-wrapper">
        <img
          src="../../public/images/register/Intersection_3_bl.png"
          alt=""
          class="header-image"
        />
      </div>
      <div class="header-text-wrapper">
        <h1 class="header-text" :class="$mq">
          WATCH, VOTE, SUPPORT, CELEBRATE.
        </h1>
        <h3 style="font-size: 3rem; margin-top: 2rem">CHABAD OF MINEOLA</h3>
      </div>
    </article>
    <SearchBar placeholder="Search name" v-model="searchText" v-on:search="onSearch(searchText)" />
    <VideoList v-bind:search-term="searchText" />
    <Telethon />
  </div>
</template>

<script>
// import axios from "axios";
import VideoList from "../components/VideoList.vue";
import Telethon from "../components/Telethon.vue";
import SearchBar from "../components/SearchBar";

export default {
  name: "Votes",
  components: {
    SearchBar,
    VideoList,
    Telethon
  },
  data() {
    return {
      voteInfo: [],
      votingData: {},
      searchText: '',
    };
  },
  methods: {
    onSearch(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>

.header-image-wrapper img {
  width: 100%;
}

.image-header {
  position: relative;
  text-align: center;
}

.header-text.desktop {
  font-size: 6rem;
}
.header-text.tablet {
  font-size: 4rem;
}
.header-text {
  font-size: 3rem;
  font-weight: 900;
}

.header-text-wrapper {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}
</style>
