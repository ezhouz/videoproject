<template>
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
        <h1 class="header-text" :class="$mq">
          WATCH, VOTE, SUPPORT, CELEBRATE.
        </h1>
        <h3>CHABAD OF MINEOLA</h3>
      </div>
    </article>
    <SearchBar placeholder="Search name" v-model="searchText" v-on:search="onSearch(searchText)" />
    <VideoList v-bind:search-term="searchText" />
    <HowItWorks />
    <Telethon />
  </div>
</template>

<script>
// import axios from "axios";
import VideoList from "../components/VideoList.vue";
import Telethon from "../components/Telethon.vue";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";

export default {
  name: "Votes",
  components: {
    HowItWorks,
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

</style>
