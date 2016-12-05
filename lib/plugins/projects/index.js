const handlers = require('./handlers')

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/project',
      config: handlers.create
    },
    {
      method: 'GET',
      path: '/project/{id}',
      config: handlers.get
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'ht-projects'
}
