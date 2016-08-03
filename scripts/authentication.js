const
	https 	= require('https'),
  cheerio = require('cheerio'),
  async 	= require('async'),
  request = require('request');

async.waterfall([
	// GET login iframe
  function(next){
		console.log("Start GET")
    request.get(
			"https://api.moovly.com/oauth2/authorize?response_type=token&state=xyz&client_id=oauth25458aecb29c9d8.21352539&redirect_uri=https://www.moovly.com/platform/auth.html&token=https://www.moovly.com/platform/login.html",
			{	"Host": "api.moovly.com",
				"Connection": "keep-alive",
				"Pragma": "no-cache",
				"Cache-Control": "no-cache",
				"Upgrade-Insecure-Requests": 1,
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
				"Accept-Encoding": "gzip, deflate, sdch, br",
				"Accept-Language": "pt-PT,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2,pa;q=0.2"
			}, next);
  },
	// get the form properties
  function(res, body, next){
		console.log("Setup FORM");

    var $ = cheerio.load(body);
    var formProps = $("form").serializeArray();
		// formProps.unshift({ name: "form[login]", value: "" });
		// formProps.unshift({ name: "form[password]", value: "moovlypassword" });
		// formProps.unshift({ name: "form[email]", value: "ricardo@cloudoki.com" });

    return next(null,  formProps, res.headers["set-cookie"]);
  },
	// POST the authentication form
  function(formProps, cookies, next){
		console.log("Start POST");

		const exec = require('child_process').exec;
		exec('curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: '+ cookies[0].split(";")[0]+";" +'" -H "Cache-Control: no-cache" -d \'form[_token]='+ formProps[0].value +'&form[email]=edgar@cloudoki.com&form[login]=&form[password]=secretstory\' "https://api.moovly.com/oauth2/login?redirect_uri=https://www.moovly.com/platform/auth.html"', (error, stdout, stderr) => {
		  if (error)
		    return next(error);

			if( stderr.match(/auth\.html#token=(\w+)/) )
				return next(null, RegExp.$1);

			return next();
		});

  },
	function(token, next){

		console.log("TOKEN:", token);

		request.get("https://api.moovly.com/project/list",
		{
			"Host": "api.moovly.com",
			"Connection": "keep-alive",
			"Pragma": "no-cache",
			"Cache-Control": "no-cache",
			"Authorization": token
		}, function(err, res, body){

				console.log(body);

				return next();
		});

	}
], function(err, result){
	console.log("END:", err, result);

});
// requst.post("https://api.moovly.com/oauth2/login?redirect_uri=https://www.moovly.com/platform/auth.html",)
