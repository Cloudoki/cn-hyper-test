const mongoose = require('lib/helpers/db').mongoose

const schemas = {
  Project: require('./projects'),
  Run: require('./runs')
}

let models = {}

for (var key in schemas) {
  var schema = schemas[key]
  models[key] = mongoose.model(key, schema)
}

// Exports:
// {
//   Project: <projects mongoose model>,
//   Run: <runs mongoose model>,
//   ...
// }
exports = module.exports = models