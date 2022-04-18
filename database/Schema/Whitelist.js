const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Whitelist",
  new mongoose.Schema({
    id: { type: String },
    address: { type: String },
    whiteListedAt: { type: Number, default: Date.now() },
  })
);
