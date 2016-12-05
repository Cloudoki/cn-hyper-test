#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/deploy-handler.js

const Dredd = require('dredd')

const log = require('../../lib/helpers/log')
const jobs = require('../../lib/helpers/jobs')
const Project = require('../../lib/models').Project
const dreddConfig = require('../../config/dredd-base-config.js')

const CHECK_JOBS_DELAY = 5000

function checkDeployJobs () {
  jobs.get('deploy', (err, job) => {
    log.debug(job || {}, 'Got "deploy" Job Back?')

    if (!job) {
      return setTimeout(checkDeployJobs, CHECK_JOBS_DELAY)
    }

    runTestSuite(job.project, job.environment, () => {
      setTimeout(checkDeployJobs, CHECK_JOBS_DELAY)
    })
  })
}

function runTestSuite (project, environment, callback) {
  Project.getEnvironment(project, environment, function (err, result) {
    if (err) {
      return callback(err)
    }

    if (!result) {
      return callback(new Error('Project / environment not found'))
    }

    let swaggerPath = 'http://localhost:8000/0/api-docs'
    // let swaggerPath = result.environments[0].swagger

    let envConfig = Object.assign({}, dreddConfig)
    envConfig.options.path.push(swaggerPath)
    envConfig.options._.push(swaggerPath)
    envConfig.options.p.push(swaggerPath)

    let dredd = new Dredd(envConfig)

    log.debug({ project, environment }, 'Running tests')

    dredd.run((err, stats) => {
      if (err) {
        log.error({ project, environment, err: err }, 'Error running dredd tests')
        return callback(err);
      }
      log.info({ project, environment, stats: stats }, 'Dredd result stats')

      dredd.tests.forEach((test) => {
        log.info('* ' + test.title + ': ' + test.status)
      })

      callback()
    })
  })
}

checkDeployJobs()
