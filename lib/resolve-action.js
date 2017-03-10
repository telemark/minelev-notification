'use strict'

module.exports = data => {
  const list = data.pathname.split('/').filter(line => line !== '')
  let result = {
    domain: 'frontpage',
    method: data.method,
    action: ''
  }

  if (list.includes('warnings')) {
    result.domain = 'warnings'
    if (data.method === 'POST') {
      result.action = 'notifyContactTeachers'
    }
  }

  return result
}
