const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const voteCount = require("../../db/models/voteCount");
var passport = require("passport");
require("../../config/passport")(passport);
const jwt = require("jsonwebtoken");
const { validateMyToken } = require("./authcheck");
const axios = require("axios");

if (process.env.NODE_ENV !== "production") {

  const SmeeClient = require("smee-client");

  const smee = new SmeeClient({
    source: process.env.WEBHOOK_PROXY_URL,
    target: "http://localhost:3001/api/post/created-video-info",
    logger: console,
  });
  smee.start();
}

router.post("/stripe-success", express.json({ type: 'application/json' }), (req, res) => {
  console.log(req.body)
  if (req.body.data.object.items) {
    console.log(req.body.data.object.items.quantity);
  }
  if(req.body.type === "charge.succeeded") {
    console.log(req.body);
  }
  res.status(200).end()  
});

const stripe = require("stripe")(process.env.STRIPE_SECRET);


async function createVoteRecord(
  muxUploadId,
  uploadedVideoFileName,
  stripeProductId,
  stripePriceId,
  uploaderId,
  uploaderEmail
) {
  try {
    const newVote = await voteCount.create({
      muxUploadId,
      uploadedVideoFileName,
      voteTally: 0,
      stripeProductId,
      stripePriceId,
      uploaderId,
      uploaderEmail,
    });
    if (newVote) {
      console.log("newVote");
    } else {
      console.log("no vote");
    }
  } catch (error) {
    console.log(error);
  }
}

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.products,
    mode: "payment",
    success_url: process.env.SUCCESS_URL || "http://localhost:8080/success",
    cancel_url: process.env.CANCEL_URL ||"http://localhost:8080/vote",
  });

  res.send({ url: session.url });
});

router.post("/validatetoken", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let tokenres = validateMyToken(token);
  if (tokenres.id) {
    res.json({
      status: 200,
      message: "Token is valid",
    });
  } else {
    res.json({
      status: 401,
      message: "Token is not valid",
    });
  }
});

router.post("/processvid", async (req, res) => {
  const { Video, Data } = new Mux();

  Video.Uploads.create({
    cors_origin: process.env.MUX_CORS_ORIGIN || "http://localhost:8080",
    new_asset_settings: {
      playback_policy: "public",
    },
  }).then((upload) => {
    // upload.url is what you'll want to return to your client.
    res.json({
      uploadId: upload.id,
      url: upload.url,
    });
  });
});

let muxVideoPlaybackId = "";

let token = Buffer.from(
  `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`,
  "utf8"
).toString("base64");

let config = {
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "text/plain",
  },
};

// webhook response. supposed to get the playback id
router.post("/created-video-info", async (req, res) => {
  let muxVideoAssetId = "";
  let muxVideoUploadId = "";
  if (req.body.type === "video.asset.created") {
    muxVideoAssetId = req.body.object.id;
    muxVideoUploadId = req.body.data.upload_id;
  } else {
    return;
  }
  try {
    const singlevideo = await axios.get(
      `http://api.mux.com/video/v1/assets/${muxVideoAssetId}`,
      config
    );

    if (singlevideo.data.data) {
      muxVideoPlaybackId = singlevideo.data.data["playback_ids"][0].id;
      const foundVideoRecord = await voteCount.findOne({
        where: {
          muxUploadId: muxVideoUploadId,
        },
      });

      if (foundVideoRecord) {
        try {
          foundVideoRecord.muxPlaybackId = muxVideoPlaybackId;
          foundVideoRecord.save();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("no data???");
    }
  } catch (error) {
    console.log(error);
  }
});

// where all the issues are happening
router.post("/create-new-product", async (req, res) => {
  const muxUploadId = req.body.muxUploadId;
  const uploaderId = req.body.uploaderId;
  const uploaderEmail = req.body.uploaderEmail;
  const uploadedVideoFileName = req.body.uploadedVideoFileName;

  let stripeId = "";

  if (uploadedVideoFileName) {
    try {
      const newStripeProduct = await stripe.products.create({
        name: uploadedVideoFileName,
      });

      if (newStripeProduct.id) {
        stripeId = newStripeProduct.id;
        try {
          const stripePrice = await stripe.prices.create({
            product: stripeId,
            unit_amount: 100,
            currency: "usd",
          });
          if (stripePrice) {
            createVoteRecord(
              muxUploadId,
              uploadedVideoFileName,
              newStripeProduct.id,
              stripePrice.id,
              uploaderId,
              uploaderEmail
            );
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("I have no id");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({
      message: "No video filename",
    });
  }
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
