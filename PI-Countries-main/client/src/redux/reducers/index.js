import { GET_COUNTRIES, GET_COUNTRIES_BY_CONTINENT, ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND, GET_COUNTRY_BY_NAME, GET_COUNTRY_DETAILS } from "../actions";

const initialState = {
    countries : [],
    allCountries : [],
    activities: [],
    countryDetails: {}
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
    
        case ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND:
            const orderPayloadAsc = action.payload === "ascen" ?
            state.countries.sort(function (a,b) {
                if(a.name > b.name){
                    return 1
                }
                if(a.name < b.name){
                    return -1
                }
                return 0 
            }):
            state.countries.sort(function (a,b) {
                if(a.name > b.name){
                    return -1
                }
                if(a.name < b.name){
                    return 1
                }
            })
            return{
                ...state,
            countries : orderPayloadAsc
        }
        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
            countries: action.payload
        }
        case GET_COUNTRY_DETAILS:
            return{
                ...state,
            countryDetails: action.payload
        }
        default:
            return state;
    }
}

export default rootReducer