import React from "react";
import { Suspense, lazy ,useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries } from "../../redux/actions";
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
  const indexOfLastCountry = currentPage * countriesPerPage
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountry = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])
  
function handleClick(e) {
    e.preventDefault()
    dispatch(getCountries())
}

  return (
    <div className="homeTotal">
        <Link to="/activities">
      <button>Crear atividad</button>
        </Link>
        <h1 className="textMain">Countries Pi</h1>
        <button onClick={e=>{handleClick(e)}}>
            Volver a cargar los paises</button>
        <div>
          <br />
          <div>
            
          </div>
                <p className="displayInline">Ordenar por: </p>
            <select className="select">
                <option value="ascen">ascendent</option>
                <option value="descen">descendent</option>
            </select>
              <p className="displayInline"> Filtrar por continente: </p>
            <select className="select">
                <option value="Africa">africa</option>
                <option value="South America">america del Sur</option>
                <option value="North America">america del norte</option>
                <option value="Antarctica">antartida</option>
                <option value="Asia">asia</option>
                <option value="Europe">europa</option>
                <option value="Oceania">oceania</option>
            </select>

           <br />
           <Suspense fallback={<span className="loader"></span>}>
        {
          currentCountry?.map((el) => {
            // <Link to={"/home/" }>
            return(<Card name={el.name} flag={el.flags} continent={el.continents} key={el.id}/>)
            // </Link>
          })}
          </Suspense>

          <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
          />
        </div>
    </div>
  )
}
export default Home