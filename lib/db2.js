// levelDB version
'use strict';

const level = require('levelup'),
  db    = level("./db", { valueEncoding: 'json' }),
  cuid  = require('cuid');

var group;

function createKey(){

  var _params = Array.prototype.slice.call(arguments),
    _key = "";

  for (var i = 0; i < _params.length; i++)
    _key += _key ? "~"+_params[i] : _params[i];

  return _key;
}

exports.push = function(table, value, callback){

  if( group == null )
    group = cuid();

  var _key = createKey(table, group, cuid());

  db.batch([{ type:'put', key: _key, value:value }], function (err) {
    var op = {}; op[_key] = value;
    return callback(err, op);
  });
};

exports.pull = function(table, callback){

  var error,
    results = [];

  var filter = {
    gt: createKey(table, group),
    keys: true,
    values: true
  };

  db.createReadStream(filter)
    .on('data', function (data) {
      // fresh data
      results.push(data.value);
    })
    .on('error', function (err) {
      // if error occur
      error = err;
    })
    .on('end', function () {
      // generate a new group
      group = cuid();
      return callback(error, results);
    });
};
