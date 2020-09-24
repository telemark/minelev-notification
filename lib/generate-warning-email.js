module.exports = data => {
  const document = data.document
  const recipient = data.recipient
  const mailText = `Hei!<br/><br/>${document.userName} har sendt varsel til en av dine elever i MinElev.<br />
  Mer informasjon om varselet finner du <a href="${process.env.MINELEV_URL}/logs?documentId=${document._id}">på denne siden</a>.`

  const mail = {
    to: [recipient.email],
    from: 'MinElev <minelev@vtfk.no>',
    subject: 'Varsel sendt til en av dine elever',
    html: mailText
  }

  if (process.env.MAIL_TEMPLATE_NAME) {
    mail.template = {
      templateName: process.env.MAIL_TEMPLATE_NAME,
      templateData: {
        body: mail.html,
        signature: {
          name: 'MinElev',
          company: 'Opplæring og folkehelse'
        }
      }
    }
  }

  return mail
}
