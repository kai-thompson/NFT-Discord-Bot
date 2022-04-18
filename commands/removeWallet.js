const { removeWhitelist } = require('../database/mongoose')
const { isValidAddress } = require('../helpers/isValidAddress')

module.exports = {
  name: 'removewallet',
  async run(client, message, args) {
    try {
      const adminRole = client.config.adminRole
      const input = args[0]
      const isAddress = isValidAddress(input)

      // If argument passed is eth address, query by address, otherwise query by user id
      const inputData = isAddress ? { address: input } : { id: input }

      if (!message.member.roles.cache.find((r) => r.name === adminRole)) {
        return message.reply('Command reserved for admins!')
      }

      await removeWhitelist(inputData)

      message.reply(`${input} removed from whitelist.`)
    } catch (e) {
      console.error(e)
      message.reply(e.message)
    }
  }
}
