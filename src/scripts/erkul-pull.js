const { pullLatestData } = require('../utilities/pullDataFromErkul');


(async() => {
  await pullLatestData();
})();