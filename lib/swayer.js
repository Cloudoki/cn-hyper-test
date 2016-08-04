const sway = require('sway');

// run on REPL
// require('express')().use('/', require('express').static('static')).listen(8700);
// require('./lib/swayer').fromComponent('moovly-api', (err, data) => err ? console.log(err) : require('fs').writeFileSync('output.json', JSON.stringify(data, null, 2)));

function swayer(config = {}, callback) {
  const data = { config, operationsByPath: {} };

  sway.create({
    definition: config.swagger
  }).then(function(api) {
    api.getPaths().forEach(p => {
      data.operationsByPath[p.path] = p.getOperations()
        .map(op => ({
          method: op.method,
          parameters: op.getParameters()
            .map(({ schema, definition }) =>
              ({ schema, definition })),
          security: op.getSecurity(),
          responses: op.getResponses()
            .map(({ definition, statusCode }) =>
              ({ definition, statusCode }))
        }));
    });
    callback(null, data, api);
  }).catch(callback);
}


swayer.fromComponent = function(component, callback) {
  const config = require(`../conf/tests/${component}`);
  swayer(config, callback);
};

module.exports = swayer;
