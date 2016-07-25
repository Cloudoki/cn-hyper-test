module.exports = {
  Id: 'cn-hyper-test',
  Name: 'Cloudoki hyper test',
  Component: 'Hyper test',
  Version: 'Staging',
  Server: 'http://hypertest.cloudoki.com',
  Repos: [
    'https://github.com/Cloudoki/cn-hyper-test'
  ],
  Branchs: [
    'master'
  ],
  Recipients: [
    'ricardo@cloudoki.com',
    'edgar@cloudoki.com',
    'catia@cloudoki.com',
    'nuno@cloudoki.com'
  ],
  Poll: [
    __dirname + '/test_ping.js'
  ]
};
