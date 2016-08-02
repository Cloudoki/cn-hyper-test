'use strict';

const supertest = require('supertest');
const async = require('async');
const ZSchema = require('z-schema');
const validator = new ZSchema({
  ignoreUnknownFormats: true,
  noTypeless: true,
  assumeAdditional: true,
  forceProperties: true,
  breakOnFirstError: false
});

const sway = require('sway');

// TODO: serve schema
// fake payload

/*
const date = {
  'type': 'object',
  'required': [
    'date',
    'timezone_type',
    'timezone'
  ],
  'properties': {
    'date': {
      'type': 'string',
      'format': 'date-time'
    },
    'timezone_type': {
      'type': 'integer'
    },
    'timezone': {
      'type': 'string'
    }
  },
  'example': {
    'date': '1970-01-01 00:00:01.000000',
    'timezone_type': 3,
    'timezone': 'UTC'
  }
};
const User = {
  'type': 'object',
  'required': [
    'id',
    'first_name',
    'last_name'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'first_name': {
      'type': 'string'
    },
    'last_name': {
      'type': 'string'
    },
    'email': {
      'type': 'string',
      'format': 'email'
    }
  }
};

const Project = {
  'type': 'object',
  'required': [
    'id',
    'name',
    'keyname',
    'description',
    'thumb',
    'created_at',
    'updated_at',
    'created_by'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'name': {
      'type': 'string'
    },
    'keyname': {
      'type': 'string'
    },
    'description': {
      'type': 'string'
    },
    'thumb': {
      'type': 'string'
    },
    'created_at': date,
    'updated_at': date,
    'created_by': User
  }
};

const GallerySubmission = {
  'type': 'object',
  'required': [
    'id',
    'project',
    'created_at',
    'updated_at',
    'created_by'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'project': Project,
    'created_at': date,
    'updated_at': date,
    'created_by': User
  }
};

const Gallery = {
  'type': 'object',
  'required': [
    'id',
    'name',
    'slug',
    'body',
    'created_at',
    'updated_at',
    'project_count'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'name': {
      'type': 'string'
    },
    'slug': {
      'type': 'string'
    },
    'body': {
      'type': 'string'
    },
    'created_at': {
      'type': 'string',
      'format': 'date-time'
    },
    'updated_at': {
      'type': 'string',
      'format': 'date-time'
    },
    'project_count': {
      'type': 'integer',
      'format': 'int64'
    }
  }
};
const ProjectPublished = {
  'type': 'object',
  'required': [
    'id',
    'name',
    'keyname',
    'description',
    'thumb'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'name': {
      'type': 'string'
    },
    'keyname': {
      'type': 'string'
    },
    'description': {
      'type': 'string'
    },
    'thumb': {
      'type': 'string'
    }
  }
};
const ProjectGallery = {
  'type': 'object',
  'required': [
    'id',
    'sticky',
    'name',
    'keyname',
    'description',
    'thumb',
    'updated_at',
    'created_by'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'sticky': {
      'type': 'integer',
      'format': 'int64'
    },
    'name': {
      'type': 'string'
    },
    'keyname': {
      'type': 'string'
    },
    'description': {
      'type': 'string'
    },
    'thumb': {
      'type': 'string'
    },
    'updated_at': {
      'type': 'string',
      'format': 'date-time'
    },
    'created_by': {
      'type': 'integer',
      'format': 'int64'
    }
  }
};

const GalleryUser = {
  'type': 'object',
  'required': [
    'id',
    'firstname',
    'name'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'firstname': {
      'type': 'string'
    },
    'name': {
      'type': 'string'
    },
    'email': {
      'type': 'string',
      'format': 'email'
    }
  }
};
const GalleryProject = {
  'type': 'object',
  'required': [
    'id',
    'name',
    'slug',
    'body',
    'project_count',
    'projects'
  ],
  'properties': {
    'id': {
      'type': 'integer',
      'format': 'int64'
    },
    'name': {
      'type': 'string'
    },
    'slug': {
      'type': 'string'
    },
    'body': {
      'type': 'string'
    },
    'project_count': {
      'type': 'integer',
      'format': 'int64'
    },
    'projects': {
      'type': 'array',
      'items': ProjectGallery
    }
  }
};
*/
function Test(payload, testModule) {
  this.name = payload.repository.name;
  this.request = supertest.agent(testModule.server);
  this.swaggerUrl = testModule.swagger;
  this.payload = payload;
  this.testModule = testModule;
}

