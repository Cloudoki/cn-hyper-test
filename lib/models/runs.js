/**
 * The Test Run Model
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

const RunSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Person' },
  environmentId: { type: String, index: true },
  tests: Schema.Types.Mixed,
  mail: {
    statusCode: { type: Number, min: 0 },
    success: Boolean
  }
}, {
  timestamps: true
})

exports = module.exports = RunSchema
