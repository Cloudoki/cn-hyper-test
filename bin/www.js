"use strict"

const hypert = require('../app'),
      conf = require('../conf/app'),
      app = require('express')(),
      bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/promise', function (req, res) {

  // process git new pushes only
  if( req.headers && req.headers['x-github-event'] && req.headers['x-github-event'] === 'push' ){

    hypert.addTest(req.body, function(err, result){

      if( err )
        return res.json({ok:false, error:err});

      return res.json({ok:true});
    });
  }
});

app.get('/test', function (req, res) {

  hypert.addTest({repository: {url: 'https://github.com/Cloudoki/cn-hyper-test'}}, function(err, result){

    if( err )
      return res.json({ok:false, error:err});

    return res.json({ok:true});
  });
});

app.get('/ping', function (req, res) {
  return res.json({ok:true});
});

app.listen(conf.web.port, function () {
  console.log('Hyper test listening on port', conf.web.port);
});
