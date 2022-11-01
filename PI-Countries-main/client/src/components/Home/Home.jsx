import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries } from "../../redux/actions";
import {Link} from "react-router-dom"
import Card from "../Card/Card";

function Home() {
  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.countries)
  
  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])
  
function handleClick(e) {
    e.preventDefault()
    dispatch(getCountries())
}

  return (
    <div>
        <Link to="/activities">
      <button>Crear atividad</button>
        </Link>
        <h1>Countries Pi</h1>
        <button onClick={e=>{handleClick(e)}}>
            Volver a cargar los paises</button>
        <div>
            <select>
                <option value="ascen">Ascendent</option>
                <option value="descen">Descendent</option>
            </select>
            <select>
                <option value="Africa">Africa</option>
                <option value="South America">America del Sur</option>
                <option value="North America">America del norte</option>
                <option value="Antarctica">Antartida</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>
           <br />
        {
         allCountries?.map((el) => {
            // <Link to={"/home/" }>
            return(<Card name={el.name} flag={el.flags} continent={el.continents} key={el.id}/>)
            // </Link>
         })}
        </div>
    </div>
  )
}
export default Home