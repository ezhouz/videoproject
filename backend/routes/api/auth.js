const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploaderInfo = require("../../db/models/uploaderInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authcheck = require("./authcheck");

const postmark = require("postmark");
var client = new postmark.ServerClient("59377c79-d6d3-4879-af4e-03f39c9c40b0");

function sendEmail(email, subject, emailText) {
  client.sendEmail({
    From: "info@jewishbirthdaymakeover.com",
    To: email,
    Subject: subject,
    HtmlBody: emailText,
    MessageStream: "outbound",
  });
}

router.post("/test", async (req, res) => {
  const email = await sendEmail();
  res.send(email);
});

router.use(passport.initialize());

router.post("/login", async (req, res) => {
  try {
    const user = await uploaderInfo.findOne({
      where: {
        uploaderEmail: req.body.email,
      },
    });

    if (!user) {
      res.send({
        status: 401,
        success: false,
        message: "Authentication failed. User not found.",
      });
    } else if (!user.uploaderIsConfirmed) {
      res.send({
        status: 401,
        message: "Please confirm your email",
        success: false,
      });
    } else {
      authcheck.comparePassword(
        req.body.password,
        user.dataValues.uploaderPassword,
        function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            // return the information including token as JSON
            res.json({ status: 200, success: true, token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  const uploader = req.body.user;

  try {
    const user = await uploaderInfo.findOne({
      where: {
        uploaderEmail: uploader.email,
      },
    });

    if (user) {
      res.send({
        status: 201,
        message: "User already exists",
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(uploader.password, 10);
        const newUser = await uploaderInfo.create({
          uploaderFirstName: uploader.firstname,
          uploaderLastName: uploader.firstname,
          uploaderEmail: uploader.email,
          uploaderPassword: hashedPassword,
          uploaderDOBEnglish: uploader.uploaderDOBEnglish,
          uploaderDOBHebrew: uploader.uploaderDOBHebrew,
        });

        if (newUser) {
          jwt.sign(
            { user: newUser.id },
            process.env.EMAIL_SECRET,
            { expiresIn: "1d" },

            (err, emailToken) => {
              const url = `http://localhost:3001/api/auth/confirmation/${emailToken}`;
              const emailText = `<h1>Please confirm your email by clicking this link</h1>: <a href="${url}">${url}</a>`;
              sendEmail(newUser.uploaderEmail, newUser.subject, emailText);
            }
          );
        }

        res.send({
          status: 200,
          message: "New User Created",
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: 500,
          message: "Creation error " + error,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "New User Error?",
    });
  }
});

router.post("/confirmation/:emailtoken", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.params.emailtoken,
      process.env.EMAIL_SECRET
    );
    if (user) {
      const foundUser = await uploaderInfo.findOne({ where: user.user });
      if (foundUser) {
        console.log(foundUser);
        try {
          foundUser.uploaderIsConfirmed = true;
          foundUser.save();
          sendEmail(
            "info@jewishbirthdaymakeover.com",
            "account confirmed",
            "your account is working! mazal tov!"
          );
          res.send({
            status: 200,
            message: "user confirmed",
          });
        } catch (error) {
          res.send(error);
        }
      }
    } else {
      res.send("err");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/password-reset", async (req, res) => {
  try {
    const foundUser = await uploaderInfo.findOne({
      where: {
        uploaderEmail: req.body.email,
      },
    });
    console.log(foundUser.id);
    if (foundUser.id) {
      jwt.sign(
        { user: foundUser.id },
        process.env.EMAIL_SECRET,
        { expiresIn: "1d" },

        (err, emailToken) => {
          const url = `http://localhost:3001/api/auth/password-reset/${emailToken}`;
          const emailText = `<h1>Please reset your password by clicking this link</h1>: <a href="${url}">${url}</a>`;
          sendEmail(
            foundUser.uploaderEmail,
            "Jewish Birthday Password Reset",
            emailText
          );
        }
      );
    } else {
      res.send({
        status: 201,
        message: "No user found",
      });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/password-reset/:emailtoken", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.params.emailtoken,
      process.env.EMAIL_SECRET
    );
    res.send(user)
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
