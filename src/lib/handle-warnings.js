const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('./generate-system-jwt')
const generateEmails = require('./generate-email')
const sendMail = require('./send-mail')
const logger = require('./logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const userId = data.userId
    const studentUserName = data.studentUserName
    const token = generateSystemJwt({ userId: userId, secret: config.JWT_SECRET })
    const url = `${config.BUDDY_SERVICE_URL}/students/${studentUserName}/contactteachers`
    logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName])

    axios.defaults.headers.common['Authorization'] = token

    const results = await axios.get(url)
    const payload = Array.isArray(results.data) ? results.data : []
    const teachers = payload.filter(teacher => teacher.username !== userId)

    if (teachers.length > 0) {
      logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'teachers', teachers.length])
      const mails = teachers.map(teacher => generateEmails(Object.assign({ document: data, recipient: teacher })))
      const jobs = mails.map(sendMail)
      Promise.all(jobs)
        .then(logs => {
          logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'success'])
          resolve({ success: true, notifications: logs.length, logs: logs })
        })
        .catch(error => {
          logger('error', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, error])
          reject(error)
        })
    } else {
      logger('info', ['handle-warnings', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'no one to notify'])
      resolve({ succes: true, notifications: 0 })
    }
  })
}
