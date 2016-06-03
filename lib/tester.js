"use strict"

const fs = require('fs'),
      db = require('./db'),
      mailer = require('./mailer'),
      async = require('async');

var _testModules = [];

var reloadTests = function(){

  async.waterfall([
    function(next){
      fs.readdir(__dirname+'/../conf/tests', next)
    },
    function(files, next){
      console.log("Loading tests:", files.join(", "));
      _testModules = [];
      files.forEach(function(test){
        _testModules.push( require(__dirname+'/../conf/tests/'+test) );
      });
      return next();
    }
  ], function(err){
    if( err )
      console.error("Error loading tests:", err);
    else {
      console.log("Tests loaded successfully!")
    }
  })
};

reloadTests();

exports.run = function(testname, callback){

  db.get(testname, function(err, test){

    async.series(test.Poll, function(err, result){

      if( err )
        return callback(err);

      mailer.send(test.Recipients, "Test results for component: "+testname, result, callback);
    });
  });
};

// create a test intention
exports.create = function(repoURL, callback){

  var thetests = _testModules.filter(function(t){
    return t.Repos.indexOf(repoURL) > -1;
  });

  if( !thetests && thetests.length < 1 )
    return callback(new Error("No defined to this repo:", repoURL));

  async.each(thetests, function(t, next){
      // TODO: id, key = commit number
      return db.put(t.Id, new Date().valueOf(), t, next);

  }, callback);

};

exports.list = function(callback){
  return callback(null, []);
};
