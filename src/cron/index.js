const { CronJob, CronTime } = require('cron')
const { Client, EmbedBuilder } = require("discord.js");
const config = require('../config');
const fs = require('node:fs');
const path = require('path');
const { CRON_TIMES, SETTINGS,  } = require('../constants')

/** 
 * @param {Client} client 
 */
const changeServerBanner = async (client) => {
  return;
}



/**
 * @param {Client} client 
 */
module.exports = async (client) => {

  // const cronjobTime = await getSetting(client.db, SETTINGS.CRON_TIME, config.defaultCronTime)

  // const job = new CronJob(
  //   cronjobTime,
  //   changeServerBanner.bind(null, client),
  // )
  // return job
}