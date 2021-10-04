const express = require('express');
const router = express.Router();

// const categoryTop = require('../db/models/category_top');
// const categories = require('../db/models/categories');
// const subcategories = require('../db/models/subcategories');
// const product = require('../db/models/product');

router.get('/topcategories', async (req, res) => {

    try {
        const topCategories = await categoryTop.findAll();
        res.json({
            code: 200,
            topCategories
        })
    } catch (err) {
        res.json({
            code: 200,
            err
        })
    }

})

module.exports = router;