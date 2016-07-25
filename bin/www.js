'use strict';

const hypert = require('../app');
const conf = require('../conf/app');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const handlebars = require('handlebars');
app.use(bodyParser.json());

app.post('/promise', function(req, res) {
  // process git new pushes only
  if (req.headers && req.headers['x-github-event'] && req.headers[
      'x-github-event'] === 'push') {
    hypert.addTest(req.body, function(err) {
      if (err) return res.json({ ok: false, error: err });

      return res.json({ ok: true });
    });
  } else {
    return res.json({ ok: false });
  }
});

app.get('/test', function(req, res) {
  hypert.addTest(require('../static/payload'), function(err) {
    if (err) return res.json({ ok: false, error: err });

    return res.json({ ok: true });
  });
});

app.post('/run', function(req, res) {
  if (req.body.component) {
    hypert.runTest(req.body.component, req.body.swagger, function(err) {
      if (err) return res.json({ ok: false, error: err.message });
      return res.json({ ok: true });
    });
  } else {
    res.json({ ok: false });
  }
});

app.get('/ping', function(req, res) {
  return res.json({ ok: true });
});


app.get('/render', function(req, res) {
  const source = require('fs').readFileSync(require('path').join(__dirname,
    '../views/mail.hbs'), 'utf8');
  const template = handlebars.compile(source);
  const context = require('../views/context_example.json');
  res.end(template(context));
});

app.use('/', express.static('static'));

app.listen(conf.web.port, function() {
  console.log('Hyper test listening on port', conf.web.port);
});
