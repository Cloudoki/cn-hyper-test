const log = require('lib/helpers/log')
const jobs = require('lib/helpers/jobs')

exports = module.exports = {}

exports.push = (job, callback) => {
  jobs.add('push', job, (err) => {
    if (err) {
      log.error({ error: err, job }, 'Could not store the "push" job')
    } else {
      log.debug({ job }, 'Added a new "push" job')
    }
    return callback(err)
  })
}

exports.deploy = (job, callback) => {
  jobs.add('deploy', job, (err) => {
    if (err) {
      log.error({ error: err, job }, 'Could not store the deploy job')
    } else {
      log.debug({ job }, 'Added a new "deploy" job')
    }
    return callback(err)
  })
}
