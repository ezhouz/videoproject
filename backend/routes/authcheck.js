const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function checkAuthenticated(req, res, next) {
  console.log("from check auth");
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  console.log("from check not auth");
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function comparePassword(attemptedPassword, existingUserPassword, cb) {
  bcrypt.compare(
    attemptedPassword,
    existingUserPassword,
    function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    }
  );
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  comparePassword
};
