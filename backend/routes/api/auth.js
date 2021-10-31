const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploaderInfo = require("../../db/models/uploaderInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authcheck = require("./authcheck");

const postmark = require("postmark");
var client = new postmark.ServerClient(process.env.POSTMARK_SECRET);

function sendEmail(email, subject, emailText) {
  try {
    client.sendEmail({
      From: "noreply@jewishbirthdaymakeover.com",
      To: email,
      Subject: subject,
      HtmlBody: emailText,
      MessageStream: "outbound",
    });
  } catch (error) {
    console.log("issue sending confirmation email");
  }
}

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
        message:
          "Please confirm your email. If you don't see our email in your inbox, please check the spam folder.",
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
            res.send({
              success: false,
              status: 401,
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
              const url = `${process.env.EMAIL_AUTH_URL}/${emailToken}`;
              const emailText = `<h1>Please confirm your email by clicking this link</h1> <a href="${url}">${url}</a>`;
              sendEmail(
                newUser.uploaderEmail,
                "Confirm your account",
                emailText
              );
            }
          );
        }

        res.send({
          status: 200,
          message:
            "Thank you for creating your account. Please click on the link in the email that we sent confirm your email address",
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

router.get("/confirmation/:emailtoken", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.params.emailtoken,
      process.env.EMAIL_SECRET
    );
    if (user) {
      const foundUser = await uploaderInfo.findOne({ where: user.user });
      if (foundUser) {
        try {
          foundUser.uploaderIsConfirmed = true;
          foundUser.save();
          sendEmail(
            foundUser.uploaderEmail,
            "Account Confirmed",
            "<h2>Your account has been confirmed at jewishbirthdaymakeover.com! Mazal Tov!" +
              "</h2><h3>Please <a href='jewishbirthdaymakeover.com/vote'>Click here to log and post your video.</a></h3>"
          );
          req.flash(
            "message",
            "Your account hs been confirmed. An email confirmation has been sent, and you can y"
          );
          res.redirect("/login");
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

    console.log(foundUser);
    if (!foundUser) {
      res.send({
        status: 201,
        message:
          "No user found with that email address. Please check the email address and try again.",
      });
    } else {
      jwt.sign(
        { user: foundUser.id },
        process.env.EMAIL_SECRET,
        { expiresIn: "1d" },
        (err, emailToken) => {
          if (err) {
            console.log(err);
          }

          const url = `${process.env.EMAIL_RESET_URL}/${emailToken}`;
          const emailText = `<h1>Please reset your password by clicking this link</h1>: <a href="${url}">${url}</a>`;
          sendEmail(
            foundUser.uploaderEmail,
            "Jewish Birthday Password Reset",
            emailText
          );
        }
      );
      res.send({
        message:
          "Thank you. Please a password reset link will be sent to your email address.",
      });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/password-reset/:emailtoken", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.params.emailtoken,
      process.env.EMAIL_SECRET
    );
    console.log(user.user);
    if (user.user) {
      req.flash("message", "Please finish resetting your password");
      res.redirect("/passwordresetfinish");
    } else {
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/password-reset-finish", async (req, res) => {
  try {
    const foundUser = await uploaderInfo.findOne({
      where: {
        uploaderEmail: req.body.email,
      },
    });
    if(!foundUser) {

      res.send({
        status: 201,
        message: "User not found. Please check your email address",
      });

    }
    if(req.body.newPassword.length < 8) {
      res.send({
        status: 201,
        message: "Password much be at least 8 characters"
      })
      return
    }
    else if (foundUser) {
      if (req.body.newPassword === req.body.repeatNewPassword) {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        foundUser.uploaderPassword = hashedPassword;
        foundUser.save();
        res.setHeader('Content-type','text/html')
        res.send({
          status: 200,
          message:
            "Your password has been reset. You may now log in with your new password.",
        });
      } else {
        res.send({
          status: 201,
          message: "Passwords do not match",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
