// NOTE: this should be overwritten by the sway validate

exports.validate = (res, responses, sway, callback) => {

  var pass = [];
  // try all the conditions
  for (var i = 0; i < responses.length; i++)
    pass.push( responses[i].statusCode == res.statusCode );

  // TODO: miss other verifications

  return callback(null, pass.indexOf(true) > -1);
};
