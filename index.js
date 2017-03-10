'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { send } = require('micro')

module.exports = async (request, response) => {
  const query = await resolveRequest(request)

  if (!query.isValid && query.domain !== 'frontpage') {
    send(response, 401, query)
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
