#!/usr/bin/env node

// INSTRUCTIONS:
// Run this in the root folder with the command:
//     NODE_PATH=. node bin/workers/push-handler.js

const log = require('../../lib/helpers/log')
const jobs = require('../../lib/helpers/jobs')

const CHECK_JOBS_DELAY = 5000

function checkPushJobs () {
  jobs.get('push', (err, job) => {
    log.debug(job || {}, 'Got "push" Job Back?')

    setTimeout(checkPushJobs, CHECK_JOBS_DELAY)
  })
}

checkPushJobs()
