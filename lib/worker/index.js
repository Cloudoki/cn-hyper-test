const
  async   = require('async'),
  request = require('./request'),
  result  = require('./result'),
  hooks   = require('./hooks');

const run = (url, callback) => {

  async.waterfall([
    // do the request
    (next) => {

      request.do(url, {}, next);
    },
    // check the result
    (res, body, next) => {
      console.log(res.statusCode, url)
      var letGo = false;
      async.whilst(() => { return !letGo; }, (next) => {

        result.validate(res, body, (err, prehooks, goOn) => {

          // NOTE: the hooks here
          if( !goOn && prehooks && prehooks.length > 0 )
            run( hooks.use(prehooks, url), callback );

          letGo = goOn;
          if( letGo )
            return next(err, body);

        });
      }, (err, res) => {
        
        return callback(err);
      });

    }
  ], callback);

};

module.exports = {

  run: run
};
