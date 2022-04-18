const { Client, Intents, Collection } = require("discord.js");
const { loadCommands } = require("./handlers/loadCommands");
const { loadEvents } = require("./handlers/loadEvents");
const { connectMongo } = require("./handlers/connectMongo");
const { config } = require("./constants");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.config = config;
client.commands = new Collection();

(async () => {
  await connectMongo();

  loadEvents(client);
  loadCommands(client);
})();

client.login(config.token);
