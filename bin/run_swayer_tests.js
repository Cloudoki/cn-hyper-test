'use strict';

const worker = require('../lib/worker');

require('express')().use('/', require('express').static('static')).listen(8700,
  err => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    require('../lib/swayer')
      .fromComponent('moovly-api',
        (err, data, sway) => {
          if (err) {
            console.error(err);
            return process.exit(1);
          }

          worker.runSway(data, require('../lib/worker/hooks'), (err, results) => {

            console.log("End:", err, results);
            process.exit();
          });
        });
  });
