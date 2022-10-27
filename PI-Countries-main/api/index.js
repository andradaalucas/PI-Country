//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country, Activity } = require('./src/db.js');
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
 
    const allCountries = await Country.findAll({
      include: Activity
    });
  if(!allCountries.length){
    const apiCountriesResponse = await axios.get('https://restcountries.com/v3/all');
    const apiCountries = apiCountriesResponse.data?.map((el) => {
      return {
        id: el.cca3,
        name: el.name.common,
        continents:el.continents[0],
        capital: el.capital? el.capital.join(", "): "no tiene capital",
        flags: el.flags[0],
        subregion: el.subregion? el.subregion : "no tiene subregion",
        area: el.area,
        population: el.population,
      }
    })
    await Country.bulkCreate(apiCountries);
    console.log('Data uploaded successfully')
  }
  const countryconsole = await Country.findAll({include : Activity})
  console.log("countryconsole")
  server.listen(3001, () => {
    console.log('%s listening at 3001')
  });
});
//force : true / false fuerza o no el reinicio de la base de datos creandolos asi de nuevo
