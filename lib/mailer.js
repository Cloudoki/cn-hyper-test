"use strict"

const sendgrid = require("sendgrid")(process.env.HYPER_SENDGRID_APIKEY);

const handlebars = require('handlebars');

const source = require('fs').readFileSync(require('path').join(__dirname, '../views/mail.text.hbs'), 'utf8');

const template = handlebars.compile(source);


exports.send = function(to, subject, body, callback){

  var tos;

  if( to == null )
    to = ["ricardo@cloudoki.com"];

  tos = to instanceof Array ? to : [to];

  if( subject == null )
    subject = "Test poll result "+ new Date();

  if( body )
    body = template(body) + '\n\n\nRAW:\n' + JSON.stringify(body);

  var payload = {
    to: tos,
    from: "noreply@cloudoki.com",
    subject: subject,
    text: body
  };

  sendgrid.send(payload, function(err, result){
    if( err )
      console.error(err);

    return callback(err, {
	mailResult: result,
    body: body
});
  });

};
