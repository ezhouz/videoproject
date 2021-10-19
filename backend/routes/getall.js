const express = require("express");
const router = express.Router();
const request = require("request");
const axios = require("axios");

const voteCount = require("../db/models/voteCount");

const token = Buffer.from(
  `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`,
  "utf8"
).toString("base64");

var config = {
  method: "get",
  url: "http://api.mux.com/video/v1/assets/",
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "text/plain",
  },
};

router.get("/allvideos", (req, res) => {
  axios(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/current-vote-count", async (req, res) => {
  await voteCount.findAll().then(data => {
    res.send(data);
  })
  
})

module.exports = router;
