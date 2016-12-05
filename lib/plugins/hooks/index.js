const handlers = require('./handlers')

exports.register = function (server, options, next) {
  server.route([
    // DEBUG purposes only - DELETE ME
    {
      method: 'GET',
      path: '/hooks/tiagotest',
      config: handlers.deploy
    },

    {
      method: 'POST',
      path: '/hooks/push',
      config: handlers.push
    },
    {
      method: 'POST',
      path: '/hooks/deploy',
      config: handlers.deploy
    }
  ])

  next()
}

exports.register.attributes = {
  name: 'ht-hooks'
}
