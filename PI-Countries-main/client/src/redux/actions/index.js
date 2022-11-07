import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_CONTINENT = "GET_COUNTRIES_BY_CONTINENT";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND = "ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND"
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS"



export function getCountries(){
    const urlCountries = "http://localhost:3001/countries"
    return async function(dispatch){
        try{
            const jsonCountries = await axios.get(urlCountries)
            return dispatch(
                {
                type : GET_COUNTRIES,
                payload: jsonCountries.data
            }
            )
        }
        catch(e){
            console.log("Este es el error de getCountries" + e)
        }
    }
}
export function getCountriesByContintent(payload){
    return {
        type: GET_COUNTRIES_BY_CONTINENT, 
        payload
    }
}
export function orderCountriesByAscendOrDescend(payload){
    return {
        type: ORDER_COUNTRIES_BY_ASCEND_OR_DESCEND,
        payload
    }
}
export function getCountriesByName(name){
    const urlCountry = `http://localhost:3001/countries?name=${name}`
    return  async function (dispatch){
       try{
        const jsonCountry = await axios.get(urlCountry)
        return dispatch({
            type: GET_COUNTRY_BY_NAME,
            payload: jsonCountry.data
        })
       }
       catch(e){
        console.log("Este es el error de getCountries" + e)
       }
    }
}
export function getCountryDetails(id){
    const urlCountryId = `http://localhost:3001/countries/${id}`
    return async function (dispatch){
        try{
            const jsonCountryDetails = await axios.get(urlCountryId)
            return dispatch({
                type: GET_COUNTRY_DETAILS,
                payload: jsonCountryDetails.data
            })
        }
        catch(e){
        console.log("Este es el error de getCountries" + e)
        }
    }
}