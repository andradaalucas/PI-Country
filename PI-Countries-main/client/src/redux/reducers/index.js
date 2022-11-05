import { GET_COUNTRIES, GET_COUNTRIES_BY_CONTINENT, GET_COUNTRY_BY_NAME } from "../actions";

const initialState = {
    countries : [],
    allCountries : [],
    continent: [],
    activities: [],
    countryByName: []
}


function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
        return{
            ...state,
            countries: action.payload,
            allCountries : action.payload
        }
        case GET_COUNTRIES_BY_CONTINENT:
            const allCountries = state.allCountries
            console.log(allCountries)
            const countriesFiltered = action.payload === "all" ? allCountries : allCountries.filter( el => el.continents === action.payload)
            return{
            ...state,
            countries: countriesFiltered
        }
        // case GET_COUNTRY_BY_NAME:
        //     const allCountry = state.allCountries
        //     const countryFiltered = allCountry.filter(el => el.name === action.payload)
        //     console.log(action.payload)
        //     return{
        //         ...state,
        //     countries : countryFiltered
        // }
        default:
            return state;
    }
}

export default rootReducer