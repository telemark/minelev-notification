const handleYff = require('../lib/handle-yff')
const logger = require('../lib/logger')

async function checkNotification (request, response) {
  logger('info', ['checkNotification', 'yff', 'start'])
  try {
    const result = await handleYff(request.body)
    logger('info', ['checkNotification', 'yff', 'success'])
    response.json(result)
  } catch (error) {
    logger('error', ['checkNotification', 'yff', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(checkNotification)
