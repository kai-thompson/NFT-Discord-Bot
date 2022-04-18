module.exports = {
  name: 'lottery',
  run (client, message, args) {
    try {
      const lotteryOdds = client.config.lotteryOdds
      const whitelistRole = client.config.whitelistRole
      const username = message.member.user.tag
      const isWinner = Math.floor(Math.random() * lotteryOdds) === 0

      if (isWinner) {
        message.member.roles.add(
          message.guild.roles.cache.find((r) => r.name === whitelistRole)
        )

        message.reply(`Congrats ${username}, you are now ${whitelistRole}!`)
      } else {
        message.reply('Not a winner...')
      }
    } catch (e) {
      console.error(e)
      message.channel.send(e.message)
    }
  }
}
