import { GET_COUNTRIES, 
         GET_COUNTRIES_BY_CONTINENT, 
         ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND,
         GET_COUNTRY_BY_NAME,
         GET_COUNTRY_DETAILS,
         POST_ACTIVITIES, 
         GET_ALL_ACTIVITIES,
         ORDER_COUNTRIES_BY_MAJOR_OR_MINOR,
         FILTER_BY_ACTIVITIES} from "../actions";

const initialState = {
    countries : [],
    allCountries : [],
    activities: [],
    orderCountries: [],
    countryDetails: {}
}
export const ascen = "ascen"
export const descend = "descend"
export const major = "major"
export const minor = "minor"


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
            const countriesFiltered = action.payload === "all" ? allCountries : allCountries.filter( el => el.continents === action.payload)
            return{
            ...state,
            countries: countriesFiltered
        }
        case ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND:
            let name = state.allCountries
            let orderPayload = action.payload === ascen ?
                name.sort( (a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase())return 1
                if(a.name.toLowerCase() < b.name.toLowerCase())return -1
                return 0 
            }):name.sort( (a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase())return -1
                if(a.name.toLowerCase() < b.name.toLowerCase())return 1
                
                return 0
            })
            return{
                ...state,
                countries : orderPayload
        }
        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
            countries: action.payload
        }
        case GET_COUNTRY_DETAILS:
            console.log(action.payload)
            return{
                ...state,
            countryDetails: action.payload
        }
        case POST_ACTIVITIES:
            return{
                ...state
        }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
            activities: action.payload
        }
        case ORDER_COUNTRIES_BY_MAJOR_OR_MINOR: {
            const majorOrMinor = state.countries
            const payloadOrder = action.payload === major ?
            majorOrMinor.sort((a,b) => {
                if(a.population < b.population) return 1
                if(a.population > b.population) return -1
                return 0
            }): majorOrMinor.sort((a,b) => {
                if(a.population < b.population) return -1
                if(a.population > b.population) return 1
                return 0
            })
            return {
                ...state,
                countries: payloadOrder
            }
        }
        case FILTER_BY_ACTIVITIES: 
        const allActivities = state.activities
        const allCountriesActivities = state.allCountries
        const activitiesFiltered = action.payload === "allActivities" ? allCountriesActivities : allActivities.filter( el => el.name === action.payload)
        return {
            ...state,
            countries : activitiesFiltered[0].countries ||  allCountriesActivities
        }

        default:
            return state;
    }
}

export default rootReducer