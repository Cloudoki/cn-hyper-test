const joi = require('joi')
const boom = require('boom')
joi.objectId = require('joi-objectid')(joi)
const methods = require('./methods')

exports = module.exports = {}

exports.push = {
  // auth: 'session',
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

exports.deploy = {
  // auth: 'session',
  validate: {
    // payload: {
    //   url: joi.string().min(3).max(256)
    // }
    query: {
      project: joi.string().required(),
      environment: joi.string().required()
    }
  },
  handler: (request, reply) => {
    let job = {
      project: request.query.project,
      environment: request.query.environment
    }

    methods.deploy(job, () => {})
    reply()
  }
  //id: 'hooks-deploy'
}
