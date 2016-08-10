'use strict';

const tester = require('./lib/tester');

exports.init = tester.init;

exports.addTest = function(payload, callback) {

  if (payload && payload.repository && payload.repository.url) {
    return tester.create(payload, callback);
  }

  return callback(new Error('Invalid Git payload'));
};

exports.runTest = function(component, swaggerUrl, callback) {
  tester.run(component, swaggerUrl, callback);
};
