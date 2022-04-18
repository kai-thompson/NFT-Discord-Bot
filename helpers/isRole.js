const { ROLE_WHITELIST, ROLE_ADMIN } = require('../constants')

const isAdmin = (message) => {
  return message.member.roles.cache.find((r) => r.name === ROLE_ADMIN)
}

const isWhitelisted = (message) => {
  return message.member.roles.cache.find((r) => r.name === ROLE_WHITELIST)
}

module.exports = {
  isAdmin,
  isWhitelisted,
}
