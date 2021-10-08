// const products = require('./products');
const post = require('./post');
const getall = require('./getall');
// const erase = require('./delete');
// const update = require('./update');

module.exports = app => {
    // app.use('/products', products),
    app.use('/post', post),
    app.use('/getall', getall)
    // app.use('/delete', erase),
    // app.use('/update', update)
}