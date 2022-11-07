import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {getCountryDetails} from "../../redux/actions"



function Details(props) {
  console.log(props)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCountryDetails(props.match.params.id))
  },[dispatch])
  
  const myCountry = useSelector((state) => state.countryDetails)

  return (
    <div>
      {
      myCountry?
      <div >
      <Link to="/home">
        <button>Volver</button>
      </Link>
        <h1>{myCountry.name}</h1>
        <img src={myCountry.flags} alt="imagen no disponible" width="275px" height="175px"/>
        <h2>capital: {myCountry.capital}</h2>
        <p>id: {myCountry.id}</p>
        <h3>Poblacion: {myCountry.population}</h3>
        <h3>Subregion: {myCountry.subregion}</h3>
        <h3>Area: {myCountry.area}</h3>
        <h3>Actividades: {myCountry.activities?.map( el =>{
          return(
            <div key={el.id}>
              <p>{el.name}</p>
              <p>{el.season}</p>
            </div>
            )
        })}</h3>
      </div> : <p>loading</p>
      }
    </div>
  )
}

export default Details