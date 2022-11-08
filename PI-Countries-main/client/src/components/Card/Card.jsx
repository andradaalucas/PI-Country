import React from 'react'
import "./Card.css" 
import {Link} from "react-router-dom"



function Card({name, flag,continent, id }) {



  return (
    <div className="card">
        <img src={flag} alt="imagen no disponible" width="275px" height="175px" />
        <h3 className='nameCountry'>{name}</h3>
        <h5>{continent}</h5>
        <Link to={`/details/${id}`} className="link">
        <button className="buttonCard">Ver detalles
        </button>
        </Link>
    </div>
  )
}

export default Card