"use strict"

const fs = require('fs'),
      db = require('./db'),
      mailer = require('./mailer'),
      async = require('async');


var _testModules = {};
var mapThings = {};

var reloadTests = function(){

  async.waterfall([
    function(next){
      fs.readdir(__dirname+'/../conf/tests', next)
    },
    function(files, next){
      console.log("Loading tests:", files);
      _testModules = {};
      files.forEach(function(test){
        _testModules[test] = require(__dirname+'/../conf/tests/'+test);
      });
      return next(null, files);
    }
  ], function(err, tests){
    if( err )
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

exports.run = function(component, callback){

 var thetest = _testModules[component]

  db.get(component, function(err, testpayload){

    var manytests = []

    for(var i = 0; i < thetest.Poll.length; i++) {
      manytests.unshift(require(thetest.Poll[i]));
    }

    async.series(manytests.map(function(t) { var atest = new t(testpayload, thetest); return atest.run.bind(atest) }), function(err, result){
      // save the result
      db.put(component+"-test-results~"+(new Date().valueOf()), result);
      // send the result by email
      mailer.send(thetest.Recipients, "Test results for component: "+component, { error: err ? err.message : 'noerror', result: result }, callback);
    });
  });
};

// create a test intention
exports.create = function(payload, callback){

  var test = _testModules[mapThings[payload.repository.url]];

  if( !test ) return callback(new Error("No defined test:", testName));

  console.log('going to save', test.Id);
  async.each([test], function(t, next){

    // TODO: id, key = commit number
     console.log('saving ; ', payload);
    return db.put(t.Id, payload, next);
  }, callback);
};
