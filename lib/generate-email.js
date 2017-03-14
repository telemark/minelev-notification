'use strict'

const config = require('../config')

module.exports = data => {
  const document = data.document
  const teacher = data.teacher
  const mailText = `${document.userName} har sendt varsel til en av dine elever. 
  Mer informasjon om varselet finner du i MinElev ved å følge denne lenken ${config.MINELEV_URL}/logs?documentId=${document._id}`

  const email = {
    to: teacher.mail,
    from: 'minelev@t-fk.no',
    replyTo: 'minelev@t-fk.no',
    subject: 'MinElev - varsel sendt til en av dine elever',
    text: mailText
  }

  return email
}
