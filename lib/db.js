// levelDB version
'use strict';

const level = require('level');
const db = level('./db', { valueEncoding: 'json' });
const cuid = require('cuid');
const separator = ':';
const nextChar = char => String.fromCharCode(char.charCodeAt(0) + 1);
const nextToSeparator = nextChar(separator);

db.readList = function(key, options = {}) {
  const opts = options;
  if (!key) throw new Error('invalid key: ' + key);
  opts.gt = [key, separator].join('');
  opts.lt = [key, nextToSeparator].join('');
  return db.createReadStream(opts);
};

db.pull = function(component, callback) {
  let error;
  const list = [];
  db.getLastGroup(component, (err, group) => {
    if (err) return callback(err);
    if (!group) return callback(null, { group, list });

    db.createGroup(component, err => {
      if (err) return callback(err);
      db.readList([component, group].join(separator), {
        values: true,
        keys: false
      }).on('error', err => (error = err))
        .on('data', data => list.push(data))
        .on('end', () => {
          if (error) return callback(error);
          callback(null, {
            group,
            list
          });
        });
    });
  });
};

db.createGroup = function(component, callback) {
  db.add(component, '', callback);
};

db.getLastGroup = function(component, callback) {
  let error;
  let group = null;
  db.readList(component, {
    limit: 1,
    keys: true,
    values: false,
    reverse: true
  })
  .on('error', err => (error = err))
  .on('data', data => {
    if (data) group = data.split(separator)[1];
  }).on('end', () => {
    if (error) return callback(error);
    callback(null, group);
  });
};

db.push = function(component, data, callback) {
  db.getLastGroup(component, (err, group) => {
    if (err) return callback(err);
    db.add([component, group || cuid()].join(separator), data, callback);
  });
};

db.add = function(key, value, callback) {
  db.put([key, cuid()].join(separator), value, callback);
};

module.exports = db;
