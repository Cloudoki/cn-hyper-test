#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/deploy-handler.js

const fs = require('fs')
const path = require('path')
const Dredd = require('dredd')
const mustache = require('mustache')

const config = require('../../config.js')
const log = require('../../lib/helpers/log')
const jobs = require('../../lib/helpers/jobs')
const Project = require('../../lib/models').Project
const dreddConfig = require('../../config/dredd-base-config.js')

const CHECK_JOBS_DELAY = 5000

let hookTemplate = fs.readFileSync('./lib/hooks/template.mustache')

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
    if (err || !result) {
      return callback(err || new Error('Project / environment not found'))
    }

    function cleanUp () {
      fs.unlinkSync(envHookFile)
    }

    // Create a concrete Dredd Hook file for this particular project/env
    let envHookFilename = ['hooks_', result.environments[0]._id, '_', Date.now(), '.js'].join('')
    let envHookFile = path.resolve(config.hooks.tmpDir + '/' + envHookFilename)
    let output = mustache.render(hookTemplate.toString(), { environment: JSON.stringify(result.environments[0]) })
    fs.writeFileSync(envHookFile, output)

    let swaggerPath = result.environments[0].swagger

    let envConfig = Object.assign({}, dreddConfig)
    envConfig.options.path.push(swaggerPath)
    envConfig.options._.push(swaggerPath)
    envConfig.options.p.push(swaggerPath)
    envConfig.options.hookfiles = [
      envHookFile
    ]

    // Configure and start a Dredd test runner
    let dredd = new Dredd(envConfig)

    log.debug({ project, environment }, 'Running tests')

    dredd.run((err, stats) => {
      if (err) {
        log.error({ project, environment, err: err }, 'Error running dredd tests')
        cleanUp()
        return callback(err)
      }
      log.info({ project, environment, stats: stats }, 'Dredd result stats')

      dredd.tests.forEach((test) => {
        log.info('* ' + test.title + ': ' + test.status)
      })

      cleanUp()
      callback()
    })
  })
}

checkDeployJobs()
