import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Device from "./pages/Device";
import "./App.css";
import { devices } from "./utility/constants";
import DailyAverage from "./components/DailyAverage";
import About from "./components/About";
import Footer from "./components/Footer";
import ViewMap from "./components/map/ViewMap";

function App() {
  return (
    <div className="App">
      <header className="container">
        <h1 id="title">
          <a href="/">CiCO - Il Conta i Ciclisti Ostinati</a>
        </h1>
        <About />
      </header>

      <main className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <ViewMap devices={devices} />
            </Route>
            <Route path="/device/:id">
              <Device />
            </Route>
          </Switch>
        </Router>

        <br />
        <h2>Daily average comparison</h2>

        <div className="row">
          <div className="col-sm-12">
            <DailyAverage devices={devices} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
