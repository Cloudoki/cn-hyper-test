const
  async   = require('async'),
  request = require('./request'),
  result  = require('./result');

const runSway = (specifications, hooks, sway, callback) => {

  const
    baseURL = specifications.config.server,
    URIs = {};

  for ( var uri in specifications.operationsByPath ) {

    specifications.operationsByPath[uri].forEach(operation => {
      // console.log("\tMethod:", operation.method.toUpperCase());

      // NOTE: Skip any method but get and endpoints with parameters
      if( operation.method == "get" && operation.parameters.length < 1 ){
        URIs[uri] = operation;
      }

    });
  }

  var results = {};
  async.forEachOfSeries(URIs, (operation, uri, next) => {

    console.log("Test URL:", baseURL+uri);
    setTimeout(() => {

        // TODO: send only the sway related with this endpoint/ URL instead of all sway instance
        return run(baseURL+uri, operation, 2, hooks, sway, (error, result) => {

          results[baseURL+uri] = { error, result };
          // each endpoint result
          return next();
        });
    }, 2000);

  }, (err) => {

    return callback(err, results);
  });

};

const run = (url, options, tries = 5, hooks = {}, sway, callback) => {

  async.waterfall([
    // do the request
    (next) => {

      request.do(url, options, next);
    },
    // check the result
    (response, body, next) => {

      console.log("\tStatus:",response.statusCode);

      var letGo = false;
      async.whilst(() => { return !letGo && tries > 0; }, (next) => {

        // validate responses
        result.validate(response, options.responses, sway, (err, result) => {

          if( err ){
            console.error("Error validating endpoint:", url, err);
            return next(err);
          }

          letGo = result != null;

          // NOTE: the hooks here
          if( letGo ){

            // end for this endpoint, just continue to the next one
            return next(err, result);
          }
          else {

            // try to do a workarround by the HTTP status recursivelly until
            // reach the request limit or the validation is OK
            var workarround = hooks[response.statusCode];
            if ( workarround ==  null ){
              console.log("Unexpected result ("+ response.statusCode +") skipping...");
              letGo = true;
              return next(err);
            }

            return hooks[response.statusCode](response, (err, url, headers) => {

              if( err ){
                console.error("Error applying hook for",response.statusCode, "error:", err)
                return next(err);
              }

              for (var header in headers) {

                if( options.headers == null )
                  options.headers = {};

                options.headers[header] = headers[header];
              }

              return run( url, options, --tries, hooks, callback );
            });
          }

        });

      }, next);

    }
  ], (err, result) => {

    if( err )
      console.error("Error testing URL:", url, err);

    console.log("\tDONE:", url);

    return callback(err, result);
  });

};

module.exports = {
  run
};
