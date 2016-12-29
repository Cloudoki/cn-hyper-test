#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/push-handler.js

const log = require('../../lib/helpers/log')
const jobs = require('../../lib/helpers/jobs')

jobs.process('push', (job, done) => {
  log.debug({ job: job.data }, 'Got "push" Job Back')
  // TODO handle the job
  done()
})
