<template>
  <section v-if="user && user.isAdmin" class="admin-section">
    <Header title="Moderate uploaded videos"/>
    <b-table :items="videos" :fields="fields">
      <template #cell(thumbnail)="data">
        <div class="photo-full d-flex justify-content-center">
          <img style="height: 50px" :src="data.value"/>
        </div>
      </template>
      <template #cell(isActive)="data">
        {{ data.item.isActive ? 'Yes' : 'No' }}
      </template>
      <template #cell(actions)="row">
        <div class="d-flex align-items-sm-stretch flex-column justify-content-between">
          <b-button
              v-if="!row.item.isActive"
              size="sm"
              @click="enable(row.item, row.index, $event.target)"
              class="m-1 btn btn-primary">
            Enable
          </b-button>
          <b-button
              v-if="row.item.isActive"
              size="sm"
              @click="disable(row.item, row.index, $event.target)"
              class="m-1 btn btn-secondary">
            Disable
          </b-button>
          <b-button
              size="sm"
              @click="remove(row.item, row.index, $event.target)"
              class="m-1 btn btn-danger">
            Remove
          </b-button>
        </div>
      </template>
    </b-table>
  </section>

</template>
<script>
import Header from "../components/Header";
import adminService from '../services/admin.service';
import userService from '../services/user.service';

export default {
  components: {Header},
  data() {
    return {
      user: null,
      fields: ['thumbnail', 'title', 'email', 'name', 'uploadedAt', 'isActive', {key: 'actions', label: 'Actions'}],
      videos: []
    };
  },
  async created() {
    this.user= await userService.getCurrentUser();
    if (!this.user || !this.user.isAdmin) {
      await this.$router.push('/login');
      return;
    }
    this.videos = await adminService.loadVideos();
  },
  methods: {
    async enable(item) {
      await adminService.enableVideo(item.id);
      this.videos = await adminService.loadVideos();
    },
    async disable(item) {
      await adminService.disableVideo(item.id);
      this.videos = await adminService.loadVideos();
    },
    async remove(item) {
      const res = await this.$bvModal.msgBoxConfirm('Are you sure you want to completely Remove this video?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      });
      if (res) {
        await adminService.removeVideo(item.id);
        this.videos = await adminService.loadVideos();
      }
    }
  }
}
</script>
<style scoped>
.admin-section {
  font-size: 1.8rem
}

.admin-section .btn {
  font-size: 1.8rem;
}

.modal-dialog, .modal-body {
  font-size: 1.8rem;
}
</style>
