"use strict"

const tester = require('./lib/tester');

exports.addTest = function(payload, callback){

  if( payload && payload.repository && payload.repository.url )
    return tester.create(payload.repository.url, callback);

  return callback(new Error("Invalid Git payload"));
}

exports.runTest = function(component, callback){

  return tester.run(component, callback);
}
