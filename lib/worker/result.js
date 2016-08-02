// NOTE: this should be overwritten by the sway validate

exports.validate = (res, passRules, callback) => {

  var pass = [];
  // try all the conditions
  for (var i = 0; i < passRules.length; i++)
    pass.push( passRules[i](res, res.body) )

  return callback(null, pass.indexOf(false) < 0);
};
