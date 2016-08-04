const sway = require('sway');

// run on REPL
// require('express')().use('/', require('express').static('static')).listen(8700);
// require('./lib/swayer').fromComponent('moovly-api', (err, data) => err ? console.log(err) : require('fs').writeFileSync('output.json', JSON.stringify(data, null, 2)));

const mapResponse = res => {
  const {
    definition,
    statusCode,
    ptr,
    pathToDefinition
  } = res;
  const sample = res.getSample();
  const example = res.getExample();
  return ({
    statusCode,
    definition,
    sample,
    example,
    ptr,
    pathToDefinition
  });
};

const mapParameter = param => {
  const {
    schema,
    definition,
    pathToDefinition
  } = param;
  const sample = param.getSample();
  const example = param.getExample();
  return ({
    schema,
    definition,
    sample,
    example,
    pathToDefinition
  });
};

const mapOperation = op => {
  const { method, ptr, pathToDefinition } = op;
  return ({
    method,
    ptr,
    pathToDefinition,
    parameters: op.getParameters().map(mapParameter),
    security: op.getSecurity(),
    responses: op.getResponses().map(mapResponse)
  });
};

const mapPath = p => {
  const { definition, path, pathToDefinition, ptr, regexp } = p;

  return ({
    definition,
    path,
    pathToDefinition,
    ptr,
    regexp,
    operations: p.getOperations().map(mapOperation)
  });
};


function swayer(config = {}, callback) {
  const swayed = sway.create({
    definition: config.swagger
  }).then(function(api) {
    const {
      documentationUrl,
      options,
      references,
      version,
      definition,
      definitionFullyResolved,
      definitionRemotesResolved
    } = api;

    return ({
      documentationUrl,
      options,
      references,
      version,
      definition,
      definitionFullyResolved,
      definitionRemotesResolved,
      config,
      paths: api.getPaths().map(mapPath)
    });
  });

  if (typeof callback === 'function') {
    swayed.then(data => callback(null, data)).catch(callback);
  }

  return swayed;
}

swayer.fromComponent = function(component, callback) {
  const config = require(`../conf/tests/${component}`);
  swayer(config, callback);
};

module.exports = swayer;
