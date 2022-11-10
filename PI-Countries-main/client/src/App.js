import './App.css';
import {BrowserRouter, Route, Switch } from "react-router-dom" 
import LandingPage from "./components/LandingPage/LandingPage"
import Home from './components/Home/Home';
import Details from "./components/Details/Details"
import ActivityCreate from "./components/CrearActividad/ActivityCreate"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/createactivities" component={ActivityCreate}/>
        <Route exact path="/details/:id" component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
