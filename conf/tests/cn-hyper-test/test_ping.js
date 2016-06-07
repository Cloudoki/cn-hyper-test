"use strict"

var supertest = require("supertest");

function Test(payload, serverAddress){

console.log('payload', payload);
console.log('server'. serverAddress);
  this.name = payload.repository.name;
  this.server = supertest.agent(serverAddress.Server);

this.payload = payload;
this.serverData = serverAddress;
}

Test.prototype.run = function (callback) {
var that = this;
  this.server.get("/ping")
              .expect("Content-type",/json/)
              .expect(200)
              .end(function(err, result) {

var data = {}
   if(err) data.error = err.messsage

data.result = result
data.commit = that.payload
data.config = that.serverData
callback(null, data)
});
};

module.exports = Test;
