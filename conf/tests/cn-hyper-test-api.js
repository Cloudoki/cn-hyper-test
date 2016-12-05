module.exports = {
  name: 'Hyper Test',
  component: 'Testing API',
  version: 'development',
  server: 'http://localhost:8000/0/docs/',
  swagger: 'http://localhost:8000/0/api-docs',
  repos: [
    'https://github.com/Cloudoki/cn-hyper-test-api'
  ],
  branches: [
    'master'
  ],
  recipients: [
    'tiago.alves@cloudoki.com'
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
