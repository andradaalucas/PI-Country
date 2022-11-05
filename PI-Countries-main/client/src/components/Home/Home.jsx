import React from "react";
import { Suspense, lazy ,useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries, getCountriesByContintent,getCountriesByName } from "../../redux/actions";
import {Link} from "react-router-dom"
import Paginado from "../Paginado/Paginado";
// import Card from "../Card/Card";
import "./Home.css"
const Card = lazy(()=> import('../Card/Card'))



function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.countries)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage, setCountriesPerPage] = useState(9)
  const indexOfLastCountry =  currentPage * countriesPerPage
  const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage
  const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
  console.log(currentPage)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])
  
function handleFiltered (e){
  dispatch(getCountriesByContintent(e.target.value))
}
function handleClick(e) {
    e.preventDefault()
    dispatch(getCountries())
}
function handleInput (e){
  dispatch(getCountriesByName(e.target.value))
}

  return (
    <div className="homeTotal">
      <div className="navbar">
        <h1 className="textMain">Countries Pi Henry</h1>
        <div>
        <div className="flexContainer">
        <form onSubmit={(e) => {e.preventDefault(); handleInput(e.target.value)}}>
        <input className="input" type="text" placeholder="ingrese un pais"  />
        </form>
            {/* <input type="text" className="input" onSubmit={e =>{handleInput(e)}}placeholder="ingrese un pais"/> */}
          </div>
                <Link to="/">
                <button className="buttonNav">Volver</button>
                </Link>
             <Link to="/activities" className="link">
                <button className="buttonNav">Crear actividad</button>
             </Link>
                <button className="buttonNav" onClick={e=>{handleClick(e)}}>Reaload</button>
          </div>
          <div className="containerFilterOrder">
          <p className="displayInline">  Ordenar por: </p>
            <select className="select">
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
                <option value="">abcabc</option>
                <option value="">abcabc</option>
            </select>
          </div>
        </div>
        <div>
          <br />
          <div>
            
          </div>
            
           <br />
           <Suspense fallback={<span className="loader"></span>}>
          {
          currentCountry?.map((el) => {
            // <Link to={"/home/" }>
            return(<Card name={el.name} flag={el.flags} continent={el.continents} key={el.id} id={el.id}/>)
            // </Link>
          })}
          </Suspense>

          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries}
          paginado={paginado}
          />
        </div>
    </div>
  )
}
export default Home