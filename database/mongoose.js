const Whitelist = require("../database/Schema/Whitelist");

module.exports.addWhitelist = async ({
  userID,
  username,
  address,
  isAdmin,
}) => {
  if (!isAdmin && (await this.getWhitelistSpot({ userID, username, address })))
    throw new Error("User already whitelisted!");

  const whitelistSpot = new Whitelist({
    id: userID,
    username: username,
    address: address,
  });

  await whitelistSpot.save();
};

module.exports.removeWhitelist = async (inputData) => {
  const whitelistSpot = await Whitelist.findOne(inputData);

  if (!whitelistSpot) throw new Error("User isn't whitelisted!");

  await whitelistSpot.remove();
};

module.exports.changeWhitelist = async ({
  address,
  username,
  userID,
  isAdmin,
}) => {
  const isAddrWhitelisted = await this.getWhitelistSpot({ address });
  const whitelistSpot = await this.getWhitelistSpot({ username, userID });

  if (isAddrWhitelisted) throw new Error("Address already whitelisted!");
  if (isAdmin && !whitelistSpot) throw new Error("User isn't whitelisted!");

  whitelistSpot.address = address;

  await whitelistSpot.save();
};

module.exports.getWhitelistSpot = async (inputData) => {
  const whitelistSpot = await Whitelist.findOne(inputData);

  return whitelistSpot;
};

module.exports.listAllWhitelist = async () => {
  return await Whitelist.find({}, { address: 1, _id: 0 });
};
