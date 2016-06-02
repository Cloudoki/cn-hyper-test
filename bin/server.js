"use strict"

const hypert = require('../app'),
      express = require('express'),
      app = express();

app.get('/', function (req, res) {
  res.send('Not done yet!');
});

app.listen(3000, function () {
  console.log('Hyper test listening on port 3000!');
});
