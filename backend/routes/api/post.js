const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const voteCount = require("../../db/models/voteCount");
var passport = require("passport");
require("../../config/passport")(passport);
const jwt = require("jsonwebtoken");
const { validateMyToken } = require("./authcheck");

if (process.env.NODE_ENV !== "production") {
  const SmeeClient = require("smee-client");

  const smee = new SmeeClient({
    source: process.env.WEBHOOK_PROXY_URL,
    target: "http://localhost:3001/api/post/created-video-info",
    logger: console,
  });
  smee.start();
}

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
    payment_method_types: ["card"],
    line_items: req.body.products,
    mode: "payment",
    success_url: "http://localhost:3001/vote",
    cancel_url: "http://localhost:3001/vote",
  });

  res.json({ id: session.id });
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
router.post("/created-video-info", (req, res) => {
  if (req.body.type === "video.asset.created") {
    muxVideoId = req.body.object.id;
  }
});

// where all the issues are happening
router.post("/create-new-product", async (req, res) => {
  try {
    const singlevideo = await axios.get(
      `http://api.mux.com/video/v1/assets/00WhQbIeu42SPuU52WJO01ksJjXQ8b66BjZDiWvGiJ87w`,
      config
    );
    console.log(singlevideo)

    if (singlevideo.data.data) {
      muxVideoId = singlevideo.data.data["playback_ids"][0].id;
    } else {
      res.json({
        message: "No video found",
      });
    }
  } catch (error) {
    res.send(error);
  }

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
