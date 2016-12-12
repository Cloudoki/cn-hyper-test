'use strict'

const config = require('config.js')
const sendgrid = require('sendgrid')(config.mailer.apiKey)
const htmlToText = require('html-to-text')

exports.send = function (to, subject, body, callback) {
  to = to || [ 'ricardo@cloudoki.com' ]
  subject = subject || ('Test poll result ' + new Date())

  let tos = to instanceof Array ? to : [to]
  let html
  let text

  if (body) {
    html = body
    text = htmlToText.fromString(html)
  }

  let payload = {
    to: tos,
    from: 'hyper@cloudoki.com',
    subject: subject,
    html: html,
    text: text
  }

  sendgrid.send(payload, function (err, result) {
    if (err) console.error('Mailer Error:', err)

    return callback(err, {
      mailResult: result,
      body: body
    })
  })
}
