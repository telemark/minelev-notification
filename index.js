const { json, send } = require('micro')
const handleWarnings = require('./lib/handle-warnings')
const logger = require('./lib/logger')

async function checkNotification (request, response) {
  logger('info', ['checkNotification', 'start'])
  const data = await json(request)
  try {
    const result = await handleWarnings(data)
    logger('info', ['checkNotification', 'success'])
    send(response, 200, result)
  } catch (error) {
    logger('error', ['checkNotification', error])
  }
}

module.exports = require('./lib/check-token')(checkNotification)
