module.exports = {
  Id: "cn-hyper-test-api",
  Name: "Cloudoki hyper test api",
  Component: "cn-hyper-test-api",
  Version: "Staging",
  Repos: [],
  Recipients:[
    "ricardo@cloudoki.com",
    "edgar@cloudoki.com"
  ],
  Poll:[
    __dirname+"test_ping.js"
  ]
}
