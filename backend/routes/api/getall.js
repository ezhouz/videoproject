const express = require("express");
const router = express.Router();

const voteCount = require("../../db/models/voteCount");

router.get("/allvideos", async (req, res) => {
  try {
    const allVideos = await voteCount.findAll();
    if (allVideos.length > 0) {
      res.send(allVideos);
    }
  } catch (error) {
    res.send(error)
  }
});


router.get("/current-vote-count", async (req, res) => {
  await voteCount.findAll().then((data) => {
    res.send(data);
  });
});

module.exports = router;
