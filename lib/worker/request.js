const request =  require('request');

exports.do = (url, options = {}, callback) => {

  var _options = {};
  _options.method = options.method;
  _options.url = options.url || url;

  _options.followRedirects = false;

  if( _options.headers == null )
    _options.headers = {};

  _options.headers["Cache-Control"] = "no-cache";

  if( options.headers )
    for (var header in options.headers)
      _options.headers[header] = options.headers[header];

  return request(_options, callback);
};
