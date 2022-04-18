const { listAllWhitelist } = require('../database/mongoose')
const { isAdmin } = require('../helpers/isRole')

module.exports = {
  name: 'listwhitelist',
  async run(client, message, args) {
    try {
      if (!isAdmin(message)) {
        return message.reply('Command reserved for admins!')
      }

      const response = await listAllWhitelist()

      const whitelist = response.map((wl) => wl.address)

      message.reply(whitelist.toString())
    } catch (e) {
      console.error(e)
      message.reply(e.message)
    }
  },
}
