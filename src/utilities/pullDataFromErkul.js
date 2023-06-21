const axios = require('axios');
const { erkulDataPath } = require('../config');
const {writeFile, mkdir} = require('node:fs/promises')
const path = require('path');
const log = require('./logger')

const { ERKUL_ROOT_URL, ERKUL_INITIAL_TOKEN } = require('../constants')

const ErkulInformations = () => {
  return axios.default.get(`${ERKUL_ROOT_URL}/informations`, {
    headers: {
      Authorization: `Bearer ${ERKUL_INITIAL_TOKEN}`,
    }
  })
}

const ErkulWrapper = (accessToken) => {
  const wrapper = new axios.Axios({
    // we're only pulling live data for erkul
    baseURL: `${ERKUL_ROOT_URL}/live`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return wrapper;
}

const things = [
  'coolers',
  'missile-racks',
  'missiles',
  'emps',
  'mining-lasers',
  'bombs',
  'mounts',
  'paints',
  'power-plants',
  'qdrives',
  'qeds',
  'shields',
  'ships',
  'shops',
  'turrets',
  'weapons',
  'utilities',
]


const pullLatestData = async () => {
  log.info(`Creating directory if doesn't exist yet (${erkulDataPath})`);
  await mkdir(erkulDataPath, {recursive: true})
  log.debug(`Directory created or existed`);

  log.info(`Fetching initial Erkul Informations`);
  const { data: informations } = await ErkulInformations();
  log.debug(`Done fetching Erkul Informations`);

  const accessToken = informations[1].sessionToken;

  const erkul = ErkulWrapper(accessToken);

  log.info(`Starting Erkul fetch loop`)
  for (const thing of things) {
    log.info(`Looking up erkul/${thing}`);
    const {data: thingData} = await erkul.get(thing);
    log.debug(`Fetched erkul/${thing}`);

    const filepath = path.join(erkulDataPath, `${thing}.json`);
    
    log.info(`Saving data to ${filepath}`);
    await writeFile(filepath, thingData);
    log.debug(`Finished writing ${thing} to disc`);
  }
}

module.exports = {
  pullLatestData,
}