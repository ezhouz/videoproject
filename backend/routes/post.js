const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const voteCount = require("../db/models/voteCount");
var passport = require("passport");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

const stripe = require("stripe")(
  "sk_test_51JiQROLdf9pUITPXjFVhN1U57TFuK9XUeZZJ68erb9xDTOl8fRQSELgfpZwgZ0KO1prHmJBVX9M0KplNtbwMvVw6000ZPp9YTs"
);

async function createVoteRecord(name, stripeId, muxId) {
  try {
    voteCount
      .create({
        videoName: name,
        voteTally: 0,
        stripeId,
        muxId,
      })
      .then((res) => {
        console.log("created");
        return "product created";
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } catch (err) {
    console.log(err);
  }
}
 
function validateMyToken(token) {
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return {
          success: false,
          message: 'Token is not valid'
        };
      }
      return decoded;
    });
  } else {
    return {
      success: false,
      message: 'Token not provided'
    };
  }
}

router.post("/validatetoken",  (req, res) => {
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
  const productName = req.body.videoTitle;
  const stripeId = "";

  const { Video, Data } = new Mux();

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

router.post("/create-new-product", async (req, res) => {
  const vm = res;
  const filename = req.body.fileName;
  const muxId = req.body.MuxId;

  let stripeId = "";
  console.log(filename);
  try {
    await stripe.products
      .create({
        name: filename,
      })
      .then((res) => {
        console.log(res);
        if (res.id) {
          stripeId = res.id;
          try {
            stripe.prices
              .create({
                product: res.id,
                unit_amount: 100,
                currency: "usd",
              })
              .then((res) => {
                if (res.id) {
                  createVoteRecord(filename, res.id, muxId).then((res) => {
                    vm.send(res);
                  });
                }
              });
          } catch (err) {
            console.log(err);
          }
        }
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1JiQpFLdf9pUITPXCptDssnG",

        quantity: req.body.qty,
      },
    ],
    payment_method_types: ["card"],

    mode: "payment",

    success_url: `${YOUR_DOMAIN}/success.html`,

    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
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
