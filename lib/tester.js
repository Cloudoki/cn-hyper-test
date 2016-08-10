'use strict';

const fs = require('fs');
const path = require('path');
// const db = require('./db');
const db2 = require('./db');
const mailer = require('./mailer');
const async = require('async');
const cuid = require('cuid');
const worker = require('worker');

const testModules = {};
const testByRepo = {};
const hooks = {};

const cleanObject = obj => {
  Object.keys(obj).forEach(key => {
    delete obj[key];
  });
};

const loadFolder = (dir, store, callback) => {
  const fulldir = path.resolve(process.cwd(), dir);
  async.waterfall([
    (next) => fs.readdir(fulldir, next),
    (files, next) => {
      cleanObject(store);

      files.forEach(file => {
        const module = require(path.resolve(fulldir, file));
        store[file.replace('.js', '')] = module;
      });
      return next();
    }
  ], callback);
};

const loadTests = callback => {
  loadFolder('./conf/tests', testModules, err => {
    if (err) return callback(err);

    cleanObject(testByRepo);

    Object.keys(testModules)
      .map(k => ({
        key: k,
        module: testModules[k]
      }))
      .forEach(({ module, key }) => module.repos.forEach(repo => {
        testByRepo[repo] = key;
      }));
    callback();
  });
};

const loadHooks = callback => {
  cleanObject(hooks);
  loadFolder('./conf/tests', hooks, callback);
};

exports.loadTests = loadTests;

exports.loadHooks = loadHooks;

exports.init = callback => async.parallel([loadTests, loadHooks], callback);

exports.run = function(component, callback) {
  const testModule = testModules[component];
  const id = cuid();

  if (!testModule) return callback(new Error('failed to load test config'));

  // TODO: get all pushes not just one
  // db.get(component, onPayload);
  //
  // function onPayload(err, testPayload) {
  //   if (err) return callback(err);
  //   if (!testPayload) testPayload = [];
  //   if (!Array.isArray(testPayload)) testPayload = [testPayload];
  //
  //   worker.run(testModule, hooks, onTestsResult.bind(null, testPayload));
  // }

  // pull all current payloads
  db2.pull(component, (err, payloads) => {
    if (err) return callback(err);
    worker.run(testModule, hooks, onTestsResult.bind(null, payloads));
  });

  function onTestsResult(testPayload, err, result) {
    const data = { id, error: err.message };

    if (err) console.error('Test Error:', err);

    data.payload = testPayload;
    data.timestamp = new Date().valueOf();
    data.config = testModule;
    data.result = result;
    // save the result
    db2.push(component+'-test-results', data, onSave.bind(null, data));

    // db.put(component + '-test-results~' + (new Date().valueOf()), data,
    //   onSave.bind(null, data));
  }

  function onSave(data, err) {
    if (err) return callback(err);
    // send the result by email
    mailer.send(testModule.recipients, 'Test results for component: ' +
      component, data, err => callback(err, data));
  }
};

// create a test intention
exports.create = function(payload, callback) {

  const test = testByRepo[payload.repository.url];

  if (!test) {
    return callback(new Error('No defined test:', payload.repository.url));
  }

  if (!~test.branchs.indexOf(payload.ref.replace('refs/heads/', ''))) {
    return callback(new Error('No defined branch:', payload.repository.url));
  }

  // return db.put(test.id, payload, callback);
  return db2.push(test, payload, callback);
};
