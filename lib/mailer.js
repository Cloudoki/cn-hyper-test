'use strict';

const sendgrid = require("sendgrid")(process.env.HYPER_SENDGRID_APIKEY);

const handlebars = require('handlebars');

const source = require('fs').readFileSync(require('path').join(__dirname,
  '../views/mail.hbs'), 'utf8');

const template = handlebars.compile(source);
const juice = require('juice');
const htmlToText = require('html-to-text');
const css = require('fs').readFileSync(require('path').join(__dirname,
  '../views/mail.css'), 'utf8');
const helperMomentTimezone = require('./helper-moment-timezone')();
// https://github.com/helpers/handlebars-helper-moment
handlebars.registerHelper('moment', helperMomentTimezone.moment);
handlebars.registerHelper('duration', helperMomentTimezone.duration);

exports.send = function(to, subject, body, callback) {

  var tos;

  if (to == null)
    to = ["ricardo@cloudoki.com"];

  tos = to instanceof Array ? to : [to];

  if (subject == null)
    subject = "Test poll result " + new Date();

  if (body) {
    var html = juice.inlineContent(template(body), css);
    var text = htmlToText.fromString(html);
  }

  var payload = {
    to: tos,
    from: "hyper@cloudoki.com",
    subject: subject,
    html: html,
    text: text
  };

  sendgrid.send(payload, function(err, result) {
    if (err)
      console.error(err);

    return callback(err, {
      mailResult: result,
      body: body
    });
  });

};
