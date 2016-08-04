'use strict';

const
  fs      = require('fs'),
  worker  = require('../lib/worker');

fs.readFile("output.json", function(err, content){

  try {
      var data = JSON.parse(content);
  } catch(e){
    console.error(e);
    process.exit(1);
  }

  worker.runSway(data, require('../lib/worker/hooks'),(err, results) => {

    console.log("End:", err, results);
    process.exit(0);
  });
});
