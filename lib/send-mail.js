const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('./generate-system-jwt')

module.exports = async email => {
  const token = `Bearer ${generateSystemJwt({ secret: config.MAIL_SERVICE_SECRET })}`

  axios.defaults.headers.common['Authorization'] = token

  const { data } = await axios.post(config.MAIL_SERVICE_URL, email)
  return data
}
