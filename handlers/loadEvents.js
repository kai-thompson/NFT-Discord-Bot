const fs = require("node:fs");

const loadEvents = (client) => {
  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    const eventName = file.split(".")[0];

    client.on(eventName, event.bind(null, client));
  }
};

module.exports = {
  loadEvents,
};
