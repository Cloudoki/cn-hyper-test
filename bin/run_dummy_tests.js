'use strict';

const
  async  = require('async'),
  worker = require('../lib/worker');

const
  baseURL = "https://staging.fanarena.com/v1",
  URIs    = [
    ["/games", {
      pass: [ (res, body) => { return res.statusCode == 200; } ],
      fail: {
        url: (url) => { return url+"?token=fanarena"; },
        body: (body) => { return body; },
        headers: (headers) => { return headers; }
      }
    }],
    ["/users", {
      pass: [ (res, body) => { return res.statusCode == 200; } ],
      fail: {
        url: (url) => { return url+"?token=fanarena"; },
        body: (body) => { return body; },
        headers: (headers) => { return headers; }
      }
    }]
  ];

async.eachSeries(URIs, (uri, next) => {

  return worker.run(baseURL+uri[0], uri[1], 5, next);

}, (err) => {
  console.log("End:", err);
});
