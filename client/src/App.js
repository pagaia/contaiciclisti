import React, { Suspense, lazy } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "components/Footer";
import routes from "config/routing/routes";
import { REGEX_SINGLE } from "utility/constants";
import { SingleContext } from "utility/MyContext";

function App() {
  let location = useLocation();

  // update the context
  const singleChart = REGEX_SINGLE.test(location.pathname);

  return (
    <SingleContext.Provider value={singleChart}>
      <div className={`App ${singleChart ? "single" : ""}`}>
        {/* remove title if single chart */}
        {!singleChart && (
          <header className="container-fluid">
            <h1 id="title">
              <Link to="/">CiCO - Il Conta i Ciclisti Ostinati</Link>
            </h1>
          </header>
        )}
        {/* remove container if single chart */}
        <main className={singleChart ? "" : "container-fluid"}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={lazy(() => import(`${route.component}`))}
                />
              ))}
            </Switch>
          </Suspense>
        </main>
        <Footer singleChart={singleChart} />
      </div>
    </SingleContext.Provider>
  );
}

export default App;
