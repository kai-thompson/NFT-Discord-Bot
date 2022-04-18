const Whitelist = require("../database/Schema/Whitelist");

module.exports.addWhitelist = async ({ id, address, isAdmin }) => {
  if (!isAdmin && (await this.getWhitelistSpot({ id, address })))
    throw new Error("User already whitelisted!");

  const whitelistSpot = new Whitelist({
    id: userID,
    address: address,
  });

  await whitelistSpot.save();
};

module.exports.removeWhitelist = async (inputData) => {
  const whitelistSpot = await Whitelist.findOne(inputData);

  if (!whitelistSpot) throw new Error("User isn't whitelisted!");

  await whitelistSpot.remove();
};

module.exports.changeWhitelist = async ({ address, id, isAdmin }) => {
  const isAddrWhitelisted = await this.getWhitelistSpot({ address });
  const whitelistSpot = await this.getWhitelistSpot({ id });

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
