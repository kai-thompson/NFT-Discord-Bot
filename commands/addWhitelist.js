const { addWhitelist } = require("../database/mongoose");
const { isValidAddress } = require("../helpers/isValidAddress");

module.exports = {
  name: "addwhitelist",
  async run(client, message, args) {
    try {
      const ethAddress = args[0];
      const userID = message.member.id;
      const username = message.member.user.tag;
      const whitelistRole = client.config.whitelistRole;
      const isAdmin = message.member.roles.cache.find(
        (r) => r.name === client.config.adminRole
      );

      if (!ethAddress) {
        return message.reply("No address provided!");
      }
      // "Whitelisted" role name subject to change
      if (!message.member.roles.cache.find((r) => r.name === whitelistRole)) {
        return message.reply("You are not whitelisted!");
      }
      if (!isValidAddress(ethAddress)) {
        return message.reply("Invalid ETH address!");
      }

      await addWhitelist({
        ethAddress,
        userID,
        username,
        isAdmin,
      });

      message.reply(`Congrats! ${ethAddress} added to whitelist!`);
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
