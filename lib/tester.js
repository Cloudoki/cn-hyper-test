'use strict';

const fs = require('fs');
const db = require('./db');
const mailer = require('./mailer');
const async = require('async');

const testModules = Object.create(null);
const testByRepo = Object.create(null);

const loadTests = callback => async.waterfall([
  (next) => fs.readdir(__dirname + '/../conf/tests', next),
  (files, next) => {
    Object.keys(testModules).forEach(key => {
      delete testModules[key];
    });

    files.forEach(test => {
      const testModule = require(__dirname + '/../conf/tests/' + test);
      testModules[testModule.id] = testModule;
      testModule.repos.forEach(repo => testByRepo[repo] = testModule.id);
    });
    return next(null, files);
  }
], err => callback(err, testModules));

exports.loadTests = callback => loadTests(callback);

exports.run = function(component, swaggerUrl, callback) {

  db.get(component, onPayload);

  function onPayload(err, testPayload) {
    if (err) return callback(err);
    if (!testPayload) return callback(
      new Error('missing test component push payload')
    );
    const testModule = testModules[component];
    const tests = testModule.poll.map(t => require(t));

    async.series(tests.map(Test => {
      const test = new Test(testPayload, testModule, swaggerUrl);
      return test.run.bind(test);
    }), onTestResult.bind(null, testPayload));
  }

  function onTestResult(testPayload, err, result) {
    const testModule = testModules[component];
    const data = {};

    if (err) console.error('Test Error:', err);

    data.swaggerUrl = swaggerUrl;
    data.error = err ? err.message : undefined;
    data.payload = testPayload;
    data.timestamp = new Date().valueOf();
    data.config = testModule;
    data.result = result;
    // save the result
    db.put(component + '-test-results~' + (new Date().valueOf()), data,
      onSave.bind(null, data));
  }

  function onSave(data, err) {
    if (err) return callback(err);
    const testModule = testModules[component];
    // send the result by email
    mailer.send(testModule.recipients,
      'Test results for component: ' +
      component, data, err => callback(err, data));
  }
};

// create a test intention
exports.create = function(payload, callback) {

  const test = testModules[testByRepo[payload.repository.url]];

  if (!test) {
    return callback(new Error('No defined test:', payload.repository.url));
  }

  if (!~test.branchs.indexOf(payload.ref.replace('refs/heads/', ''))) {
    return callback(new Error('No defined branch:', payload.repository.url));
  }

  return db.put(test.id, payload, callback);
};
