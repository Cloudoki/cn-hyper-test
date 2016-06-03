module.exports = {
  Id: "cn-hyper-test",
  Name: "Cloudoki hyper test",
  Component: "Hyper test",
  Version: "Staging",
  Server: "http://hypertest.cloudoki.com",
  Repos: [
    "https://github.com/Cloudoki/cn-hyper-test"
  ],
  Recipients:[
    "ricarod@cloudoki.com",
    "edgar@cloudoki.com"
  ],
  Poll:[
    __dirname+"test_ping.js"
  ]
}
