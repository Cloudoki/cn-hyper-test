module.exports = {
  id: 'cn-hyper-test',
  name: 'Cloudoki hyper test',
  component: 'Hyper test',
  version: 'Staging',
  server: 'http://hypertest.cloudoki.com',
  // swagger: "http://localhost:8700/swagger.json",
  repos: [
    'https://github.com/Cloudoki/cn-hyper-test'
  ],
  branchs: [
    'master'
  ],
  recipients: [
    // 'ricardo@cloudoki.com',
    // 'catia@cloudoki.com',
    // 'nuno@cloudoki.com',
    'edgar@cloudoki.com'
  ],
  poll: [
    __dirname + '/test_ping.js'
  ]
};
