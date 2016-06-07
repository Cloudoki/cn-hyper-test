"use strict"

var supertest = require("supertest");
var async = require('async');
var ZSchema = require('z-schema');
var validator = new ZSchema({
  ignoreUnknownFormats: true
});

function Test(payload, serverAddress) {

  console.log('payload', payload);
  console.log('server'.serverAddress);
  this.name = payload.repository.name;
  this.server = supertest.agent(serverAddress.Server);

  this.payload = payload;
  this.serverData = serverAddress;
}

Test.prototype.run = function(callback) {
  var that = this;

  var date = {
    "type": "object",
    "required": [
      "date",
      "timezone_type",
      "timezone"
    ],
    "properties": {
      "date": {
        "type": "string",
        "format": "date-time"
      },
      "timezone_type": {
        "type": "integer"
      },
      "timezone": {
        "type": "string"
      }
    },
    "example": {
      "date": "1970-01-01 00:00:01.000000",
      "timezone_type": 3,
      "timezone": "UTC"
    }
  };
  var User = {
    "type": "object",
    "required": [
      "id",
      "first_name",
      "last_name"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "email": {
        "type": "string",
        "format": "email"
      }
    }
  };
  var Project = {
    "type": "object",
    "required": [
      "id",
      "name",
      "keyname",
      "description",
      "thumb",
      "created_at",
      "updated_at",
      "created_by"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      },
      "keyname": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "thumb": {
        "type": "string"
      },
      "created_at": date,
      "updated_at": date,
      "created_by": User
    }
  };
  var GallerySubmission = {
    "type": "object",
    "required": [
      "id",
      "project",
      "created_at",
      "updated_at",
      "created_by"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "project": Project,
      "created_at": date,
      "updated_at": date,
      "created_by": User
    }
  };
  var Gallery = {
    "type": "object",
    "required": [
      "id",
      "name",
      "slug",
      "body",
      "created_at",
      "updated_at",
      "project_count"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      },
      "keyname": {
        "type": "string"
      },
      "body": {
        "type": "string"
      },
      "project_count": {
        "type": "integer",
        "format": "int64"
      },
      "created_at": date,
      "updated_at": date
    }
  };

  async.parallel([
      function(cb) {
        /*
              "/gallery/": {
                  "get": {
                      "tags": ["Gallery"],
                      "summary": "Retrieves a collection of galleries",
                      "description": "gets a collection of gallery objects",
                      "responses": {
                          "200": {
                              "description": "Gallery response",
                              "schema": {
                                  "type": "object",
                                  "title": "GalleryCollection",
                                  "required": [
                                      "galleries",
                                      "submissions"
                                  ],
                                  "properties": {
                                      "galleries": {
                                          "type": "array",
                                          "items": {
                                              "$ref": "api/definitions.json#/Gallery"
                                          }
                                      },
                                      "submissions": {
                                          "type": "array",
                                          "items": {
                                              "$ref": "api/definitions.json#/GallerySubmission"
                                          }

                                      }
                                  }
                              }
                          }
                      }
                  }
              },
        */


        var schema = {
          "type": "object",
          "title": "GalleryCollection",
          "required": [
            "galleries",
            "submissions"
          ],
          "properties": {
            "galleries": {
              "type": "array",
              "items": Gallery
            },
            "submissions": {
              "type": "array",
              "items": GallerySubmission
            }
          }
        };
        that.server.get("/gallery/")
          .expect("Content-type", /json/)
          .expect(200)
          .end(function(err, result) {

            var data = {}
            if (err) data.error = err.messsage

            validator.validate(result.body, schema, function(err, valid) {
              data.result = result
              data.body = JSON.parse(result.text);
              delete data.result.text;
              data.commit = that.payload
              data.config = that.serverData
              data.schema = schema
              console.log(err, valid);
              data.validation = {
                err: err ? err : 'noerror',
                valid: valid
              };
              cb(null, data);
            })

          });
      },
      function(cb) {

        var schema = {
          "type": "object",
          "title": "UserGallery",
          "required": [
            "user",
            "published"
          ],
          "properties": {
            "galleries": {
              "type": "array",
              "items": Gallery
            },
            "submissions": {
              "type": "array",
              "items": GallerySubmission

            }
          }
        };

        that.server.get("/gallery/user/48137")
          .expect("Content-type", /json/)
          .expect(200)
          .end(function(err, result) {

            var data = {}
            if (err) data.error = err.messsage

            validator.validate(result.body, schema, function(err, valid) {
              data.result = result
              data.body = JSON.parse(result.text);
              delete data.result.text;
              data.commit = that.payload
              data.config = that.serverData
                            data.schema = schema
              console.log(err, valid);
              data.validation = {
                err: err ? err : 'noerror',
                valid: valid
              };
              cb(null, data);
            })
          });
      },
      function(cb) {

        var schema = Gallery;

        that.server.get("/gallery/demo-gallery?max=10&first=1")
          .expect("Content-type", /json/)
          .expect(200)
          .end(function(err, result) {

            var data = {}
            if (err) data.error = err.messsage

            validator.validate(result.body, schema, function(err, valid) {
              data.result = result
              data.body = JSON.parse(result.text);
              delete data.result.text;
              data.commit = that.payload
              data.config = that.serverData
              console.log(err, valid);
                            data.schema = schema
              data.validation = {
                err: err ? err : 'noerror',
                valid: valid
              };
              cb(null, data);
            })
          });

      }

    ],
    callback
  );

};

module.exports = Test;