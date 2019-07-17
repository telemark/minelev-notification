const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const generateEmails = require('./generate-email')
const sendMail = require('./send-mail')
const logger = require('./logger')

module.exports = async data => {
  const userId = data.userId
  const studentUserName = data.studentUserName
  const token = generateSystemJwt({ userId: userId, secret: process.env.JWT_SECRET })
  const url = `${process.env.BUDDY_SERVICE_URL}/students/${studentUserName}/contactteachers`
  logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName])

  axios.defaults.headers.common['Authorization'] = token

  const results = await axios.get(url)
  const payload = Array.isArray(results.data) ? results.data : []
  const teachers = payload.filter(teacher => teacher.username !== userId)

  if (teachers.length > 0) {
    logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'teachers', teachers.length])
    const mails = teachers.map(teacher => generateEmails(Object.assign({ document: data, recipient: teacher })))
    const jobs = mails.map(sendMail)
    try {
      const logs = await Promise.all(jobs)
      logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'success'])
      return { success: true, notifications: logs.length, logs: logs }
    } catch (error) {
      logger('error', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, error])
      throw error
    }
  } else {
    logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'no one to notify'])
    return { succes: true, notifications: 0 }
  }
}
