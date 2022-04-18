const { addWhitelist } = require("../database/mongoose");
const { isValidAddress } = require("../helpers/isValidAddress");
const { isAdmin, isWhitelisted } = require("../helpers/isRole");

module.exports = {
  name: "wallet",
  async run(client, message, args) {
    try {
      const address = args[0];
      const userID = message.member.id;
      const username = message.member.user.tag;

      if (!address) {
        return message.reply("No address provided!");
      }
      // "Whitelisted" role name subject to change
      if (!isWhitelisted(message)) {
        return message.reply("You are not whitelisted!");
      }
      if (!isValidAddress(address)) {
        return message.reply("Invalid ETH address!");
      }

      await addWhitelist({
        isAdmin: isAdmin(message),
        address,
        userID,
        username,
      });

      message.reply(`Congrats! ${address} added to whitelist!`);
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
