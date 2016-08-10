const sway = require('sway');

const mapResponse = ({
  definition,
  statusCode
}) => ({
  statusCode,
  definition
});

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

    const paths = swagger.getPaths().map(mapPath);

    const errors = Object.keys(references).map(k => {
      references[k].reference = k;
      return references[k];
    });

    return ({
      documentationUrl,
      options,
      version,
      paths,
      errors
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
