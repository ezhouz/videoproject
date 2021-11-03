import axios from "axios";

class VideoService {
    static VIDEO_LIST_URI = 'api/videos'
    static VIDEO_VOTE_URI = 'api/videos/vote'

    #authToken;

    setAuthToken(token) {
        this.#authToken = token;
    }

    async loadVideos() {
        const resp = await axios.get(VideoService.VIDEO_LIST_URI, {
            headers: this.getHeaders()
        });
        const videos = [];
        try {
            resp.data.forEach((video) => {
                const currentPlaybackId = video.muxPlaybackId;
                videos.push({
                    id: video.id,
                    src: `https://stream.mux.com/${currentPlaybackId}.m3u8`,
                    thumbnail: `https://image.mux.com/${currentPlaybackId}/thumbnail.jpg`,
                    type: "application/x-mpegURL",
                    votes: video.votes,
                    isVoted: video.isVoted,
                    isCurrentVideoVoted: video.votedId === video.id,
                    playbackId: currentPlaybackId,
                    uploadedVideoFileName: video.fileName,
                    title: video.title,
                    uploaderEmail: video.uploader.uploaderEmail,
                    uploaderBirthDate: video.uploader.uploaderDOBHebrew,
                    uploaderId: video.uploader.uploaderId,
                });
            });
            return videos;
        } catch (error) {
            this.loadError = true;
            this.loadErrorMessge = "Error loading videos";
            console.log(error);
        }
    }

    async vote(id) {
        const resp = await axios.post(VideoService.VIDEO_VOTE_URI, {
            id
        });

        if (resp.status > 201) {
            this.loadError = true;
            this.loadErrorMessge = "Can't vote due some error";
            console.log(resp.data);
        }
    }

    getHeaders() {
        if (this.#authToken) {
            return {
                Authorization: 'Bearer ' + this.#authToken
            };
        } else {
            return {};
        }
    }
}

export default new VideoService();
