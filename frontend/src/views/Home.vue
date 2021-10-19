<template>
  <section>
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
  data() {
    return {
      
      uploadedVideoFile: "",
      uploadedVideoFileName: "",
      showUploadError: false,
      uploadError: "",
      showUploadSuccess: false,
      uploadSuccessMessage: "",
    };
  },
  methods: {
    getFileName() {
      this.uploadedVideoFile =
        document.getElementById("uploadedVideoFile").files[0];
      this.uploadedVideoFileName =
        document.getElementById("uploadedVideoFile").files[0].name;
    },

    uploadVideo() {
      axios({
        method: "post",
        url: "http://localhost:3000/post/processvid",
        data: {},
      }).then((res) => {
        console.log(res)
        const upload = UpChunk.createUpload({
          endpoint: res.data,
          file: document.getElementById("uploadedVideoFile").files[0],
          chunkSize: 5120,
        });

        // subscribe to events
        upload.on("error", (err) => {
          this.showUploadError = true;
          this.uploadError = err.detail;
          console.error("💥 🙀", err.detail);
        });

        upload.on("progress", (progress) => {
          console.log("Uploaded", progress.detail, "percent of this file.");
        });

        // subscribe to events
        upload.on("success", (err) => {
          console.log(err);
          this.showUploadSuccess = true;
          this.uploadSuccessMessage = "Successful Upload";
          console.log("Wrap it up, we're done here. 👋");

          try {
            axios({
              method: "post",
              url: "http://localhost:3000/post/create-new-product",
              data: { 
                fileName: this.uploadedVideoFileName,
                muxId:  '12'
                },
            }).then((res) => console.log(res));
          } catch (err) {
            console.log(err);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
