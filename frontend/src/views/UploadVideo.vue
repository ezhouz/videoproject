<template>
  <section>
    <article class="messages">
      <div v-if="showError" class="errorMessage">
        {{ uploadErrorMessage }}
      </div>

      <div v-if="loggedInUser" class="user-info">
        {{ loggedInUser.firstname }}
        {{ loggedInUser.lastname }}
        {{ loggedInUser.email }}
        {{ loggedInUser.hebrewDOB }}
      </div>
    </article>
    <article>


  <b-form-group label="Drand and drop video here:" label-cols-sm="2" label-size="lg">
    <b-form-file id="uploadedVideoFile" size="lg" accept="video/*"
    @change="getFileName"
    ></b-form-file>
  </b-form-group>


      <!-- <input
        @change="getFileName"
        id="uploadedVideoFile"
        type="file"
        accept="video/*"
      /> -->
      <button @click="uploadVideo(uploadedVideoFile)">Upload Video File</button>
    </article>
    <article>
      <div v-if="progress > 0 && progress < 100" class="progress">
        <div
          class="progress-bar progress-bar-striped bg-info"
          role="progressbar"
          v-bind:style="{ width: progress + '%' }"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import * as UpChunk from "@mux/upchunk";

export default {
  name: "UploadVideo",
  data() {
    return {
      existingToken: "",
      uploadedVideoFile: "",
      uploadedVideoFileName: "",
      showUploadError: false,
      uploadErrorMessage: "",
      showUploadSuccess: false,
      uploadSuccessMessage: "",
      loggedInUser: null,
      showError: false,
      progress: 0,
      newVideoOptions: {},
    };
  },
  async created() {
    const existingToken = localStorage.getItem("chabadtoken");
    if (!existingToken) {
      this.$router.push({
        name: "Login",
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${existingToken}`,
        },
      };
      this.existingToken = config;
      try {
        const existingUser = await axios.post(
          `api/post/validatetoken`,
          {},
          config
        );
        if (existingUser.data.status === 200) {
          // get logged in user info
          try {
            const curentUser = await axios.get(
              `api/get/getuser`,
              config
            );
            this.loggedInUser = curentUser.data;
          } catch (error) {
            console.error(error);
          }
        } else {
          this.showError = true;
          this.uploadErrorMessage = "Invalid Token";
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    getFileName() {
      this.uploadedVideoFile =
        document.getElementById("uploadedVideoFile").files[0];
      this.uploadedVideoFileName =
        document.getElementById("uploadedVideoFile").files[0].name;
    },

    async uploadVideo() {
      const newVideoUpload = await axios({
        method: "post",
        url: `api/post/processvid`,
        data: {},
      });

      console.log(newVideoUpload)

      if (newVideoUpload.status === 200) {
        this.newVideoOptions.uploaderId = this.loggedInUser.id;
        this.newVideoOptions.videoUploadId = newVideoUpload.data.id;
        this.newVideoOptions.uploaderEmail = this.loggedInUser.email;
        this.newVideoOptions.uploadedVideoFileName = this.uploadedVideoFileName;

        try {
          const upload = UpChunk.createUpload({
            endpoint: newVideoUpload.data.url,
            file: document.getElementById("uploadedVideoFile").files[0],
            chunkSize: 5120,
          });

          // subscribe to events
          upload.on("error", (err) => {
            this.showUploadError = true;
            this.uploadErrorMessage = err.detail;
            console.error("💥 🙀", err.detail);
          }); 

          upload.on("progress", (progress) => {
            this.progress = progress.detail;
          });

          // subscribe to events
          upload.on("success", async () => {
            const newProduct = await axios.post(
              `api/post/create-new-product`,
              this.newVideoOptions,
              this.existingToken
            );
            console.log(newProduct);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("error");
      }
    },
  },
};

</script>

<style scoped>
</style>
