const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Whitelist',
  new mongoose.Schema({
    id: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String },
    whiteListedAt: { type: Number, default: Date.now() },
  })
)
