const path = require('path');

const { MINIMUM_HEIGHT, MINIMUM_WIDTH, CRON_TIMES } = require('./constants')

module.exports = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID.trim(),
  token: process.env.BOT_TOKEN,
  erkulDataPath: path.join(__dirname, '..', 'erkul_data'),
  defaultCronTime: CRON_TIMES.EVERY_HOUR,
}