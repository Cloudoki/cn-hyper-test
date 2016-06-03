"use strict"

var supertest = require("supertest");

module.exports = function(callback){

  return callback(null, { ok:true });
}

function Test(name, serverAddress){

  this.name = name;
  this.server = supertest.agent(serverAddress);
}

Test.prototype.run = function (callback) {

  this.server.get("/")
              .expect("Content-type",/json/)
              .expect(200)
              .end(callback);
};

module.exports = Test;
