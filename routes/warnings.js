const handleWarnings = require('../lib/handle-warnings')
const logger = require('../lib/logger')

async function checkNotification (request, response) {
  logger('info', ['checkNotification', 'warnings', 'start'])
  try {
    const result = await handleWarnings(request.body)
    logger('info', ['checkNotification', 'warnings', 'success'])
    response.json(result)
  } catch (error) {
    logger('error', ['checkNotification', 'warnings', error])
    response.status(500)
    response.send(error)
  }
}

module.exports = require('../lib/check-token')(checkNotification)
