const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')

module.exports = async email => {
  const token = `Bearer ${generateSystemJwt({ secret: process.env.MAIL_SERVICE_SECRET })}`

  axios.defaults.headers.common.Authorization = token

  const { data } = await axios.post(process.env.MAIL_SERVICE_URL, email)
  return data
}
