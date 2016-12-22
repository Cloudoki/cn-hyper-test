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
const resultBuilder = require('../../lib/helpers/result-builder')
const mailer = require('../../lib/helpers/mailer')
const Project = require('../../lib/models').Project
const Run = require('../../lib/models').Run
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
  let start = Date.now();
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

      // DEBUG
      log.debug({ dreddResult: dredd.tests }, 'Dredd Test Result')
      let tmpFile = '/tmp/testresult2.html'

      let html = resultBuilder.toHtml({}, dredd.tests)
      fs.writeFileSync(tmpFile, html)
      log.debug('Temporarily written the HTML test report to %s', tmpFile)

      mailer.send('tiago.alves@cloudoki.com', 'Hyper Test - Test', html, (err, result) => {
        let mailResult
        if (err) {
          log.error({ err, result }, 'Could not send result email')
          mailResult = {
            statusCode: 0,
            success: false
          }
        } else {
          mailResult = result
        }

        let run = new Run({
          tests: dredd.tests,
          projectId: project,
          environmentId: environment,
          mail: mailResult
        })

        run.save((err) => {
          if (err) {
            log.error({ err, project, environment }, 'Could not save the test run result')
            return
          }

          let durantion = ((Date.now() - start) / 1000) + ' s'
          log.debug({ project, environment, duration: durantion, success: String(mailResult.success) }, 'Test run fully finished!')

          cleanUp()
          callback()
        })

        dredd.tests.forEach((test) => {
          log.info('* ' + test.title + ': ' + test.status)
        })
      })
    })
  })
}

checkDeployJobs()
