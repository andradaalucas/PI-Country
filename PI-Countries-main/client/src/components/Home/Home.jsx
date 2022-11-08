import React from "react";
import { Suspense, lazy ,useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries, getCountriesByContintent,orderCountriesByAscendOrDescend, getActivities } from "../../redux/actions";
import {Link} from "react-router-dom"
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"
const Card = lazy(()=> import('../Card/Card'))



function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.countries)
  const [currentPage, setCurrentPage] = useState(1)
  const [ setOrder] = useState("")
  const [countriesPerPage] = useState(9)
  const indexOfLastCountry =  currentPage * countriesPerPage
  const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage
  const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
  const allActivities = useSelector((state)=> state.activities)
  console.log(allActivities.map(el => el.name))

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])
  useEffect(()=>{
    dispatch(getActivities())
  }, [dispatch])
  
function handleFiltered (e){
  dispatch(getCountriesByContintent(e.target.value))
}
function handleClick(e) {
    e.preventDefault()
    dispatch(getCountries())
}

function handleSort(e){
  e.preventDefault()
  dispatch(orderCountriesByAscendOrDescend(e.target.value))
  setCurrentPage(1)
  setOrder(`Ordenado ${e.target.value}`)
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
          <p className="displayInline">  Ordenar por: </p>
            <select className="select" onChange={e => handleSort(e)}>
                <option className="option" value="ascen">ascendent </option>
                <option value="descen">descendent</option>
            </select>
              <p className="displayInline">  Filtrar por continente: </p>
            <select className="select" onChange={e => handleFiltered(e)}>
                <option value="all">todos los continentes </option>
                <option value="Africa">africa</option>
                <option value="South America">america del sur</option>
                <option value="North America">america del norte</option>
                <option value="Antarctica">antartida</option>
                <option value="Asia">asia</option>
                <option value="Europe">europa</option>
                <option value="Oceania">oceania</option>
            </select>
            <p  className="displayInline"> Filtrar por actividades: </p>
            <select className="select">
                        {allActivities.map(el => {
                              return <option key={el.id} value={el.id}>{el.name}</option>
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