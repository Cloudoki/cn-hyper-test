'use strict';

const hyperTest = require('../app');
const conf = require('../conf/app');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const handlebars = require('handlebars');
app.use(bodyParser.json());

app.post('/promise', function(req, res) {
  // process git new pushes only
  if (req.headers && req.headers['x-github-event'] &&
    req.headers['x-github-event'] === 'push') {
    hyperTest.addTest(req.body, function(err) {
      if (err) return res.json({ ok: false, error: err });

      return res.json({ ok: true });
    });
  } else {
    return res.json({ ok: false });
  }
});

app.get('/test', function(req, res) {
  hyperTest.addTest(require('../static/payload'), function(err) {
    if (err) return res.json({ ok: false, error: err });

    return res.json({ ok: true });
  });
});

app.post('/run', function(req, res) {
  if (req.body.component) {
    res.json({
      ok: true
    });
    setImmediate(() => {
      hyperTest.runTest(req.body.component,
        function(err, data) {
          if (err) {
            console.error('Run test error:', err);
          } else {
            console.log('Run test completed');
          }

          if (process.env.NODE_ENV !== 'production') {
            fs.writeFile('./output.json',
              JSON.stringify(data, null, 2), 'utf8',
              err => {
                if (err) console.error('Saving output error:', err);
              });
          }
        });
    });
  } else {
    res.status(400);
    res.json({
      ok: false,
      error: 'BAD_REQUEST: missing body property component'
    });
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

hyperTest.init(err => {
  if (err) throw err;
  console.log('Tests loaded');
  app.listen(conf.web.port, function() {
    console.log('Hyper test listening on port', conf.web.port);
  });
});
