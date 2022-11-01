import axios from "axios"
export const GET_COUNTRIES = "GET_COUNTRIES"
// const urlCountries = "localhost:3001/countries"
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
