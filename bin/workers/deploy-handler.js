#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/deploy-handler.js

const log = require('../../lib/helpers/log')

log.fatal('##### Starting Hyper Test Deploy Webhook Handler #####')

const fs = require('fs')
const path = require('path')
const Dredd = require('dredd')
const mustache = require('mustache')
const async = require('async')

const config = require('../../config.js')
const jobs = require('../../lib/helpers/jobs')
const db = require('../../lib/helpers/db')
const resultBuilder = require('../../lib/helpers/result-builder')
const mailer = require('../../lib/helpers/mailer')
const Project = require('../../lib/models').Project
const Push = require('../../lib/models').Push
const Run = require('../../lib/models').Run
const dreddConfig = require('../../config/dredd-base-config.js')


let hookTemplate = fs.readFileSync('./lib/hooks/template.mustache')

db.connect((err, db) => {
  if (err) {
    log.fatal({ err: err }, 'Could not connect to the database. Exiting.')
    process.exit()
  }

  jobs.process('deploy', (job, done) => {
    log.debug({ job: job.data }, 'Got "deploy" Job Back')
    runTestSuite(job.data.project, job.data.environment, done)
  })
})

function runTestSuite (projectId, environmentId, done) {
  let start = Date.now()

  async.waterfall([
    function (callback) {
      Project.getEnvironment(projectId, environmentId, function (err, project) {
        if (err || !project) {
          return callback(err || new Error('Project / environment not found'))
        }
        return callback(null, project)
      })
    },
    function (project, callback) {
      const environment = project.environments[0]
      Push.getByProjectIdAndBranch(projectId, environment.branch, function (err, push) {
        if (err || !push) {
          return callback(err || new Error(`Latest push for branch ${environment.branch} not found`))
        }
        return callback(null, environment, push)
      })
    },
    performTests
  ], function (err) {
    if (err) {
      log.error(
        { error: err && err.message, project: projectId, environment: environmentId },
        'Error running test suite'
      )
    }
    return done(err)
  })


  function performTests (environment, push, callback) {
    function cleanUp () {
      fs.unlinkSync(envHookFile)
    }

    // Create a concrete Dredd Hook file for this particular project/env
    let envHookFilename = ['hooks_', environment._id, '_', Date.now(), '.js'].join('')
    let envHookFile = path.resolve(config.hooks.tmpDir + '/' + envHookFilename)
    let output = mustache.render(hookTemplate.toString(), { environment: JSON.stringify(environment) })
    fs.writeFileSync(envHookFile, output)

    let swaggerPath = environment.swagger
    let emailRecipients = environment.recipients

    let envConfig = Object.assign({}, dreddConfig)
    // TODO Security Fix! We're just getting the `environment.server` from the DB
    // without checking whether the server endpoint is some local URL, for instance.
    envConfig.server = environment.server
    envConfig.options.path.push(swaggerPath)
    envConfig.options._.push(swaggerPath)
    envConfig.options.p.push(swaggerPath)
    envConfig.options.hookfiles = [
      envHookFile
    ]

    // Configure and start a Dredd test runner
    let dredd = new Dredd(envConfig)

    log.debug({ projectId, environment }, 'Running tests')

    dredd.run((err, stats) => {
      if (err) {
        log.error({ projectId, environment, err: err }, 'Error running dredd tests')
        cleanUp()
        return done(err)
      }
      log.info({ projectId, environment, stats: stats }, 'Dredd result stats')

      // DEBUG
      log.debug({ dreddResult: dredd.tests }, 'Dredd Test Result')

      let html = resultBuilder.toHtml(push, dredd.tests)

      // DEBUG
      // let tmpFile = '/tmp/testresult.html'
      // fs.writeFileSync(tmpFile, html)
      // log.debug('Temporarily written the HTML test report to %s', tmpFile)

      mailer.send(emailRecipients, 'Hyper Test Run Results', html, (err, result) => {
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
          projectId,
          environmentId: environment,
          mail: mailResult
        })

        run.save((err) => {
          if (err) {
            log.error({ err, projectId, environment }, 'Could not save the test run result')
            return callback(err)
          }

          let durantion = ((Date.now() - start) / 1000) + ' s'
          log.debug({ projectId, environment, duration: durantion, success: String(mailResult.success) }, 'Test run fully finished!')

          cleanUp()
          callback()
        })

        dredd.tests.forEach((test) => {
          log.debug('* ' + test.title + ': ' + test.status)
        })

        log.info({ push }, 'ran tests for the following push')
      })
    })
  }
}
