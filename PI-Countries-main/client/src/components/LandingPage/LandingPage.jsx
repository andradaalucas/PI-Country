import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="bodyLandingPage">
        <h1 className="titleLandingPage">Proyecto Individual </h1>
        <Link to="/home">
        <button className="btn">Empezar</button>
        </Link>
    </div>
  )
}

export default LandingPage