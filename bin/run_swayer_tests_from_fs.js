'use strict';

const
  fs      = require('fs'),
  worker  = require('../lib/worker');

fs.readFile("output.json", function(err, content){

  var data = JSON.parse(content);
  worker.runSway(data, require('../lib/worker/hooks'),(err) => {

    console.log("End:", err);
  });

});
