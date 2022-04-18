const fs = require('node:fs')

const loadCommands = (client) => {
  const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'))

  for (const file of commandFiles) {
    const commandName = file.split('.')[0].toLocaleLowerCase()
    const command = require(`../commands/${file}`)
    client.commands.set(commandName, command)
  }
}

module.exports = {
  loadCommands
}
