if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const passport = require("passport");
require("./config/passport")(passport);

const cors = require("cors");
app.use(cors());

app.use(express.static(__dirname + "/"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.set('trust proxy', true)

const db = require("./db/dbconfig");

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const routes = require("./routes/api/index");
routes(app);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
