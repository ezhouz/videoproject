const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const initializePassport = require("../passport-config");
const uploaderInfo = require("../db/models/uploaderInfo");
const { randomInt } = require("crypto");
const bcrypt = require("bcrypt");
const { checkAuthenticated, checkNotAuthenticated } = require("./authcheck");

router.use(passport.initialize());
router.use(passport.session());

async function getUserByEmail(email) {
  try {
    return await uploaderInfo.findOne({
      where: {
        uploaderEmail: email,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "find email Error: " + error,
    });
  }
}

async function getUserById(id) {
  try {
    return await uploaderInfo.findOne({
      id,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "find id Error: " + error,
    });
  }
}

initializePassport(passport, getUserByEmail, getUserById);

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/register", checkNotAuthenticated, async (req, res) => {
  const uploader = req.body.user;

  try {
    const user = await uploaderInfo.findOne({
      where: {
        uploaderEmail: uploader.email,
      },
    });

    if (user) {
      console.log(user)
      res.send({
        status: 201,
        message: "User already exists",
      });
    } else {
      try {
        console.log('made it here')
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
        console.log(error)
        res.send({
          status: 500,
          message: "Creation error " + error,
        });
      }
    }
  } catch (error) {
    console.log(error)
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
