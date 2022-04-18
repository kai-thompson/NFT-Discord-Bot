const { changeWhitelist } = require("../database/mongoose");
const { isValidAddress } = require("../helpers/isValidAddress");
const { isAdmin, isWhitelisted } = require("../helpers/isRole");

module.exports = {
  name: "changewallet",
  async run(client, message, args) {
    try {
      const newAddress = args[0];
      const userID = message.member.id;

      if (!newAddress) {
        return message.reply("No address provided!");
      }
      // "Whitelisted" role name subject to change
      if (!isWhitelisted(message)) {
        return message.reply("You are not whitelisted!");
      }
      if (!isValidAddress(newAddress)) {
        return message.reply("Invalid ETH address!");
      }

      await changeWhitelist({
        address: newAddress,
        isAdmin: isAdmin(message),
        id: userID,
      });

      message.reply(`You changed your whitelist address to: ${newAddress}.`);
    } catch (e) {
      console.log(e);
      message.reply(e.message);
    }
  },
};
