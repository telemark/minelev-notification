const generateEmail = require('./generate-yff-email')
const sendMail = require('./send-mail')
const logger = require('./logger')

module.exports = async data => {
  const { userId, studentUserName } = data
  const mail = generateEmail(data)

  try {
    const log = await sendMail(mail)
    logger('info', ['handle-yff', 'action', 'sendmail', 'userId', userId, 'studentUserName', studentUserName, 'success'])
    return { success: true, log }
  } catch (error) {
    logger('error', ['handle-yff', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, error])
    throw error
  }
}
