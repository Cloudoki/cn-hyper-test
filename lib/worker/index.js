const
  async   = require('async'),
  request = require('./request'),
  result  = require('./result');

const runSway = (sway, hooks, callback) => {

  const
    baseURL = sway.config.server,
    URIs = {};

  for ( var uri in sway.operationsByPath ) {
    // console.log("URI:", uri);

    // NOTE: Skip endpoints with parameters (needs dummy info)
    if( uri.match(/{|}/g) )
      continue;

    // console.log(uri)
    sway.operationsByPath[uri].forEach(operation => {
      // console.log("\tMethod:", operation.method.toUpperCase());

      // NOTE: Skip any method but get and endpoints with parameters
      if( operation.method == "get" && operation.parameters.length < 1 ){
        URIs[uri] = operation;
      }

    });

    if( Object.keys(URIs).length > 0 )
      break;
  }

  // console.log(URIs.length);
  // console.log(URIs);
  async.forEachOfSeries(URIs, (operation, uri, next) => {

    return run(baseURL+uri, operation, 2, hooks, next);

  }, (err) => {
    return callback(err);
  });

};

const run = (url, options, tries = 5, hooks, callback) => {

  console.log("Try URL:", url);

  async.waterfall([
    // do the request
    (next) => {

      request.do(url, options, next);
    },
    // check the result
    (response, body, next) => {

      console.log("\t->",response.statusCode);

      var letGo = false;
      async.whilst(() => { return !letGo && tries > 0; }, (next) => {

        // validate responses
        result.validate(response, options.responses, (err, goOn) => {

          letGo = goOn;

          // NOTE: the hooks here
          if( letGo ){

            // end for this endpoint, just continue to the next one
            return next(err);
          }
          else {

            // try to do a workarround by the HTTP status recursivelly until
            // reach the request limit or the validation is OK
            var workarround = hooks[response.statusCode];
            if ( workarround ==  null ){
              console.warn("There is no hook to HTTP status", response.statusCode,"skipping URL", url);
              letGo = true;
              return next(err);
            }

            return hooks[response.statusCode](response, (err, url, headers) => {
              if( err )
                return next(err);

              for (var header in headers) {

                if( options.headers == null )
                  options.headers = {};

                options.headers[header] = headers[header];
              }
              return run( url, options, --tries, hooks, callback );
            });
          }

        });

      }, (err) => {

        return next(err);
      });

    }
  ], callback);

};

module.exports = {

  run: run,
  runSway : runSway
};
