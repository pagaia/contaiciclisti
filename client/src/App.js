import React, { useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "components/Footer";
import routes from "config/routing/routes";

function App() {
  let location = useLocation();

  useEffect(() => {
    console.log({ location });
  }, [location]);
  
  return (
    <div className="App">
      <header className="container-fluid">
        <h1 id="title">
          <Link to="/">CiCO - Il Conta i Ciclisti Ostinati</Link>
        </h1>
      </header>
      <main className="container-fluid">
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
