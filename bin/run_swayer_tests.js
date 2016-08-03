'use strict';

const
  async   = require('async'),
  worker  = require('../lib/worker');

require('express')().use('/', require('express').static('static')).listen(8700,
  err => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    require('../lib/swayer')
      .fromComponent('moovly-api',
        (err, data) => {
          if (err) {
            console.error(err);
            return process.exit(1);
          }

          const
            baseURL = data.config.server,
            URIs = [];

          for ( var uri in data.operationsByPath ) {

            var endpoint = data.operationsByPath[uri];
            if( endpoint.method.toLowerCase() != "get" ){
              console.log("Skip", uri, "method", endpoint.method);
            }


          }
          // console.log(JSON.stringify(data, null, 2));
          process.exit();
        });
  });
