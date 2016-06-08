module.exports = {
  Id: "moovly",
  Name: "Moovly",
  Component: "Moovly",
  Version: "Production",
  Server: "https://api.moovly.com",
  Repos: [
    "https://github.com/Moovly/moovly-api",
    "https://github.com/Moovly/moovly-worker"
  ],
  "Branchs" : [
    "master"
  ],
  Recipients:[
    "ricardo@cloudoki.com",
    "edgar@cloudoki.com",
    "catia@cloudoki.com",
    "nuno@cloudoki.com"
//    "koen@cloudoki.com",
//    "development@moovly.com"
  ],
  Poll:[
    __dirname+"/test.js"
  ]
}
