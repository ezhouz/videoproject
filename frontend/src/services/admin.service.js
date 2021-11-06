import {BaseService} from "./base.service";
import axios from "axios";

class AdminService extends BaseService {
    static VIDEO_URI = '/api/admin/videos';

    async loadVideos() {
        const resp = await axios.get(AdminService.VIDEO_URI, {
            headers: this.getHeaders()
        });
        return resp.data.map(v => ({
            ...v,
            thumbnail: `https://image.mux.com/${v.muxPlaybackId}/thumbnail.jpg`,
        }));
    }

    async disableVideo(id) {
        const resp = await axios.put(AdminService.VIDEO_URI + '/' + id, {
            id,
            isActive: false
        }, {
            headers: this.getHeaders()
        });

        if (resp.status > 201) {
            this.loadError = true;
            this.loadErrorMessge = "Can't remove due some error";
            console.log(resp.data);
        }
    }
    async enableVideo(id) {
        const resp = await axios.put(AdminService.VIDEO_URI + '/' + id,{
            id,
            isActive: true
        },{
            headers: this.getHeaders()
        });

        if (resp.status > 201) {
            this.loadError = true;
            this.loadErrorMessge = "Can't remove due some error";
            console.log(resp.data);
        }
    }
    async removeVideo(id) {
        const resp = await axios.delete(AdminService.VIDEO_URI + '/' + id, {
            headers: this.getHeaders()
        });

        if (resp.status > 201) {
            this.loadError = true;
            this.loadErrorMessge = "Can't remove due some error";
            console.log(resp.data);
        }
    }
}

export default new AdminService();
