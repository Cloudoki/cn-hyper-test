exports = module.exports = {}

const config = require('config')
const log = require('lib/helpers/log')
const mongoose = require('mongoose')

let database

exports.mongoose = mongoose

exports.connect = (callback) => {
  console.log('url: ', config.database.url)
  mongoose.connect(config.database.url, config.database.options, (err, db) => {
    if (err) {
      return callback(err, db)
    }

    database = db

    log.info('Successfully connected to the DB.')

    return callback(err, db)
  })
}

exports.getDb = () => {
  return database
}
