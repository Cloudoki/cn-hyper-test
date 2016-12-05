const joi = require('joi')
const boom = require('boom')
const log = require('lib/helpers/log')

exports = module.exports = {}

exports.create = {
  // auth: 'session',
  // validate: {
  //   payload: {
  //     url: joi.string().min(3).max(256)
  //   }
  // },
  handler: (request, reply) => {
    reply()
  },
  id: 'projects-create'
}

exports.get = {
  // auth: 'session',
  // validate: {
  //   payload: {
  //     url: joi.string().min(3).max(256)
  //   }
  // },
  handler: (request, reply) => {
    reply()
  },
  id: 'projects-get'
}
