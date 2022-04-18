require('dotenv').config()

const TOKEN = process.env.TOKEN
const PREFIX = process.env.PREFIX
const MONGODB_URL = process.env.MONGODB_URL
const ROLE_ADMIN = process.env.ROLE_ADMIN
const ROLE_WHITELIST = process.env.ROLE_WHITELIST
const LOTTERY_ODDS = process.env.LOTTERY_ODDS

const config = {
  token: TOKEN,
  prefix: PREFIX,
  mongoURL: MONGODB_URL,
  adminRole: ROLE_ADMIN,
  whitelistRole: ROLE_WHITELIST,
  lotteryOdds: LOTTERY_ODDS
}

module.exports = {
  TOKEN,
  PREFIX,
  MONGODB_URL,
  ROLE_ADMIN,
  ROLE_WHITELIST,
  LOTTERY_ODDS,
  config
}
