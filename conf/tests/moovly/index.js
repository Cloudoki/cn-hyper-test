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
  Recipients:[
    "ricardo@cloudoki.com",
    "edgar@cloudoki.com",
    "catia@cloudoki.com"
  ],
  Poll:[
    __dirname+"/test.js"
  ]
}
