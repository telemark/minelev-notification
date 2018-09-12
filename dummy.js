const { send } = require('micro')
const data = require('./test/data/dummy-teachers.json')

module.exports = async (request, response) => {
  send(response, 200, data)
}
