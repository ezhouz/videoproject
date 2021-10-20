if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));