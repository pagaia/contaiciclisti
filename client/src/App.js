import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Device from "./pages/Device";
import "./App.css";
import { DEVICES } from "./utility/constants";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import DevicesCompare from "./pages/DevicesCompare";
import NotFound from "./pages/NotFound";

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
              <MainPage devices={DEVICES} />
            </Route>
            <Route path="/device/:id">
              <Device />
            </Route>
            <Route path="/compare">
              <DevicesCompare />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
