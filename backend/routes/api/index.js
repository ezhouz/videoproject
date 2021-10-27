const post = require('./post');
const getall = require('./getall');
const auth = require('./auth');
const get = require('./get');

module.exports = app => {
    app.use("/api/post", post),
    app.use("/api/getall", getall)
    app.use("/api/auth", auth)
    app.use("/api/get", get)
}