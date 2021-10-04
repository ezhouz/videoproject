// const products = require('./products');
const create = require('./create');
const getall = require('./getall');
// const erase = require('./delete');
// const update = require('./update');

module.exports = app => {
    // app.use('/products', products),
    app.use('/create', create),
    app.use('/getall', getall)
    // app.use('/delete', erase),
    // app.use('/update', update)
}