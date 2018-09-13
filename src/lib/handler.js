const { readFile } = require('fs').promises
const marked = require('marked')
const { json, send } = require('micro')
const handleWarnings = require('./handle-warnings')
const logger = require('./logger')

module.exports.frontpage = async (request, response) => {
  const readme = await readFile('README.md', 'utf-8')
  logger('info', ['handler', 'getFrontPage'])
  send(response, 200, marked(readme))
}

module.exports.warnings = async (request, response) => {
  logger('info', ['handler', 'warnings'])
  const data = await json(request)
  const result = await handleWarnings(data)
  send(response, 200, result)
}
