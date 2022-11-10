import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import "./ActivityCreate.css"
import {postActivities, getCountries} from "../../redux/actions"



function ActivityCreate() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])

  const countries = useSelector(state => state.allCountries)
  const [errorForm, setErrorForm] = useState({})
  const [activity, setActivity] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
    nameCountry:[]
  })
function handleChange(e){
  //Seteo activity con una copía de lo que haya anteriormente y modifico el e.target.name (que va a ir variando) por el e.target.value
  setActivity({
    ...activity,
    [e.target.name]: e.target.value
  })
  setErrorForm(validar(activity))
}
function handleCountry(e){
  setActivity({
    ...activity,
    nameCountry:[...new Set([...activity.nameCountry, e.target.value])]
})
}

function handleSubmit(e){
  e.preventDefault()
  dispatch(postActivities(activity))
  alert(`Añadiste la actividad ${activity.name} en ${activity.nameCountry}🤩`)
}

function validar(data){
  let errores ={}
  if(validarName(data.name)) errores.name = "El nombre debe ser mayor a 3 letras";
  if(!data.difficulty || typeof data.difficulty !== "string" ) errores.difficulty = "* El campo dificultad es obligatorio";
  if(!data.season  || typeof data.season !== "string") errores.season = "* El campo temporada es obligatorio"
  if(!data.duration  || typeof data.duration !== "string") errores.duration = "* El campo duracion es obligatorio"
  if(!data.nameCountry.length || data.nameCountry === "seleccionaPais" || data.nameCountry === "") errores.nameCountry = "* El campo Pais es obligatorio"  
  return errores
}
function validarName(name){
  if(name.length < 3) return true
}
  return (
    <div>
      <Link to="/home">
        <button className='buttonNav'>Volver</button>
      </Link>
      <form className='form' onSubmit={handleSubmit}>
        <div className='container'>
          {
            errorForm.name? <p><small>{errorForm.name}</small></p>: false
          }
       
        <label className="label" >Nombre</label>
          <input  className="inputName"required name="name" value={activity.name}onChange={handleChange} type="text" placeholder='Nombre de la actividad'/>
        
          {
            errorForm.name && errorForm.season? <p><small>{errorForm.season}</small></p>: false
          }
        <label className="label" >Temporada</label>
            <select  required value={activity.season} onChange={handleChange} name="season" className="select">
              <option value="">Elige una temporada</option>
              <option value="winter">Invierno 🥶</option>
              <option value="spring">Primavera 🌷</option>
              <option value="summer">Verano 🥵</option>
              <option value="autumm">Otoño 🍂</option>
            </select>
            {
           errorForm.season && errorForm.duration? <p><small>{errorForm.duration}</small></p>: false
          }
       <label className="label">Duracion</label>
          <input className="selectTime" value={activity.duration} onChange={handleChange}type="time" name="duration" />
          {
            errorForm.season && errorForm.difficulty? <p><small>{errorForm.difficulty}</small></p>: false
          }    
      <label className="label">Dificultad</label>
            <select required value={activity.difficulty} onChange={handleChange} name="difficulty" className="select">
              <option value="">Elige una dificultad</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          {
            errorForm.nameCountry? <p><small>{errorForm.nameCountry}</small></p>: false
          }
      <label className="label">Pais</label>
            <select required className="select" name="nameCountry" onChange={handleCountry}>
                        <option value="seleccionaPais">Selecciona un pais</option>
                        {countries.map(el => {
                              return <option key={el.id} value={el.name}>{el.name}</option>
                         })} 
            </select>
      <button className="btnCreate"type='submit' >Crear Actividad</button>
        </div>
      </form>
    </div>
  )
}

export default ActivityCreate