const { Router } = require('express');
const {Country, Activity} = require('../db')


const loader = async () => {
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
      console.log("Se guardo la info con exito")
    }
}
module.exports = ({
    loader
})