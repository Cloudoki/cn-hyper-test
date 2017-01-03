#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/push-handler.js

const log = require('../../lib/helpers/log')

log.fatal('##### Starting Hyper Test Push Webhook Handler #####')

const jobs = require('../../lib/helpers/jobs')
const db = require('../../lib/helpers/db')

db.connect((err, db) => {
  if (err) {
    log.fatal({ err: err }, 'Could not connect to the database. Exiting.')
    process.exit()
  }

  jobs.process('push', (job, done) => {
    log.warn({ job: job.data }, 'Got "push" Job Back but nothing to handle')
    // TODO handle the job if there's even anything to do
    done()
  })
})
