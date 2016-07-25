// levelDB version
'use strict';

const level = require('levelup');
const db = level(__dirname + '/../db', { valueEncoding: 'json' });

exports.put = function(key, data, callback) {

  if (key == null) key = new Date().valueOf();

  db.put(key, data, callback);

};

exports.get = db.get.bind(db);

exports.next = function(component, callback) {

  var filter = {};
  var result;
  var error;

  filter.start = component;
  filter.keys = true;
  filter.values = true;
  filter.limit = 1;

  db.createReadStream(filter)
    .on('data', function(data) {
      result = data.value;
    })
    .on('error', function(err) {
      // log.error("[Dumper] err:", err);
      error = err;
    })
    .on('end', function() {

      return callback(error, result);
    });
};
