const request =  require('request');

exports.do = (url, options = {}, callback) => {

  if( options.method == null) options.method = 'GET';
  if( options.url == null) options.url = url;

  return request(options, (err, res, body) => {
    
    return callback(err, res, body);
  });
};
