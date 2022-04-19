const { getWhitelistSpot } = require('../database/mongoose')
const { isAdmin, isWhitelisted } = require('../helpers/isRole')
const { isValidAddress } = require('../helpers/isValidAddress')

module.exports = {
  name: 'checkWallet',
  async run(client, message, args) {
    try {
      const input = args[0]
      const isAddress = isValidAddress(input)
      const userID = message.member.id

      // If user is an Admin and passes data, check if data is whitelisted
      if (input && isAdmin(message)) {
        const inputData = isAddress ? { address: input } : { id: input }

        if (await getWhitelistSpot(inputData)) {
          return message.reply(`${input} is whitelisted.`)
        } else {
          return message.reply(`${input} isn't whitelisted.`)
        }
      }

      const wl = await getWhitelistSpot({ id: userID })

      // If user isn't an admin, return users status
      if (wl?.address) {
        return message.reply(`You're whitelisted with address: ${wl.address}!`)
      } else {
        return message.reply("You're not whitelisted...")
      }
    } catch (e) {
      console.error(e)
      message.reply(e.message)
    }
  }
}
