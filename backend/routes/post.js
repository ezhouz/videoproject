const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const fs = require("fs");
const request = require("request");





router.post("/processvid", function (req, res) {

  const { Video, Data }  = new Mux();

  Video.Uploads.create({
    cors_origin: "http://localhost:8080",
    new_asset_settings: {
      playback_policy: "public",
    },

  }).then((upload) => {
    // upload.url is what you'll want to return to your client.
    console.log(upload);
    res.send(upload.url);

  });
});




router.post("/convertdate", function (req, res) {
  let newHebDateSplit = req.body.date.split("-");
  let year, month, day;
  year = Number(newHebDateSplit[0].replace(/['"]+/g, ""));
  month = newHebDateSplit[1];
  day = newHebDateSplit[2].replace(/['"]+/g, "");
  let processedHebrewDate = hebrewDate(year, month, day);
  res.send(processedHebrewDate);
});




module.exports = router;
