"use strict"

const fs = require('fs'),
  db = require('./db'),
  mailer = require('./mailer'),
  async = require('async');


var _testModules = {};
var mapThings = {};

var reloadTests = function() {

  async.waterfall([
    function(next) {
      fs.readdir(__dirname + '/../conf/tests', next)
    },
    function(files, next) {
      console.log("Loading tests:", files);
      _testModules = {};
      files.forEach(function(test) {
        _testModules[test] = require(__dirname + '/../conf/tests/' +
          test);
      });
      return next(null, files);
    }
  ], function(err, tests) {
    if (err)
      console.error("Error loading tests:", err);
    else {
      tests.forEach(function(test) {
        _testModules[test].Repos.forEach(function(repo) {
          mapThings[repo] = test;

        })
      })

      console.log(mapThings)
      console.log("Tests loaded successfully!")
    }
  })
};

reloadTests();

exports.run = function(component, callback) {

  var thetest = _testModules[component]

  db.get(component, function(err, testpayload) {

    if(err) return callback(err);

    if(!testpayload) return callback(new Error('no saved push'))

    var manytests = thetest.Poll.map(t => require(t));

    async.series(manytests.map(function(t) {
      var atest = new t(testpayload, thetest);
      return atest.run.bind(atest);
    }), function(err, result) {

      var data = {}

      data.error = err ? err.message : undefined;
      data.payload = testpayload;
      data.timestamp = new Date().valueOf();
      data.config = thetest;
      data.result = result;
      // save the result
      db.put(component + "-test-results~" + (new Date().valueOf()),
        data);
      // send the result by email
      mailer.send(thetest.Recipients, "Test results for component: " +
        component, data, callback);
    });
  });
};

// create a test intention
exports.create = function(payload, callback) {

  var test = _testModules[mapThings[payload.repository.url]];

  if (!test) return callback(new Error("No defined test:", payload.repository
    .url));

  if (-1 == test.Branchs.indexOf(payload.ref.replace('refs/heads/', '')))
    return callback(new Error("No defined branch:", payload.repository.url));

  return db.put(test.Id, payload, callback);
};
