'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { send } = require('micro')
const resolveRequest = require('./lib/resolve-request')
const handleWarnings = require('./lib/handle-warnings')
const logger = require('./lib/logger')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.isValid && query.domain !== 'frontpage') {
    send(response, 401, query)
  } else {
    if (!query.action === 'frontpage') {
      response.setHeader('Access-Control-Allow-Origin', '*')
    }
    try {
      if (query.domain === 'warnings') {
        const result = await handleWarnings(query)
        send(response, 200, result)
      } else {
        const readme = readFileSync('./README.md', 'utf-8')
        const html = marked(readme)
        send(response, 200, html)
      }
    } catch (error) {
      logger('error', ['index', error])
      send(response, 500, error)
    }
  }
}
