const { isWhiteListed } = require("../database/mongoose");
const {isValidAddress} = require("../helpers/isValidAddress")

module.exports = {
  name: "whitelist",
  async run(client, message, args) {
    try {
      const input = args[0];
      const isAddress = isValidAddress(input);
      const username = message.member.user.tag;
      const adminRole = client.config.adminRole;

      // If user is an Admin and passes data, check if data is whitelisted
      if (
        input &&
        message.member.roles.cache.find((r) => r.name === adminRole)
      ) {
        const inputData = isAddress
          ? { ethAddress: input }
          : { username: input };

        if (await isWhiteListed(inputData)) {
          return message.reply(`${input} is whitelisted.`);
        } else {
          return message.reply(`${input} isn't whitelisted.`);
        }
      }

      // If user isn't an admin, return users status
      if (await isWhiteListed({ username })) {
        return message.reply("You're whitelisted!");
      } else {
        return message.reply("You're not whitelisted...");
      }
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
