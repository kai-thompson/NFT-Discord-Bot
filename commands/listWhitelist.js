const { listAllWhitelist } = require("../database/mongoose");

module.exports = {
  name: "listwhitelist",
  async run(client, message, args) {
    try {
      const adminRole = client.config.adminRole;

      if (!message.member.roles.cache.find((r) => r.name === adminRole)) {
        return message.reply("Command reserved for admins!");
      }

      const response = await listAllWhitelist();

      const whitelist = response.map((wl) => wl.address);

      message.reply(whitelist.toString());
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
