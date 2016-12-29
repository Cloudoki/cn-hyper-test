const kue = require('kue')
const config = require('config')
const log = require('lib/helpers/log')

let redisConfig = config.queue && config.queue.redis || {}

let queue = kue.createQueue({
  redis: {
    port: redisConfig.port || 6379,
    host: redisConfig.host || '127.0.0.1',
    auth: redisConfig.auth || null,
    db: redisConfig.db || null,
    options: redisConfig.options || {}
  }
})

exports = module.exports = {}

exports.add = (type, payload, callback) => {
  callback = callback || function () {}

  queue
    .create(type, payload)
    .removeOnComplete(true)
    .save(function (err) {
      if (err) {
        log.error({ type, payload }, 'Could not create job')
        return callback(new Error('Could not create job'))
      }
      return callback()
    })
}

exports.process = (type, callback) => {
  return queue.process(type, callback)
}

exports.all = (type, callback) => {
  callback(null, [])
}

exports.get = (type, callback) => {
  callback()
}
