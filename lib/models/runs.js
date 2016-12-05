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
}, {
  timestamps: true
})

exports = module.exports = RunSchema
