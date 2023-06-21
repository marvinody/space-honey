const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
]

const ALLOWED_DECODERS = ALLOWED_IMAGE_TYPES.map(s => s.substring('image/'.length))

const MAX_FILE_SIZE_IN_MB = 5;

const MINIMUM_WIDTH = 960;
const MINIMUM_HEIGHT = 540;

const CRON_TIMES = {
  EVERY_30_SECONDS: '*/30 * * * * *',
  EVERY_HOUR: '0 0 * * * *',
  EVERY_6_HOURS: '0 0 */6 * * *',
  EVERY_DAY: '0 0 0 * * *'
}

const SETTINGS = {
  CRON_TIME: 'cron-time',
  DM_PREF: 'dm-pref',
}


// this is used for the initial token exchange in /information. It's hardcoded into his page so safe to put here
const ERKUL_INITIAL_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU1MTE0NjF9.AY0nDZUrI0oH4-E61f1R4W-4--d5Dy4OuqqDKgBFMpA';
const ERKUL_ROOT_URL = 'https://api.erkul.games'
const ERKUL_ROOT_ASSET_URL = `https://www.erkul.games/assets/`

const DB_NAME = 'okina.db'

module.exports = {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DECODERS,
  MAX_FILE_SIZE_IN_MB,
  MINIMUM_HEIGHT,
  MINIMUM_WIDTH,
  CRON_TIMES,
  SETTINGS,
  DB_NAME,
  ERKUL_INITIAL_TOKEN,
  ERKUL_ROOT_URL,
  ERKUL_ROOT_ASSET_URL,
}