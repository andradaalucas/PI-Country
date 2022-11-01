import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="bodyLandingPage">
        <h1 className="titleLandingPage">Bienvenidos a mi Landing Page</h1>
        <Link to="/home">
        <button className="buttonGo"> Go! </button>

        </Link>
    </div>
  )
}

export default LandingPage