const handlers = require('./handlers')

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/hooks/push/{projectId}',
      config: handlers.push
    },
    {
      method: 'POST',
      path: '/hooks/deploy/{projectId}',
      config: handlers.deploy
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'ht-hooks'
}
