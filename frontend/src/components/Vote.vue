<template>
<div>
{{videos}}
</div>
    
</template>

<script>

import axios from "axios";

export default {
  name: "Votes",
  created() {
      axios({
          method: "get",
          url: 'http://localhost:3000/getall/allvideos'
      }).then(res => res.status === 200 ? this.videos = res.data : console.log('gone wrong'))
  },
  data() {
    return {
     videos: []
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
</style>