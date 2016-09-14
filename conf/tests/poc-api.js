module.exports = {
  name: 'POC',
  component: 'POC API',
  version: 'development',
  server: 'http://api.poc.dev',
  swagger: 'http://api.poc.dev/swagger.json',
  repos: [
    'https://github.com/Cloudoki/poc-api'
  ],
  branches: [
    'master'
  ],
  recipients: [
    // 'ricardo@cloudoki.com',
    'catia@cloudoki.com',
    // 'nuno@cloudoki.com',
    // 'koen@cloudoki.com',
    // 'development@moovly.com',
    'edgar@cloudoki.com'
  ],
  tester: {
    attempts: 2,
    concurrency: 3,
    delayAttempt: 50,
    delay: 20
  },
  sway: {},
  hooks: []
};
