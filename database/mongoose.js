const Whitelist = require('../database/Schema/Whitelist')

module.exports.addWhitelist = async ({ id, address, username, isAdmin }) => {
  if (!isAdmin && (await Whitelist.findOne({ id, address }))) { throw new Error('User already whitelisted!') }

  const whitelistSpot = new Whitelist({
    id,
    address,
    username
  })

  await whitelistSpot.save()
}

module.exports.removeWhitelist = async (inputData) => {
  const whitelistSpot = await Whitelist.findOne(inputData)

  if (!whitelistSpot) throw new Error("User isn't whitelisted!")

  await whitelistSpot.remove()
}

module.exports.changeWhitelist = async ({ address, id, isAdmin }) => {
  const isAddrWhitelisted = await Whitelist.findOne({ address })
  const whitelistSpot = await Whitelist.findOne({ id })

  if (isAddrWhitelisted) throw new Error('Address already whitelisted!')
  if (isAdmin && !whitelistSpot) throw new Error("User isn't whitelisted!")

  whitelistSpot.address = address

  await whitelistSpot.save()
}

module.exports.getWhitelistSpot = async ({ id, address }) => {
  const whitelistSpot = await Whitelist.findOne({ $or: [{ id }, { address }] })

  return whitelistSpot
}

module.exports.listAllWhitelist = async () => {
  return await Whitelist.find({}, { address: 1, _id: 0 })
}
