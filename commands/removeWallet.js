const { removeWhitelist } = require("../database/mongoose");
const { isValidAddress } = require("../helpers/isValidAddress");
const { ROLE_ADMIN } = require("../constants");

module.exports = {
  name: "removewallet",
  async run(client, message, args) {
    try {
      const input = args[0];
      const isAddress = isValidAddress(input);

      // If argument passed is eth address, query by address, otherwise query by username
      const inputData = isAddress ? { address: input } : { username: input };

      if (!message.member.roles.cache.find((r) => r.name === ROLE_ADMIN)) {
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
