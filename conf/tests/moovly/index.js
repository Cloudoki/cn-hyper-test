module.exports = {
  id: 'moovly-api',
  name: 'Moovly',
  component: 'Moovly API',
  version: 'production',
  server: 'https://api.moovly.com',
  repos: [
    'https://github.com/Moovly/moovly-api',
    'https://github.com/Moovly/moovly-worker'
  ],
  branchs: [
    'master'
  ],
  recipients: [
    // 'ricardo@cloudoki.com',
    // 'catia@cloudoki.com',
    // 'nuno@cloudoki.com',
    // 'koen@cloudoki.com',
    // 'development@moovly.com',
    'edgar@cloudoki.com'
  ],
  poll: [
    __dirname + '/test.js'
  ]
};
