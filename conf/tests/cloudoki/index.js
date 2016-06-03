module.exports = {
  Id: "MMg0K9jI8yzZG33h99n68EzV70D2UDqU",
  Name: "Cloudoki",
  Component: "Hyper API"
  Version: "Staging"
  Git: {
    Type: "GitHub",
    Key: process.env.HYPER_GIT_APIKEY,
    Repos: []
  }
  Recipients:[
    "ricarod@cloudoki.com",
    "edgar@cloudoki.com"
  ]
  Poll:[
    __dirname+"test_ping.js"
  ]
}
