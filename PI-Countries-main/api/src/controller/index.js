const { Router } = require('express');
const {Country, Activity} = require('../db')
const axios = require('axios')



const loader = async () => {
    const allCountries = await Country.findAll({
      include: Activity
    });
    if(!allCountries.length){
    
    const apiCountriesResponse = await axios.get('https://restcountries.com/v3/all');
    const apiCountries = apiCountriesResponse.data?.map((el) => {
          return {
          id: el.cca3,
          name: el.translations.spa.common,
          continents:el.continents[0],
          capital: el.capital? el.capital.join(", "): "No tiene capital",
          flags: el.flags[0],
          subregion: el.subregion? el.subregion : "No tiene subregion",
          area: el.area,
          maps: el.maps.googleMaps? el.maps.googleMaps : "No esta en google maps ",
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