var path = require('path')

exports = module.exports = {
  'server': 'http://localhost:8000',
  'options': {
    'dry-run': null,
    'hookfiles': './hooks.js',
    'language': 'nodejs',
    'sandbox': false,
    'server': 'node index.js',
    'server-wait': 3,
    'init': false,
    'custom': {},
    'names': false,
    'only': [],
    'reporter': [],
    'output': [],
    'header': [],
    'sorted': false,
    'user': null,
    'inline-errors': false,
    'details': false,
    'method': [],
    'color': false,
    'level': 'info',
    'timestamp': false,
    'silent': true,
    'path': [
      // project specific
      // Ex: "http://staging.example.com/swagger.json"
    ],
    'hooks-worker-timeout': 5000,
    'hooks-worker-connect-timeout': 1500,
    'hooks-worker-connect-retry': 500,
    'hooks-worker-after-connect-wait': 100,
    'hooks-worker-term-timeout': 5000,
    'hooks-worker-term-retry': 500,
    'hooks-worker-handler-host': 'localhost',
    'hooks-worker-handler-port': 61321,
    'config': './dredd.yml',
    '_': [
      // project specific
      // Ex: "http://staging.example.com/swagger.json"
    ],
    'p': [
      // project specific
      // Ex: "http://staging.example.com/swagger.json"
    ]
  },
  'custom': {
    'cwd': path.resolve('..'),
    'argv': []
  }
}
