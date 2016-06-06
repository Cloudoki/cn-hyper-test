"use strict"

var supertest = require("supertest");

function Test(payload, serverAddress){

console.log('payload', payload);
console.log('server'. serverAddress);
  this.name = payload.repository.name;
  this.server = supertest.agent(serverAddress.Server);
}

Test.prototype.run = function (callback) {

  this.server.get("/ping")
              .expect("Content-type",/json/)
              .expect(201)
              .end(callback);
};

module.exports = Test;
