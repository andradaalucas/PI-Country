import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {getCountryDetails} from "../../redux/actions"



function Details(props) {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCountryDetails(props.match.params.id))
  },[dispatch])
    
  const myCountry = useSelector((state) => state.countryDetails)


  
  return (
    <div>
      {
      myCountry ?
      <div >
      <Link to="/home">
        <button className='buttonNav'>Volver</button>
      </Link>
        <h1>{myCountry.name}</h1>
        <img src={myCountry.flags} alt="imagen no disponible" width="275px" height="175px"/>
        <h3>capital: {myCountry.capital}</h3>
        <h3>id: {myCountry.id}</h3>
        <h3>Poblacion: {myCountry.population}</h3>
        <h3>Subregion: {myCountry.subregion}</h3>
        <h3>Area: {myCountry.area}  km2</h3>
        <h3 className="activitiesDetail">Actividades: {myCountry.activities?.map( el =>{
          return(
            <div key={el.id}>
              <p>Nombre: {el.name}</p>
              <p>Temporada: {el.season}</p>
              <p>Dificultad: {el.difficulty}</p>
              <p>Duracion: {el.duration}</p>
            </div>
            )
        })}</h3>
      </div> : <p>loading</p>
      }
    </div>
  )
}

export default Details