const
  async   = require('async'),
  request = require('./request'),
  result  = require('./result'),
  hooks   = require('./hooks');

const run = (url, rules, tries = 5, callback) => {
  console.log("Try",tries,"to test URL:", url)
  async.waterfall([
    // do the request
    (next) => {

      request.do(url, {}, next);
    },
    // check the result
    (response, body, next) => {

      console.log("\t->",response.statusCode);

      var letGo = false;
      async.whilst(() => { return !letGo && tries > 0; }, (next) => {

        result.validate(response, rules.pass, (err, goOn) => {

          letGo = goOn;

          // NOTE: the hooks here
          if( letGo )
            return next(err, response);

          else
            run( hooks.use(response, rules.fail), rules, --tries, callback );

        });

      }, (err, response) => {

        return next(err);
      });

    }
  ], callback);

};

module.exports = {

  run: run
};
