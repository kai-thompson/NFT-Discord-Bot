module.exports = {
  name: 'lottery',
  run(client, message, args) {
    try {
      const { lotteryOdds, whitelistRole, lotteryChannel } =
        client.config.lotteryOdds
      const username = message.member.user.tag
      const isWinner = Math.floor(Math.random() * lotteryOdds) === 0

      if (message.channel.name !== lotteryChannel) return

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
