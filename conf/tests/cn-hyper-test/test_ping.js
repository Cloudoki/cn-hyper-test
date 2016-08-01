'use strict';

var supertest = require('supertest');

function Test(payload, testModule) {
  this.name = payload.repository.name;
  this.request = supertest.agent(testModule.server);

  this.payload = payload;
  this.testModule = testModule;
}

Test.prototype.run = function(callback) {
  this.request.get('/ping')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, result) => {

      var data = {};
      if (err) data.error = err.messsage;

      data.info = result;
      data.body = JSON.parse(result.text);
      data.config = this.testModule;
      // data.schema
      data.validation = {
        errors: [],
        valid: true
      };
      callback(null, data);
    });
};

module.exports = Test;
