"use strict"

var supertest = require("supertest");
var async = require('async');
var ZSchema = require('z-schema');
var validator = new ZSchema({
  ignoreUnknownFormats: true,
  noTypeless: true,
  assumeAdditional: true,
  forceProperties: true,
  breakOnFirstError: false
});

var sway = require('sway');

// TODO: serve schema
// fake payload

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
    "slug": {
      "type": "string"
    },
    "body": {
      "type": "string"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "project_count": {
      "type": "integer",
      "format": "int64"
    }
  }
};
var ProjectPublished = {
  "type": "object",
  "required": [
    "id",
    "name",
    "keyname",
    "description",
    "thumb"
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
    }
  }
};
var ProjectGallery = {
  "type": "object",
  "required": [
    "id",
    "sticky",
    "name",
    "keyname",
    "description",
    "thumb",
    "updated_at",
    "created_by"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "sticky": {
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
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "created_by": {
      "type": "integer",
      "format": "int64"
    }
  }
};

var GalleryUser = {
  "type": "object",
  "required": [
    "id",
    "firstname",
    "name"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "firstname": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  }
};
var GalleryProject = {
  "type": "object",
  "required": [
    "id",
    "name",
    "slug",
    "body",
    "project_count",
    "projects"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    },
    "slug": {
      "type": "string"
    },
    "body": {
      "type": "string"
    },
    "project_count": {
      "type": "integer",
      "format": "int64"
    },
    "projects": {
      "type": "array",
      "items": ProjectGallery
    }
  }
};

function Test(payload, serverAddress, swaggerUrl) {

  console.log('payload', payload);
  console.log('server', serverAddress);
  this.name = payload.repository.name;
  this.server = supertest.agent(serverAddress.Server);
  this.swaggerUrl = swaggerUrl || undefined;
  this.payload = payload;
  this.serverData = serverAddress;
}

Test.prototype.run = function(swaggerUrl, callback) {
  if (typeof swaggerUrl === 'function') return this.run.call(this, null,
    swaggerUrl)
  var that = this;

  var schemaSource = this.swaggerUrl || swaggerUrl;

  if (!schemaSource) {
    schemaSource = "http://localhost:8700/swagger.json";
  }

  sway.create({
    definition: schemaSource
  }).then(function(api) {
    console.log(api);
    async.parallel([
        function(cb) {
          /*
          var schema = {
            "type": "object",
            "title": "GalleryCollection",
            "required": [
              "galleries"
            ],
            "properties": {
              "galleries": {
                "type": "array",
                "items": Gallery
              }
            }
          };
          */

          that.server.get("/gallery/")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, result) {

              var data = {}
              if (err) data.error = err.messsage
              data.info = result;
              var op = api.getOperation('/gallery', 'get');
              var definition = op.getResponse(200).definitionFullyResolved;

              try {
                data.body = JSON.parse(result.text);

                validator.validate(data.body, definition.schema, function(err,
                  valid) {

                  // delete data.result.text;
                  data.schema = definition.schema;
                  console.log(err, valid);
                  data.validation = {
                    errors: err ? err : [],
                    valid: valid
                  };
                  cb(null, data);
                })
              } catch (err) {
                cb(err, data);
              }
            });
        },
        function(cb) {
/*
          var schema = {
            "type": "object",
            "title": "UserGallery",
            "required": [
              "user",
              "published"
            ],
            "properties": {
              "user": GalleryUser,
              "published": {
                "type": "array",
                "items": ProjectPublished
              }
            }
          };
*/
          that.server.get("/gallery/user/48137")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, result) {

              var data = {}
              if (err) data.error = err.messsage
              console.log(result);
              data.info = result;
              var op = api.getOperation('/gallery', 'get');
              var definition = op.getResponse(200).definitionFullyResolved;
              try {
                data.body = JSON.parse(result.text);

                validator.validate(data.body, definition.schema, function(err,
                  valid) {

                  //delete data.result.text;
                  data.schema = defition.schema;
                  console.log(err, valid);
                  data.validation = {
                    errors: err ? err : [],
                    valid: valid
                  };
                  cb(null, data);
                })
              } catch (err) {
                cb(err, data);
              }
            });
        },
        function(cb) {

          //var schema = GalleryProject;
          that.server.get("/gallery/demo-gallery?max=5&first=1")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, result) {

              var data = {}
              if (err) data.error = err.messsage
              console.log(result);
              data.info = result;
              try {
                data.body = JSON.parse(result.text);

                var op = api.getOperation('/gallery', 'get');
                var definition = op.getResponse(200).definitionFullyResolved;

                validator.validate(data.body, definition.schema, function(err,
                  valid) {

                  //delete data.result.text;
                  data.schema = definition.schema;
                  console.log(err, valid);
                  data.validation = {
                    errors: err ? err : [],
                    valid: valid
                  };
                  cb(null, data);
                })
              } catch (err) {
                cb(err, data);
              }
            });

        }
      ],
      callback
    );
  }).catch(callback);
};

module.exports = Test;
