import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div>
        <h1 className="titleLandingPage">Bienvenidos a mi Landing Page</h1>
        <Link to="/home">
        <button> Go! </button>

        </Link>
    </div>
  )
}

export default LandingPage