module.exports = data => {
  const document = data.document
  const recipient = data.recipient
  const mailText = `${document.userName} har sendt varsel til en av dine elever. 
  Mer informasjon om varselet finner du i MinElev ved å følge denne lenken ${process.env.MINELEV_URL}/logs?documentId=${document._id}`

  return {
    to: recipient.email,
    from: 'minelev@vtfk.no',
    replyTo: 'minelev@vtfk.no',
    subject: 'MinElev - varsel sendt til en av dine elever',
    text: mailText
  }
}
