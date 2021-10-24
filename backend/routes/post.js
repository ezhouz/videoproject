const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const voteCount = require("../db/models/voteCount");
var passport = require("passport");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");
const { validateMyToken } = require("./authcheck");

const SmeeClient = require("smee-client");

const smee = new SmeeClient({
  source: process.env.WEBHOOK_PROXY_URL,
  target: "http://localhost:3000/post/created-video-info",
  logger: console,
});

const events = smee.start();

const stripe = require("stripe")(
  "sk_test_51JiQROLdf9pUITPXjFVhN1U57TFuK9XUeZZJ68erb9xDTOl8fRQSELgfpZwgZ0KO1prHmJBVX9M0KplNtbwMvVw6000ZPp9YTs"
);

async function createVoteRecord(
  muxVideoId,
  uploadedVideoFileName,
  stripeProductId,
  stripePriceId,
  uploaderId,
  uploaderEmail
) {
  try {
    const newVote = await voteCount.create({
      muxVideoId,
      uploadedVideoFileName,
      voteTally: 0,
      stripeProductId,
      stripePriceId,
      uploaderId,
      uploaderEmail,
    });
    if (newVote) {
      return "product created";
    } else {
      return "no vote";
    }
  } catch (error) {
    console.log(error);
  }
}

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.priceId,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 1000
        },
        price_data: {
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
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
    cors_origin: "http://localhost:8080",
    new_asset_settings: {
      playback_policy: "public",
    },
  }).then((upload) => {
    // upload.url is what you'll want to return to your client.
    res.json({
      url: upload.url,
      id: upload.id,
    });
  });
});

let muxVideoId = "";

router.post("/created-video-info", (req, res) => {
  console.log(req.body)
  if (req.body.type === "video.asset.created") {
    muxVideoId = req.body.object.id;
  }
});

router.post("/create-new-product", async (req, res) => {
  const uploaderId = req.body.uploaderId;
  //const videoUploadId = req.body.videoUploadId;
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
            console.log(muxVideoId);
            createVoteRecord(
              muxVideoId,
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
