const { removeWhitelist } = require("../database/mongoose");
const { isValidAddress } = require("../helpers/isValidAddress");

module.exports = {
  name: "removewhitelist",
  async run(client, message, args) {
    try {
      const input = args[0];
      const isAddress = isValidAddress(input);
      const adminRole = client.config.adminRole;

      // If argument passed is eth address, query by address, otherwise query by username
      const inputData = isAddress ? { ethAddress: input } : { username: input };

      if (!message.member.roles.cache.find((r) => r.name === adminRole)) {
        return message.reply("Command reserved for admins!");
      }

      await removeWhitelist(inputData);

      message.reply(`${input} removed from whitelist.`);
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
