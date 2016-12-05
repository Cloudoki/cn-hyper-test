exports = module.exports = {
  port: process.env.HT_PORT || 3000,
  database: {
    url: process.env.HT_MONGO_URI || 'mongodb://localhost:27017/hyper_test_dev',
    options: {}
  },
  logger: {
    name: process.env.HT_LOGGER_NAME || 'HT',
    level: process.env.HT_LOGGER_LEVEL || 'debug'
  }
}
