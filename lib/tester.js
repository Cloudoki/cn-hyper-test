"use strict"

const db = require('./db'),
      mailer = require('./mailer'),
      async = require('async');

exports.run = function(id, callback){

  db.get(id, function(err, test){

    async.waterfall(test.poll, function(err, result){

      mailer.send(result, callback);
    });

  });

};

exports.save = function(){

};

exports.list = function(){

};
