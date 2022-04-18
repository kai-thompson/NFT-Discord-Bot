const mongoose = require('mongoose')
const { MONGODB_URL } = require('../constants')

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URL)
  } catch (e) {
    console.log('MongoDB Error:', e)
  }
}

module.exports = { connectMongo }
