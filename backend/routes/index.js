// const products = require('./products');
const post = require('./post');
const getall = require('./getall');
const auth = require('./auth');

module.exports = app => {
    app.use('/post', post),
    app.use('/getall', getall)
    app.use("/auth", auth)
}