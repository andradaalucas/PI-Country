import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div>
        <h1 className="titleLandingPage">Bienvenidos a mi Landing Page</h1>
        <Link to="/home">
        <button class="glitch">
         <span aria-hidden="true">Go!</span>Go!
	       <span aria-hidden="true">Go!</span>
        </button>

        </Link>
    </div>
  )
}

export default LandingPage