const express = require("express");
const app = express();

var path = require("path");
var cors = require("cors");

app.use(cors());

const hebrewDate = require("hebrew-date");


app.use(express.static(__dirname + "/"));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const routes = require('./routes/index');
routes(app);

const db = require('./db/dbconfig');


db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

app.post("/convertdate", function (req, res) {
    let newHebDateSplit = req.body.date.split("-");
    let year, month, day;
    year = Number(newHebDateSplit[0].replace(/['"]+/g, ''));
    month = newHebDateSplit[1];
    day = newHebDateSplit[2].replace(/['"]+/g, '')
    let processedHebrewDate = hebrewDate(year, month, day);
    res.send(processedHebrewDate);
});


// Init server.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
