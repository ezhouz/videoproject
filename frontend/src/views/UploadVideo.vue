<template>
  <section>

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
          UPLOAD YOUR VIDEO FOR THE CONTEST
        </h1>
      </div>
    </article>

    <article class="messages">
      <div v-if="showError" class="errorMessage">
        {{ uploadErrorMessage }}
      </div>

      <div v-if="loggedInUser" class="user-info">
        <h3>Uploader Information</h3>
        <ul>
          <li>First Name: {{ loggedInUser.firstname }}</li>
          <li>Last Name: {{ loggedInUser.lastname }}</li>
          <li>Email Address: {{ loggedInUser.email }}</li>
          <li>Jewish Date of Birth: {{ loggedInUser.hebrewDOB }}</li>
          <li>Video Title: <input v-model="title" /></li>
        </ul>
      </div>
    </article>
    <article style="display: flex; justify-content: flex-start; font-size: 2rem">


  <!-- <b-form-group label="Drand and drop video here:" label-cols-sm="2" label-size="lg">
    <b-form-file id="uploadedVideoFile" size="lg" accept="video/*"
    @change="getFileName"
    ></b-form-file>
  </b-form-group> -->

      <div class="file-upload">
        <div class="form-group">
          <input @change="getFileName" type="file" name="file" id="uploadedVideoFile" class="input-file" accept="video/*">
          <label for="uploadedVideoFile" class="btn btn-tertiary js-labelFile" :class="selected ? 'has-file' : ''">
            <i class="icon icon-upload"></i>
            <span class="js-fileName">Загрузить файл</span>
          </label>
        </div>
      </div>

      <button :disabled="!selected" class="btn primary-btn" @click="uploadVideo(uploadedVideoFile)">Upload Video File</button>
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
    <p class="support-info">For support contact <a href="mailto:info@jewishbirthdaymakeover.com">info@jewishbirthdaymakeover.com</a></p>
    <Telethon />
  </section>
</template>

<script>
import axios from "axios";
import * as UpChunk from "@mux/upchunk";
import Telethon from "../components/Telethon";

export default {
  name: "UploadVideo",
  components: {Telethon},
  data() {
    return {
      selected: false,
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
      title: ''
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
      this.selected = true;
    },

    async uploadVideo() {
      const newVideoUpload = await axios({
        method: "post",
        url: `api/post/processvid`,
        data: {},
        ...this.existingToken
      });

      console.log(newVideoUpload)

      if (newVideoUpload.status === 200) {
        this.newVideoOptions.muxUploadId = newVideoUpload.data.uploadId;
        this.newVideoOptions.uploaderId = this.loggedInUser.id;
        this.newVideoOptions.uploaderEmail = this.loggedInUser.email;
        this.newVideoOptions.uploadedVideoFileName = this.uploadedVideoFileName;
        this.newVideoOptions.title = this.title;

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
            try {
              const newProduct = await axios.post(
                  `api/post/create-new-product`,
                  this.newVideoOptions,
                  this.existingToken
              );
              this.$router.push('upload-success');
              console.log(newProduct);
            } catch (e) {
              console.log(e);
              alert(e.response.data.message);
            }
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

.progress {
  margin: 1rem;
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
  text-align: center;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.user-info {
  margin: 3rem;
}

.user-info h3 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
.user-info ul {
  list-style: none;
}
.user-info li {
  font-size: 2rem;
}

.file-upload .form-group {
  margin: 0;
}

.file-upload .btn-tertiary{color:#555;padding:0;line-height:40px;width:300px;margin:auto;display:block;border:2px solid #555}
.file-upload .btn-tertiary:hover,.file-upload .btn-tertiary:focus{color:#888;border-color:#888}
.file-upload .input-file{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}
.file-upload .input-file + .js-labelFile{
  cursor: pointer;
  border:  none;
  background-color: #699AF1;
  border-radius: 2rem;
  font-size: 1.6rem;
  color:  #fff;
  font-weight: bold;
  padding: 0.75rem 2.2rem;
  margin: 0 2rem;
}
.file-upload .input-file + .js-labelFile.has-file{
  background-color: #5AAC7B;
}

.support-info {
  margin: 3rem 0;
}

</style>
