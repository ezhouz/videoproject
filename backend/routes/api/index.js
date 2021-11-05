const post = require('./post');
const auth = require('./auth');
const get = require('./get');
const videos = require('./videos');

module.exports = app => {
    app.use("/api/post", post);
    app.use("/api/videos", videos);
    app.use("/api/auth", auth);
    app.use("/api/get", get);
}
