// Temorary Jobs Storage

let jobs = {}

exports = module.exports = {}

exports.add = (type, payload) => {
  jobs[type] = jobs[type] || []
  jobs[type].push(payload)
}

exports.all = (type, callback) => {
  jobs[type] = jobs[type] || []
  callback(null, jobs[type])
}

exports.get = (type, callback) => {
  jobs[type] = jobs[type] || []
  callback(null, jobs[type].shift())
}
