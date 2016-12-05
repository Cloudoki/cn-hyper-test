const log = require('lib/helpers/log')
const jobs = require('lib/helpers/jobs')

exports = module.exports = {}

exports.push = (job, callback) => {
  jobs.add('push', job)

  jobs.all('push', (err, j) => {
    log.info('Stored new "push" job. These are %s jobs now.', j.length)
  })

  return callback()
}

exports.deploy = (job, callback) => {
  jobs.add('deploy', job)

  jobs.all('deploy', (err, j) => {
    log.info('Stored new "deploy" job. These are %s jobs now.', j.length)
  })

  return callback()
}
