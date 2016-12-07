exports = module.exports = {
  port: process.env.HT_PORT || 3000,
  database: {
    url: process.env.HT_MONGO_URI || 'mongodb://localhost:27017/hyper_test_dev',
    options: {}
  },
  hooks: {
    // The directory MUST be somewhere inside the project root
    // and must NOT be a symlink to a directory outside the project root
    tmpDir: process.env.HT_HOOKS_TEMP_DIR || './tmp/'
  },
  logger: {
    name: process.env.HT_LOGGER_NAME || 'HT',
    level: process.env.HT_LOGGER_LEVEL || 'debug'
  }
}
