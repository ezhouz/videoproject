<template>
  <div>
    <Header title="WATCH, VOTE, SUPPORT, CELEBRATE." subtitle="CHABAD OF MINEOLA" />
    <SearchBar placeholder="Search name" v-model="searchText" v-on:search="onSearch(searchText)" />
    <VideoList v-bind:search-term="searchText" />
    <HowItWorks />
    <p class="support-info">For support contact <a href="mailto:info@jewishbirthdaymakeover.com">info@jewishbirthdaymakeover.com</a></p>
    <Telethon />
  </div>
</template>

<script>
// import axios from "axios";
import VideoList from "../components/VideoList.vue";
import Telethon from "../components/Telethon.vue";
import SearchBar from "../components/SearchBar";
import HowItWorks from "../components/HowItWorks";
import Header from "../components/Header";

export default {
  name: "Votes",
  components: {
    Header,
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
