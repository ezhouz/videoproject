const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function checkAuthenticated(req, res, next) {
  if (validateMyToken(req.body.token)) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
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

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  comparePassword,
  validateMyToken
};
