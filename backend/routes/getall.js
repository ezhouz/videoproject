const express = require("express");
const router = express.Router();
const request = require("request");
const axios = require("axios");

// const config = {
//   headers: {
//     auth: {
//       username: "be64426d-2030-4fdc-9506-1d0ed04a73a3",
//       password:
//         "iLIPzD1qIJhEmTS0E4yFmQdwpIHFvOFKZ047cQjyCrmLi3QrqQ8oVzP6dqlMs59zIjg2NzqdIYf",
//     },
//   },
// };

const token = Buffer.from(`${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`, 'utf8').toString('base64')


var config = {
    method: 'get',
    url: 'http://api.mux.com/video/v1/assets/',
    headers: { 
      'Authorization': `Basic ${token}`, 
      'Content-Type': 'text/plain'
    },
  };

router.get("/allvideos", (req, res) => {
    
    axios(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });


});

module.exports = router;
