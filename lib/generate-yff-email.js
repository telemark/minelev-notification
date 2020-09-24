module.exports = data => {
  const mail = {
    to: [...data.recipients],
    from: data.sender || 'MinElev <minelev@vtfk.no>',
    subject: 'Bekreftelse om utplassering av elev',
    html: 'Hei!<br/><br/>Vedlagt oversendes bekreftelse på utplassering av elev i YFF.<br />',
    attachments: [
      {
        content: data.document.data,
        filename: 'Bekreftelse-utplassering.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    ]
  }

  if (process.env.MAIL_TEMPLATE_NAME) {
    mail.template = {
      templateName: process.env.MAIL_TEMPLATE_NAME,
      templateData: {
        body: mail.html,
        signature: {
          name: data.userName,
          company: data.schoolName,
          virksomhet: true
        }
      }
    }
  }

  return mail
}
