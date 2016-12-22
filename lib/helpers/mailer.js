'use strict'

const config = require('config.js')
const sendgrid = require('sendgrid')(config.mailer.apiKey)
const sendgridHelper = require('sendgrid').mail
const htmlToText = require('html-to-text')
const log = require('lib/helpers/log')

exports.send = function (to, subject, body, callback) {
  if (!to) {
    return callback(new Error('No "to" email address provided'));
  }
  subject = subject || ('Test poll result ' + new Date())

  let tos = to instanceof Array ? to : [to]
  let html
  let text

  if (body) {
    html = body
    text = htmlToText.fromString(html)
  }

  let helper = require('sendgrid').mail
  let mail = new helper.Mail()

  let personalization = new helper.Personalization()
  tos.forEach(function (to) {
    personalization.addTo(new helper.Email(to))
  })
  personalization.setSubject(subject)

  mail.setFrom(new helper.Email('hyper@cloudoki.com', 'Hyper Test'))
  mail.setReplyTo(new helper.Email('noreply@cloudoki.com'))
  mail.addPersonalization(personalization)
  mail.setSubject(subject)

  mail.addContent(new helper.Content('text/plain', text))
  mail.addContent(new helper.Content('text/html', html))

  log.debug({ to: tos }, 'Sending test results to SendGrid.')

  let request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })

  sendgrid.API(request, (err, response) => {
    if (err) {
      log.error({ err: err }, 'Request to SendGrid was not successful!')
    } else {
      log.debug({ to: tos, responseStatus: response.statusCode }, 'Successfully sent test results to SendGrid.')
    }

    return callback(err, {
      statusCode: response.statusCode,
      success: response.statusCode >= 200 && response.statusCode <= 299
    })
  })
}
