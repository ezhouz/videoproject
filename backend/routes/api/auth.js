const express = require("express");
const router = express.Router();
const passport = require("passport");
const uploaderInfo = require("../../db/models/uploaderInfo");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const authcheck = require("./authcheck");

router.use(passport.initialize());

router.post("/login", async (req, res) => {
  try {
    const user = await uploaderInfo.findOne({
      where: {
        uploaderEmail: req.body.email,
      },
    });

    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found.",
      });
    } else {
      authcheck.comparePassword(req.body.password,user.dataValues.uploaderPassword, function (err, isMatch) {
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
      });
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
      console.log(user);
      res.send({
        status: 201,
        message: "User already exists",
      });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(uploader.password, 10);
        await uploaderInfo.create({
          uploaderFirstName: uploader.firstname,
          uploaderLastName: uploader.firstname,
          uploaderEmail: uploader.email,
          uploaderPassword: hashedPassword,
          uploaderDOBEnglish: uploader.uploaderDOBEnglish,
          uploaderDOBHebrew: uploader.uploaderDOBHebrew,
        });

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

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
