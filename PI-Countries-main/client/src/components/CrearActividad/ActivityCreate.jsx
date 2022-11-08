import React,{useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useSelector} from "react-redux"






function ActivityCreate() {

  const countries = useSelector(state => state.allCountries)
  const [activity, setActivity] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
    nameCountry:""
  })
function handleChange(){
}
function handleChange(){
}
function handleSubmit(){
}
function validar(){
}
  return (
    <div>
      <Link to="/home">
        <button className='buttonNav'>Volver</button>
      </Link>
      <form>
      <label>Nombre</label>
      <input type="text" placeholder='activity name'/>
      <label>Temporada</label>
            <select name="season">
              <option value="">Elige una temporada</option>
              <option value="winter">Invierno</option>
              <option value="spring">Primavera</option>
              <option value="summer">Verano</option>
              <option value="autumm">Otono</option>
            </select>
      <label>Duracion</label>
      <input type="time" />    
      <label>Dificultad</label>
                    <select name="difficulty" >
                         <option value="">Elige una dificultad</option>
                         <option value="1">1</option>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="4">4</option>
                         <option value="5">5</option>
                    </select>
      <label>Pais</label>
                    <select name="nameCountry" value=''>
                         <option value="">Selecciona un pais</option>
                         {countries.map(country => {
                              return <option key={country.id} value={country.id}>{country.name}</option>
                         })}                                               
                    </select>
      <button>Enviar formulario</button>
      </form>
    </div>
  )
}

export default ActivityCreate