Test.prototype.run = function(callback) {
  const self = this;

  sway.create({
    definition: this.swaggerUrl
  }).then(function(api) {
    async.parallel([
      /*
      function(cb) {
        /*
        const schema = {
          'type': 'object',
          'title': 'GalleryCollection',
          'required': [
            'galleries'
          ],
          'properties': {
            'galleries': {
              'type': 'array',
              'items': Gallery
            }
          }
        };
        */
      /*
        self.request.get('/gallery/')
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, result) {

            const data = {};
            if (err) data.error = err.messsage;
            data.info = result;
            const op = api.getOperation('/gallery', 'get');
            const definition = op.getResponse(200).definitionFullyResolved;

            try {
              data.body = JSON.parse(result.text);

              validator.validate(data.body, definition.schema,
                function(err,
                  valid) {

                  // delete data.result.text;
                  data.schema = definition.schema;
                  console.log(err, valid);
                  data.validation = {
                    errors: err ? err : [],
                    valid: valid
                  };
                  cb(null, data);
                });
            } catch (err) {
              cb(err, data);
            }
          });
      },*/
      /*
      function(cb) {
        /*
          const schema = {
            'type': 'object',
            'title': 'UserGallery',
            'required': [
              'user',
              'published'
            ],
            'properties': {
              'user': GalleryUser,
              'published': {
                'type': 'array',
                'items': ProjectPublished
              }
            }
          };
        */
      /*
        self.request.get('/gallery/user/48137')
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, result) {

            const data = {};
            if (err) data.error = err.messsage;
            data.info = result;
            const op = api.getOperation('/gallery/user/{id}', 'get');
            const definition = op.getResponse(200).definitionFullyResolved;
            try {
              data.body = JSON.parse(result.text);

              validator.validate(data.body, definition.schema,
                function(err,
                  valid) {

                  // delete data.result.text;
                  data.schema = definition.schema;
                  console.log(err, valid);
                  data.validation = {
                    errors: err ? err : [],
                    valid: valid
                  };
                  cb(null, data);
                });
            } catch (err) {
              cb(err, data);
            }
          });
      },*/
      function(cb) {
        //const schema = GalleryProject;
        self.request.get('/gallery/demo-gallery?max=5&first=1')
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, result) {

            const data = {};
            if (err) data.error = err.messsage;
            data.info = result;
            data.operationsByPath = {};
            console.log(api
              .getPath('/user/password/recover')
              .getOperation('POST')
              .getParameter('email')
              .getSample());
            api.getPaths().forEach(p => {
              data.operationsByPath[p.path] = p.getOperations()
                .map(({
                  definition,
                  definitionFullyResolved,
                  method,
                  pathToDefinition,
                  ptr,
                  securityDefinitions
                }) => ({
                  definition,
                  definitionFullyResolved,
                  method,
                  pathToDefinition,
                  ptr,
                  securityDefinitions
                }));
            });

            try {
              data.body = JSON.parse(result.text);
            } catch (err) {
              err.message = 'Parse Error: ' + err.message;
              cb(err, data);
              return;
            }

            delete data.info.text;

            try {
              const op = api.getOperation('/gallery/{slug}', 'GET');
              const definition = op.getResponse(200).definitionFullyResolved;
              data.schema = definition.schema;
            } catch (err) {
              err.message = 'Schema Definition Error: ' + err.message;
              cb(err, data);
              return;
            }

            validator.validate(data.body, data.schema,
              function(err, valid) {
                if (err) console.error('Validation Errors:', err);
                console.log('Validation:', valid);
                data.validation = {
                  errors: err ? err : [],
                  valid: valid
                };
                cb(null, data);
              });
          });

      }
    ], callback);
  }).catch(callback);
};

module.exports = Test;
