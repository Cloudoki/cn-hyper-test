'use strict';

const
  async  = require('async'),
  worker = require('../lib/worker');

const
  baseURL = "https://staging.fanarena.com/v1",
  URIs    = ["/games"];

async.each(URIs, (uri, next) => {

  return worker.run(baseURL+uri, next);

}, (err) => {
  console.log("End:", err);
});
