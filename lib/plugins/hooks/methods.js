const log = require('lib/helpers/log')
const jobs = require('lib/helpers/jobs')
const Push = require('lib/models').Push

exports = module.exports = {}

exports.push = (projectId, webhookPayload, callback) => {
  let commits = []

  webhookPayload.commits.forEach((commit) => {
    commits.push({
      hash: commit.id,
      message: commit.message,
      timestamp: new Date(commit.timestamp),
      url: commit.url,
      author: commit.author,
      committer: commit.committer
    })
  })

  let push = {
    projectId: projectId,
    ref: webhookPayload.ref,
    commits: commits,
    pusher: webhookPayload.pusher,
    organization: {
      login: webhookPayload.organization.login,
      id: webhookPayload.organization.id,
      url: webhookPayload.organization.url,
      avatar_url: webhookPayload.organization.avatar_url,
      description: webhookPayload.organization.description
    }
  }

  Push.findOneAndUpdate(
    { projectId: projectId, ref: webhookPayload.ref },
    push,
    { upsert: true },
    function (err) {
      if (err) {
        log.error({ err, projectId, push }, 'Could not save the test run result')
        return callback(err)
      }

      log.debug({ projectId, push }, 'New push web hook saved')

      // Not really used for now
      jobs.add('push', push, (err) => {
        if (err) {
          log.error({ error: err, job: push }, 'Could not store the "push" job')
        }
        return callback(err)
      })
    }
  )
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
