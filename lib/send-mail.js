'use strict'

const config = require('../config')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const helper = require('sendgrid').mail
    const from = new helper.Email(data.from)
    const to = new helper.Email(data.to)
    const subject = data.subject
    const content = new helper.Content('text/plain', data.text)
    let mail = new helper.Mail(from, subject, to, content)

    mail.setReplyTo(data.replyTo)

    const sg = require('sendgrid')(config.SENDGRID_SECRET)
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })

    sg.API(request, (error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}
