'use strict'

const Hapi = require('hapi')
const path = require('path')

const log = require('lib/helpers/log')
const db = require('lib/helpers/db')
const config = require('config')

log.fatal('##### Starting Hyper Test #####')

// Create the Hapi Server and configure
// the static file server part
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
})

server.connection({ port: config.port })

server.register([
  // Register the hooks handling plugin
  {
    register: require('./lib/plugins/hooks/index.js'),
    routes: { prefix: '/api/v1' }
  },
  // Register the projects handling plugin
  {
    register: require('./lib/plugins/projects/index.js'),
    routes: { prefix: '/api/v1' }
  },
  // Register the static file handling plugin
  {
    register: require('./lib/plugins/static/index.js')
  }
], () => {
  db.connect((err, db) => {
    if (err) {
      log.fatal({ err: err }, 'Could not connect to the database. Exiting.')
      process.exit()
    }

    // Actually start the server (start listening for incoming requests)
    server.start((err) => {
      if (err) {
        throw err
      }
      log.info(`Server running at: ${server.info.uri}`)
    })
  })
})
