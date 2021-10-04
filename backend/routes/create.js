const express = require('express');
const router = express.Router();
const hebrewDate = require("hebrew-date");

router.post("/convertdate", function (req, res) {
    console.log(req.body.userIp.ip)
    let newHebDateSplit = req.body.date.split("-");
    let year, month, day;
    year = Number(newHebDateSplit[0].replace(/['"]+/g, ''));
    month = newHebDateSplit[1];
    day = newHebDateSplit[2].replace(/['"]+/g, '')
    let processedHebrewDate = hebrewDate(year, month, day);
    res.send(processedHebrewDate);
});


module.exports = router;