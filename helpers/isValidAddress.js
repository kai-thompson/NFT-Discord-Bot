const Web3 = require("web3");

const isValidAddress = (address) => {
  return Web3.utils.isAddress(address);
};

module.exports = { isValidAddress };
