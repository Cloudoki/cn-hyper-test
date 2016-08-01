// levelDB version
'use strict';

const level = require('levelup');

level.prototype.next = function(component, callback) {
  let filter = {};
  let result;
  let error;

  filter.start = component;
  filter.keys = true;
  filter.values = true;
  filter.limit = 1;

  this.createReadStream(filter)
    .on('data', data => {
      result = data.value;
    })
    .on('error', err => {
      error = err;
    })
    .on('end', () => callback(error, result));
};

module.exports = level(__dirname + '/../db', { valueEncoding: 'json' });
