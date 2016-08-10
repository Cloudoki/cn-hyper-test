const sway = require('sway');
const cuid = require('cuid');

const mapResponse = response => {
  const {
    definition,
    statusCode
  } = response;

  return ({
    statusCode,
    definition,
    validate: response.validateResponse.bind(response)
  });
};

const mapParameter = ({
  schema,
  definition
}) => ({
  schema,
  definition
});

const mapOperation = op => {
  const { method } = op;
  return ({
    method,
    security: op.getSecurity(),
    responses: op.getResponses().map(mapResponse),
    parameters: op.getParameters().map(mapParameter)
  });
};

const mapPath = p => {
  const { path } = p;
  const operations = p.getOperations().map(mapOperation);

  return ({
    path,
    operations
  });
};

function swayer(opts, config, callback) {
  const swayed = sway.create(opts).then(swagger => {
    const {
      documentationUrl,
      options,
      references,
      version
    } = swagger;
    const { host, basePath, schemes, info } = swagger.definition;

    const validation = swagger.validate();

    const invalid = {};

    validation.errors
      .filter(({ path }) => path[0] === 'paths' && path.length > 1)
      .map(({ path }) => path.slice(1))
      .forEach(path => {
        switch (path.length) {
          case 1:
          case 2:
            invalid[path.join('~')] = true;
            break;
          default:
            if (path[2] === 'parameters') {
              invalid[path.slice(0, 3).join('~')] = true;
            } else if (path[2] === 'responses') {
              invalid[path.slice(0, 4).join('~')] = true;
            } else {
              invalid[path[0]] = true;
            }
        }
      });

    const referenceErrors = Object.keys(references).map(k => {
      references[k].reference = k;
      return references[k];
    });

    const tests = swagger.getPaths()
      .map(mapPath)
      .reduce((testsList, { path, operations }) => {

        if (invalid[path]) {
          return testsList;
        }

        const opsList = operations.reduce((ops, {
          method,
          parameters,
          responses,
          security
        }) => {

          if (invalid[[path, method].join('~')]) {
            return ops;
          }

          // TODO: deal with other methods and operations with parameters
          if (method === 'GET') return ops;
          if (parameters.length) return ops;
          if (!responses.length) return ops;

          return ops.concat(responses.filter(({
              statusCode
            }) =>
            (statusCode === '200' || statusCode === '201')
          ).filter(({ statusCode }) => !invalid[
            [path, method, 'responses', statusCode].join('~')
          ]).map(({ statusCode, definition, validate }) =>
            ({
              id: cuid(),
              path,
              security,
              method,
              parameters,
              definition,
              statusCode,
              validate,
              host,
              basePath,
              schemes
            })));
        }, []);
        return testsList.concat(opsList);
      }, []);

    return ({
      documentationUrl,
      options,
      version,
      host,
      basePath,
      schemes,
      info,
      tests,
      referenceErrors,
      validation
    });
  });

  if (typeof callback === 'function') {
    swayed.then(data => callback(null, data)).catch(callback);
  }

  return swayed;
}

swayer.fromUrl = function(definition, config, callback) {
  return swayer({
    definition
  }, config, callback);
};

module.exports = swayer;
