// NOTE: this should be overwritten by the sway validate

exports.validate = (res, body, callback) => {
  // authenticate
  return callback(null, ["token"], res.statusCode == 200);
};
