import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_CONTINENT = "GET_COUNTRIES_BY_CONTINENT";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
const urlCountries = "http://localhost:3001/countries"



export function getCountries(){
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
export function getCountriesByName(payload){
    console.log(payload)
    return {
        type: GET_COUNTRY_BY_NAME,
        payload
    }
}