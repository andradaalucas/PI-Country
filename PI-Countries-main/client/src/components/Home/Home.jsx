import React from "react";
import { Suspense, lazy ,useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries,
  getCountriesByContintent,
  orderCountriesByAscendOrDescend,
  getActivities,
  orderCountriesByMajorOrMinor,
  filterByActivities } from "../../redux/actions";
import {Link} from "react-router-dom"
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"
import {ascen, descend, major, minor} from "../../redux/reducers"
const Card = lazy(()=> import('../Card/Card'))



function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.countries)
  const [currentPage, setCurrentPage] = useState(1)
  const [, setOrder] = useState("")
  const [countriesPerPage] = useState(9)
  const indexOfLastCountry =  currentPage * countriesPerPage
  const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage
  const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
  const allActivities = useSelector((state)=> state.activities)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(()=>{
    dispatch(getCountries())
    dispatch(getActivities())
  },[dispatch])
  
// function handleFiltered (e){
//   dispatch(getCountriesByContintent(e.target.value))
// }
function handleClick(e) {
    e.preventDefault()
    dispatch(getCountries())
}
function handleMajorOrMinor(e){
  e.preventDefault()
  dispatch(orderCountriesByMajorOrMinor(e.target.value))
  setCurrentPage(1)
  setOrder(e.target.value)
}
function handleSort(e){
  e.preventDefault();
  dispatch(orderCountriesByAscendOrDescend(e.target.value))
  setCurrentPage(1)
  setOrder(e.target.value)
}
// function handleActivities(e){
//   e.preventDefault();
//   dispatch(filterByActivities(e.target.value))
// }
const arr = ["Africa", "South America", "North America", "Asia", "Oceania","Antarctica", "Europe", "all"]
function handleChange(e){
  if(arr.includes(e.target.value)){
    dispatch(getCountriesByContintent(e.target.value))
  } else{
    dispatch(filterByActivities(e.target.value))
  }
} 


  return (
    <div className="homeTotal">
      <div className="navbar">
        <h1 className="textMain">Countries Pi Henry</h1>
        <div>
        <div className="flexContainer">
        <SearchBar/>
          </div>
                <Link to="/">
                <button className="buttonNav">Volver</button>
                </Link>
             <Link to="/createactivities" className="link">
                <button className="buttonNav">Crear actividad
                </button>
             </Link>
                <button className="buttonNav" onClick={e=>{handleClick(e)}}>Reaload</button>
          </div>
          <div className="containerFilterOrder">
            <p className="displayInline"> Ordenar por poblacion: </p>
            <select className="select" onChange={handleMajorOrMinor}>
              <option>Selecciona</option>
              <option value={major}> Mayor poblacion</option>
              <option value={minor}> Menor poblacion</option>
            </select>
          <p className="displayInline">  Ordenar de A-Z: </p>
            <select className="select" onChange={e => handleSort(e)}>
                <option>Selecciona</option>
                <option className="option" value={ascen}>ascendent </option>
                <option value={descend}>descendent</option>
            </select>
              <p className="displayInline">  Filtrar por continente: </p>
            <select className="select" onChange={handleChange}>
                <option value="all" >Selecciona</option>
                <option value="Africa">africa</option>
                <option value="all">todos</option>
                <option value="South America">america del sur</option>
                <option value="North America">america del norte</option>
                <option value="Antarctica">antartida</option>
                <option value="Asia">asia</option>
                <option value="Europe">europa</option>
                <option value="Oceania">oceania</option>
            </select>
            <p  className="displayInline"> Filtrar por actividades: </p>
            <select className="select"  onChange={handleChange}>
                       <option value="allActivities">Selecciona</option>
                        {allActivities.map(el => {
                              return <option key={el.id} value={el.name}>{el.name}</option>
                         })} 
            </select>
            </div>
             <Paginado
             countriesPerPage={countriesPerPage}
             allCountries={allCountries}
             paginado={paginado}
             />
        </div>
        <div>
          <br />
          <div>
            
          </div>
            
           <br />
           <Suspense fallback={<span className="loader"></span>}>
          {
          currentCountry?.map((el) => {
            return(<Card name={el.name} flag={el.flags} continent={el.continents} key={el.id} id={el.id} />)
          })}
          </Suspense>

        </div>
    </div>
  )
}
export default Home