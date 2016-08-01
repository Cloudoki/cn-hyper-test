'use strict';

const tester = require('./lib/tester');

exports.init = cb => tester.loadTests(cb);

exports.addTest = function(payload, callback) {

  if (payload && payload.repository && payload.repository.url) {
    return tester.create(payload, callback);
  }

  return callback(new Error('Invalid Git payload'));
};

exports.runTest = function(component, swaggerUrl, callback) {

  return tester.run(component, swaggerUrl, callback);
};
