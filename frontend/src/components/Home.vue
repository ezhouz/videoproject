<template>
  <section>
    <article>
      <label for="date">Enter your Hebrew date</label>
      <input v-model="engDate" type="date" name="" id="date" />
      <button @click="convertDate(JSON.stringify(engDate), userIp)">
        Submit
      </button>
    </article>
    <article>
      <input
        @change="getFileName"
        id="uploadedVideoFile"
        type="file"
        accept="video/*"
      />
      <button @click="uploadVideo(uploadedVideoFile)">Upload Video File</button>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import * as UpChunk from "@mux/upchunk";

export default {
  name: "Home",
  created() {
    axios
      .get(
        "http://api.ipstack.com/check?access_key=4eb1886879ef48f410afc7834ad84c31&fields=ip"
      )
      .then((res) => (this.userIp = res.data));
  },
  data() {
    return {
      engDate: "",
      userIp: "",
      uploadedVideoFile: "",
    };
  },
  methods: {
    getFileName() {
      this.uploadedVideoFile =
        document.getElementById("uploadedVideoFile").files[0];
    },
    convertDate(date, userIp) {
      axios({
        method: "post",
        url: "http://localhost:3000/post/convertdate",
        data: {
          date,
          userIp,
        },
      }).then((res) => console.log(res.data));
    },

    uploadVideo() {
      axios({
        method: "post",
        url: "http://localhost:3000/post/processvid",
        data: {},
      }).then((res) => {
        const upload = UpChunk.createUpload({
          endpoint: res.data,
          file: document.getElementById("uploadedVideoFile").files[0],
          chunkSize: 5120,
        });

        // subscribe to events
        upload.on("error", (err) => {
          console.error("💥 🙀", err.detail);
        });

        upload.on("progress", (progress) => {
          console.log("Uploaded", progress.detail, "percent of this file.");
        });

        // subscribe to events
        upload.on("success", (err) => {
          console.log(err);
          console.log("Wrap it up, we're done here. 👋");
        });


      });
    },
  },
};
</script>

<style scoped>
</style>
