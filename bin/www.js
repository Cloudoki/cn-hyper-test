"use strict"

const hypert = require('../app'),
  conf = require('../conf/app'),
  app = require('express')(),
  bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/promise', function(req, res) {
  // process git new pushes only
  if (req.headers && req.headers['x-github-event'] && req.headers[
      'x-github-event'] === 'push') {
    hypert.addTest(req.body, function(err, result) {
      if (err) return res.json({ ok: false, error: err });

      return res.json({ ok: true });
    });
  } else {
    return res.json({ ok: false, error: err });
  }
});

app.get('/test', function(req, res) {

  hypert.addTest({
    ref: req.query.ref || 'master',
    repository: {
      url: req.query.url || 'https://github.com/Cloudoki/cn-hyper-test',
      name: req.query.name || 'cn-hyper-test'
    }
  }, function(err, result) {

    if (err)
      return res.json({ ok: false, error: err });

    return res.json({ ok: true });
  });
});

app.get('/run', function(req, res) {

  if (req.query.component) {
    hypert.runTest(req.query.component, function(err, result) {
      if (err) return res.json({ ok: false });
      return res.json({ ok: true, result: result });
    })
  } else res.json({ ok: false })

  console.log(req)


})

app.get('/ping', function(req, res) {
  return res.json({ ok: true });
});

const handlebars = require('handlebars');

app.get('/render', function(req, res) {
  const source = require('fs').readFileSync(require('path').join(__dirname, '../views/mail.hbs'), 'utf8');
  const template = handlebars.compile(source);
  const context = require('../views/context_example.json');
  res.end(template(context));
});

app.listen(conf.web.port, function() {
  console.log('Hyper test listening on port', conf.web.port);
});
