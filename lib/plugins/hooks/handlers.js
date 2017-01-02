const joi = require('joi')
const boom = require('boom')
joi.objectId = require('joi-objectid')(joi)
const methods = require('./methods')

exports = module.exports = {}

/**
 * The Git `push` webhook handler.
 *
 * Testing cURL example:
 * `curl -vvv -X POST -H "User-Agent: GitHub-Hookshot/7676889" -H "X-GitHub-Delivery: d38d0d80-cc52-11e6-8bff-30691e2e87fc" -H "X-GitHub-Event: push" -H "Content-Type: application/json" -d "{\"GitHub webhook\":\"payload here\"}" "http://localhost:3000/api/v1/hooks/push/584828f09d5b2b5a974ca913"
 *
 * Note: you can see an actual webhook payload in your project's GitHub settings > Webhooks.
 */
exports.push = {
  validate: {
    // options: {
    //   allowUnknown: true
    // },
    params: {
      projectId: joi.objectId()
    }
    // payload: {
    //   Only allow refs/heads/(...) webhooks (for branches and not tags)
    //   refs: joi.string().regex(/^refs\/heads/)
    // }
  },
  handler: (request, reply) => {
    methods.push(request.params.projectId, request.payload, (err) => {
      if (err) {
        return reply(boom.badImplementation('An internal server error occurred'))
      }
      reply()
    })
  },
  id: 'hooks-push'
}

/**
 * The `deploy` webhook handler.
 *
 * Testing cURL example:
 * `curl -X POST "http://localhost:3000/api/v1/hooks/deploy/584828f09d5b2b5a974ca913?environment=local"`
 */
exports.deploy = {
  validate: {
    params: {
      projectId: joi.objectId()
    },
    query: {
      environment: joi.string().required()
    }
  },
  handler: (request, reply) => {
    let job = {
      project: request.params.projectId,
      environment: request.query.environment
    }

    methods.deploy(job, () => {})
    reply()
  },
  id: 'hooks-deploy'
}
