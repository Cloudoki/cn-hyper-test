/**
 * The Project Model
 *
 * Model:
 *
 * {
 *   id: 'cloudoki_example_project',
 *   userId: fk_to_user,
 *   name: 'Cloudoki Example Project',
 *   host: 'github', // one of github, bitbucket
 *   repos: [
 *     'git@github.com:Cloudoki/cn-hyper-test-api.git',
 *     'git@github.com:Cloudoki/cn-hyper-test-blm.git'
 *   ],
 *   environments: [
 *     {
 *       id: 'staging',
 *       branch: 'refs/heads/staging',
 *       server: 'http://staging.example.com',
 *       swagger: 'http://staigng.example.com/swagger.json',
 *       recipients: [
 *         'user1@example.com',
 *         'user2@example.com'
 *       ],
 *       authentication: {
 *         'some_identifier': {
 *           value: 'Bearer SOMEKEYSOMEKEY'
 *         }
 *       },
 *       tester: {
 *         attempts: 2,
 *         concurrency: 3,
 *         delayAttempt: 50,
 *         delay: 20
 *       },
 *     },
 *     {
 *       // ...
 *     }
 *   ]
 * }
 *
 * Methods:
 *
 * - get(projectId)
 * - save()
 * - addEnvironment(projectId, environment)
 * - updateEnvironment(projectId, environment)
 * - getEnvironment(projectId, environmentId)
 * - removeEnvironment(projectId, environmentId)
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  // userId: { type: mongoose.Schema.ObjectId, ref: 'User', index: true },
  name: String,
  host: { type: String, enum: ['github', 'bitbucket', 'gitlab'] },
  repos: [String],
  environments: [ mongoose.Schema({
    id: { type: String, index: true },
    branch: String,
    server: String, // The server's base URL
    swagger: String, // The Swagger Spec URL
    recipients: [ String ], // List of email addresses to send the reports to
    authentication: [{
      id: { type: String },
      value: { type: String }
    }],
    tester: {
      attempts: { type: Number, min: 0 },
      concurrency: { type: Number, min: 0 },
      delayAttempt: { type: Number, min: 0 },
      delay: { type: Number, min: 0 }
    }
  }) ]
}, {
  timestamps: true
})

ProjectSchema.statics.getByProjectIdAndBranch = function (projectId, branch, callback) {
  this.findOne(
    {
      _id: projectId,
      'environments.branch': branch
    },
    callback
  )
}

ProjectSchema.statics.getBranch = function (projectId, branch, callback) {
  this.findOne(
    {
      _id: projectId,
      'environments.branch': branch
    },
    { 'environments.$': 1 },
    callback
  )
}

ProjectSchema.statics.getEnvironment = function (projectId, environment, callback) {
  this.findOne(
    {
      _id: projectId,
      'environments.id': environment
    },
    { 'environments.$': 1 },
    callback
  )
}

exports = module.exports = ProjectSchema
