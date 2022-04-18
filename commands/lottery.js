const { ROLE_WHITELIST, LOTTERY_ODDS } = require('../constants')

module.exports = {
  name: 'lottery',
  run(client, message, args) {
    try {
      const username = message.member.user.tag
      const isWinner = Math.floor(Math.random() * LOTTERY_ODDS) === 0

      if (isWinner) {
        message.member.roles.add(
          message.guild.roles.cache.find((r) => r.name === ROLE_WHITELIST)
        )

        message.reply(`Congrats ${username}, you are now ${ROLE_WHITELIST}!`)
      } else {
        message.reply('Not a winner...')
      }
    } catch (e) {
      console.error(e)
      message.channel.send(e.message)
    }
  },
}
