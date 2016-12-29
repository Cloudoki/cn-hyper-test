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

let hookTemplate = fs.readFileSync('./lib/hooks/template.mustache')

jobs.process('deploy', (job, done) => {
  log.debug({ job: job.data }, 'Got "deploy" Job Back')
  runTestSuite(job.data.project, job.data.environment, done)
})

function runTestSuite (project, environment, done) {
  let start = Date.now();
  Project.getEnvironment(project, environment, function (err, result) {
    if (err || !result) {
      return done(err || new Error('Project / environment not found'))
    }

    function cleanUp () {
      fs.unlinkSync(envHookFile)
    }

    const env = result.environments[0]

    // Create a concrete Dredd Hook file for this particular project/env
    let envHookFilename = ['hooks_', env._id, '_', Date.now(), '.js'].join('')
    let envHookFile = path.resolve(config.hooks.tmpDir + '/' + envHookFilename)
    let output = mustache.render(hookTemplate.toString(), { environment: JSON.stringify(env) })
    fs.writeFileSync(envHookFile, output)

    let swaggerPath = env.swagger
    let emailRecipients = env.recipients

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
        return done(err)
      }
      log.info({ project, environment, stats: stats }, 'Dredd result stats')

      // DEBUG
      log.debug({ dreddResult: dredd.tests }, 'Dredd Test Result')

      let html = resultBuilder.toHtml({}, dredd.tests)

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
          done()
        })

        dredd.tests.forEach((test) => {
          log.info('* ' + test.title + ': ' + test.status)
        })
      })
    })
  })
}
