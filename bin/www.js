"use strict"

const hypert = require('../app'),
      conf = require('../conf/app'),
      app = require('express')(),
      bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/promise', function (req, res) {

  console.log(req.headers);
  console.log(req.body);
  // process git new pushes only
  if( req.headers && req.headers["X-GitHub-Event"] && req.headers["X-GitHub-Event"] === "push" ){
    console.log("Run...")
    // "X-GitHub-Event"
    // "X-GitHub-Delivery"
    // "X-Hub-Signature"


  }

});

app.get('/test', function (req, res) {
  res.send('Not done yet!');
});

app.listen(conf.web.port, function () {
  console.log('Hyper test listening on port', conf.web.port);
});
