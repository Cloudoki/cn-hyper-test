'use strict';

const fs = require('fs');
const path = require('path');
const db = require('./db');
const mailer = require('./mailer');
const async = require('async');
const worker = require('./worker');

const testModules = {};
const testByRepo = {};
const hooks = {};

exports.hooks = hooks;
exports.testByRepo = testByRepo;
exports.testModules = testModules;

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
  loadFolder('./lib/hooks', hooks, callback);
};

exports.loadTests = loadTests;

exports.loadHooks = loadHooks;

exports.init = callback => async.parallel([loadTests, loadHooks], callback);

exports.test = (component, callback) => {
  const testModule = testModules[component];
  worker.run(testModule, hooks, callback);
};

exports.run = function(component, callback) {
  const testModule = testModules[component];

  if (!testModule) return callback(new Error('failed to load test config'));

  // pull all current payloads
  db.pull(component, (err, data) => {
    if (err) return callback(err);
    worker.run(testModule, hooks, onTestsResults.bind(null, data));
  });

  function onTestsResults({ group, list }, err, output) {
    const id = group;
    const payloads = list;
    const data = { id, error: err.message };

    if (err) console.error('Test Error:', err);

    data.payloads = payloads;
    data.timestamp = new Date().valueOf();
    data.config = testModule;

    if (output) {
      data.specification = output.specification;
      data.results = output.results;
    }
    // save the result
    db.add(component+'-test-results', data, onSave.bind(null, data));
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
  const component = testByRepo[payload.repository.url];
  const test = testModules[component];
  if (!test) {
    return callback(new Error('No defined test:', payload.repository.url));
  }

  if (!~test.branchs.indexOf(payload.ref.replace('refs/heads/', ''))) {
    return callback(new Error('No defined branch:', payload.repository.url));
  }

  return db.push(component, payload, callback);
};
