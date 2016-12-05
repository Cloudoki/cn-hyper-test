const joi = require('joi')
const methods = require('./methods')

exports = module.exports = {}

exports.push = {
  // auth: 'session',
  validate: {
    // payload: {
    //   url: joi.string().min(3).max(256)
    // }
    query: {
      project: joi.string().required(),
      branch: joi.string().required()
    }
  },
  handler: (request, reply) => {
    let job = {
      project: request.query.project,
      branch: request.query.branch
    }

    methods.push(job, () => {})

    reply()
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
