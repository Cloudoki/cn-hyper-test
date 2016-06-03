"use strict"

const hypert = require('../app'),
      express = require('express'),
      app = express();

app.post('/promise', function (req, res) {

  console.log(req);
  // process git new pushes only
  if( req.headers && req.headers["X-GitHub-Event"] && req.headers["X-GitHub-Event"] === "push" ){

    // "X-GitHub-Event"
    // "X-GitHub-Delivery"
    // "X-Hub-Signature"


  }

});

app.get('/test', function (req, res) {
  res.send('Not done yet!');
});

app.listen(3000, function () {
  console.log('Hyper test listening on port 3000!');
});
