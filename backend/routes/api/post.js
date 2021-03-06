const express = require("express");
const router = express.Router();
const hebrewDate = require("hebrew-date");
const Mux = require("@mux/mux-node");
const voteCount = require("../../db/models/voteCount");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { validateMyToken } = require("./authcheck");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_SECRET);

if (process.env.NODE_ENV !== "production") {
  const SmeeClient = require("smee-client");

  const smee = new SmeeClient({
    source: process.env.WEBHOOK_PROXY_URL,
    target: "http://localhost:3001/api/post/created-video-info",
    logger: console,
  });
  smee.start();
}

const sendUploadNotification = async () => {
    try {
        await client.sendEmail({
            From: "noreply@jewishbirthdaymakeover.com",
            To: 'rabbi@jewishbirthdaymakeover.com',
            Subject: 'New video is uploaded on jewishbirthdaymakeover.com',
            HtmlBody: 'A new video is uploaded on jewishbirthdaymakeover.com<br> you can moderate it by using the following link <a href="https://jewishbirthdaymakeover.com/admin">https://jewishbirthdaymakeover.com/admin</a>',
            MessageStream: "outbound",
        });
    } catch (error) {
        console.error("issue sending notification email", error);
    }
}
router.post(
  "/stripe-success",
  express.json({ type: "application/json" }),
  async (req, res) => {


    if (req.body.type === "checkout.session.completed") {
      try {
        const sessionRes = await stripe.checkout.sessions.retrieve(
          req.body.data.object.id,
          {
            expand: ["line_items"],
          }
        );

           let lines = sessionRes.line_items.data;
           console.log(lines)
        let processedLines = [];

        lines.forEach((product) => {
          processedLines.push([product.description, product.quantity]);
        });
        console.log(processedLines);

        processedLines.forEach(async (line) => {
          try {
            let voteUpdate = await voteCount.findOne({
              where: {
                uploadedVideoFileName: line[0],
              },
            });
            voteUpdate.voteTally += line[1];
            voteUpdate.save();
          } catch (error) {
            console.log(error);
          }
        });
        res.status(200).end();
      } catch (error) {
        console.log(error);
      }
     }
  }
);

async function createVoteRecord(
  muxUploadId,
  fileName,
  title,
  stripeProductId,
  stripePriceId,
  user,
) {
  const existing = await voteCount.findOne({
    where: {
      uploaderId: user.id
    }
  });
  if (existing) {
    throw new Error('You can upload only one video');
  }
  try {

    const newVote = await voteCount.create({
      muxUploadId,
      fileName,
      votes: 0,
      title,
      stripeProductId,
      stripePriceId,
      uploaderId: user.id
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
    cancel_url: process.env.CANCEL_URL || "http://localhost:8080/vote",
  });

  res.send({ url: session.url });
});

router.post("/validatetoken", (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

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

router.post("/processvid",
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
      const {Video, Data} = new Mux();

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
  }

  try {
    const singlevideo = await axios.get(
      `http://api.mux.com/video/v1/assets/${muxVideoAssetId}`,
      config
    );

    if (singlevideo.data.data) {
      const videoResp = singlevideo.data.data instanceof Array ? singlevideo.data.data[0] : singlevideo.data.data;
      muxVideoPlaybackId = videoResp["playback_ids"][0].id;
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

router.post("/create-new-product",
     passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const user = req.user;
      const muxUploadId = req.body.muxUploadId;
      const uploadedVideoFileName = req.body.uploadedVideoFileName;
      const title = req.body.title;

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
                try {
                  await createVoteRecord(
                      muxUploadId,
                      uploadedVideoFileName,
                      title || uploadedVideoFileName,
                      newStripeProduct.id,
                      stripePrice.id,
                      user,
                  );
                } catch (e) {
                  console.log('trying to upload more than one video');
                  res.status(400);
                  res.json({
                    message: e.message,
                  });
                  return;
                }
              }
              await sendUploadNotification();
              res.status(201);
              res.json({
                message: "Video uploaded",
              });
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
      res.send();
});

router.post("/convertdate", async function (req, res) {
    const dateStr = req.body.date;
    if (!dateStr) {
        res.status(400);
        res.json({
            message: 'invalida date is given'
        });
        return;
    }
    let [year, month, day] = dateStr.split("-");
    try {
        const resp = await axios.get(`https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`);
        if (resp && resp.status === 200) {
            let processedHebrewDate = `${resp.data.hm}-${resp.data.hd}-${resp.data.hy}`;
            res.json({
                date: resp.data.hd,
                month: resp.data.hm,
                year: resp.data.hy,
                month_name: resp.data.hm
            });
        } else {
            throw new Error('hebcal api request problem');
        }
    } catch (e) {
        console.log(e.message);
        res.status(502);
        res.json({
            message: 'Service unavailable'
        })
    }
});

module.exports = router;
