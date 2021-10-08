require('dotenv').config()

const express = require("express");
const app = express();

const path = require("path");

const cors = require("cors");
app.use(cors());



app.use(express.static(__dirname + "/"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./db/dbconfig");

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const routes = require("./routes/index");
routes(app);

// Init server.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
