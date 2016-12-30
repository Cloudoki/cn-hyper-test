/**
 * The Git Pushes Model
 *
 * Model:
 *
 * {
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 *
 * Methods:
 *
 * - ...
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PushSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  ref: { type: String },
  commits: [ mongoose.Schema({
    hash: { type: String },
    message: { type: String },
    timestamp: { type: Date },
    url: { type: String },
    author: {
      name: { type: String },
      email: { type: String },
      username: { type: String }
    },
    committer: {
      name: { type: String },
      email: { type: String },
      username: { type: String }
    }
  }, { _id: false }) ],
  pusher: {
    name: { type: String },
    email: { type: String }
  },
  organization: {
    login: { type: String },
    id: { type: String },
    url: { type: String },
    avatar_url: { type: String },
    description: { type: String }
  }
}, {
  timestamps: true
})

PushSchema.index({ projectId: 1, ref: 1 }, { unique: true })

PushSchema.statics.getByProjectIdAndBranch = function (projectId, branch, callback) {
  this.findOne(
    {
      projectId: projectId,
      ref: branch
    },
    {},
    callback
  )
}


exports = module.exports = PushSchema
