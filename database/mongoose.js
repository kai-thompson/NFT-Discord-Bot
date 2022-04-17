const Whitelist = require("../database/Schema/Whitelist");

module.exports.addWhitelist = async ({
  userID,
  username,
  ethAddress,
  isAdmin,
}) => {
  if (!isAdmin && (await this.isWhiteListed({ userID, username, ethAddress })))
    throw new Error("User already whitelisted!");

  const whitelistSpot = new Whitelist({
    id: userID,
    username: username,
    address: ethAddress,
  });

  await whitelistSpot.save();
};

module.exports.removeWhitelist = async (inputData) => {
  const whitelistSpot = await Whitelist.findOne(inputData);

  if (!whitelistSpot) throw new Error("User isn't whitelisted!");

  await whitelistSpot.remove();
};

module.exports.isWhiteListed = async ({ userID, username, ethAddress }) => {
  const whitelistSpot = await Whitelist.find({
    $or: [{ userID }, { username }, { address: ethAddress }],
  });

  return whitelistSpot.length > 0;
};

module.exports.listAllWhitelist = async () => {
  return await Whitelist.find({}, { address: 1, _id: 0 });
};
