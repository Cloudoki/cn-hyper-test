const handlebars = require('handlebars');

const app = require('express')(),
  htmlToText = require('html-to-text');
const helperMomentTimezone = require('../lib/helper-moment-timezone')();
const juice = require('juice');
handlebars.registerHelper('moment', helperMomentTimezone.moment);
handlebars.registerHelper('duration', helperMomentTimezone.duration);
const fs = require('fs')
const path = require('path')
app.get('/render', function(req, res) {
  const source = fs.readFileSync(path.join(__dirname,
    '../views/mail.hbs'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname,
    '../views/mail.css'), 'utf8');
  const template = handlebars.compile(source);
  const context = JSON.parse(fs.readFileSync(path.join(__dirname,
    '../views/context_example.json'), 'utf8'));
  res.end(juice.inlineContent(template(context), css));
});

app.get('/text', function(req, res) {
  const source = fs.readFileSync(path.join(__dirname,
    '../views/mail.hbs'), 'utf8');
  const template = handlebars.compile(source);
  const context = JSON.parse(fs.readFileSync(path.join(__dirname,
    '../views/context_example.json'), 'utf8'));
  const css = fs.readFileSync(path.join(__dirname,
    '../views/mail.css'), 'utf8');
  res.end(htmlToText.fromString(juice.inlineContent(template(context), css)));
});

app.listen(8800, function() {
  console.log('Hyper test listening on port', 8800);
});
