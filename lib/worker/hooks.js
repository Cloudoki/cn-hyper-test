const
  cheerio = require('cheerio'),
  async 	= require('async'),
  request = require('request');

var token;

const moovlyAuthentication = (res, callback) => {

  if( token != null )
    return callback(null, token);

  async.waterfall([
  	// GET login iframe
    function(next){
      request.get(
  			"https://api.moovly.com/oauth2/authorize?response_type=token&state=xyz&client_id=oauth25458aecb29c9d8.21352539&redirect_uri=https://www.moovly.com/platform/auth.html&token=https://www.moovly.com/platform/login.html",
  			function(err, res, body){
  				var $ = cheerio.load(body);
  		    var formProps = $("form").serializeArray();
  		    return next(err,  formProps, res.headers["set-cookie"]);
  			});
    },
  	// POST the authentication form
    function(formProps, cookies, next){
  		const exec = require('child_process').exec;
  		exec('curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: '+ cookies[0].split(";")[0]+";" +'" -H "Cache-Control: no-cache" -d \'form[_token]='+ formProps[0].value +'&form[email]=edgar@cloudoki.com&form[login]=&form[password]=secretstory\' "https://api.moovly.com/oauth2/login?redirect_uri=https://www.moovly.com/platform/auth.html"', (error, stdout, stderr) => {
  		  if (error)
  		    return next(error);

  			if( stderr.match(/auth\.html#token=(\w+)/) )
  				return next(null, RegExp.$1);

  			return next();
  		});

    }
  ], function(err, token){
    token = token;

    ;
    return callback(err, res.request.href, { Authorization: token } );
  });

};
// const use = (res, failRules) => {
//
//   if( failRules.url )
//     res.request.href = failRules.url(res.request.href);
//
//   if( failRules.body )
//     res.request.body = failRules.body(res.request.body);
//
//   if( failRules.headers )
//     res.request.headers = failRules.headers(res.request.headers);
//
//   return res.request.href;
// };


module.exports = {
  403: moovlyAuthentication
};
