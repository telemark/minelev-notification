'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('./generate-system-jwt')
const generateEmails = require('./generate-email')
const sendMail = require('./send-mail')

module.exports = query => {
  return new Promise(async (resolve, reject) => {
    if (query.action === 'notifyContactTeachers') {
      const userId = query.data.userId
      const studentUserName = query.data.studentUserName
      const token = generateSystemJwt(userId)
      const url = `${config.BUDDY_SERVICE_URL}/students/${studentUserName}/contactteachers`

      axios.defaults.headers.common['Authorization'] = token

      const results = await axios.get(url)
      const payload = Array.isArray(results.data) ? results.data : []
      const teachers = payload.filter(teacher => teacher.username !== userId)

      if (teachers.length > 0) {
        const mails = teachers.map(teacher => generateEmails(Object.assign({document: query.data, recipient: teacher})))
        const jobs = mails.map(sendMail)

        Promise.all(jobs)
          .then(logs => resolve({success: true, notifications: logs.length, logs: logs}))
          .catch(error => reject(error))
      } else {
        resolve({succes: true, notifications: 0})
      }
    } else {
      resolve(query)
    }
  })
}
