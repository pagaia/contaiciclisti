import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Device from "./pages/Device";
import "./App.css";
import { devices } from "./utility/constants";
import DailyAverage from "./components/DailyAverage";
import About from "./components/About";
import Footer from "./components/Footer";
import ViewMap from "./components/map/ViewMap";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="container-fluid">
          <h1 id="title">
            <Link to="/">CiCO - Il Conta i Ciclisti Ostinati</Link>
          </h1>
        </header>

        <main className="container-fluid">
          <Switch>
            <Route exact path="/">
              <MainPage devices={devices} />
            </Route>
            <Route path="/device/:id">
              <Device />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
