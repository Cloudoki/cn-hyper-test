"use strict"

const sendgrid = require("sendgrid")(process.env.HYPER_SENDGRID_APIKEY);

exports.send = function(to, subject, body, callback){

  var tos;

  if( to == null )
    to = ["ricardo@cloudoki.com"];

  tos = to instanceof Array ? to : [to];

  if( subject == null )
    subject = "Test poll result "+ new Date();

  if( body )
    body = "<html><body><p>"+JSON.stringify(body, null, 2)+"</p></body></html>";

  var payload = {
    to: tos,
    from: "noreply@cloudoki.com",
    subject: subject,
    html: body
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
