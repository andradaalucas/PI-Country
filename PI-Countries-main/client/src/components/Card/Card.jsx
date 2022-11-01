import React from 'react'
import "./Card.css" 

function Card({name, flag,continent }) {
  return (
    <div className="card">
        <img src={flag} alt="imagen no disponible" width="300px" height="200px" />
        <h3 className='nameCountry'>{name}</h3>
        <h5>{continent}</h5>
        <button className='detailsButton'>Detalles</button>
    </div>
  )
}

export default Card