import React, { Suspense, lazy, useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "components/Footer";
import routes from "config/routing/routes";
import { REGEX_SINGLE } from "utility/constants";
import { SingleContext } from "utility/contexts/MyContext";
import ThemeContext, { THEMES } from "utility/contexts/ThemeContext";
import ThemeSwitcher from "components/ThemeSwitcher";
import "images/imageLibrary";
import { useQuery } from "utility/utilityFunctions";

function App() {
  let location = useLocation();
  const [theme, setTheme] = useState(THEMES.DARK);
  const themeValue = { theme, setTheme };
  let query = useQuery();

  useEffect(()=>{
    const queryTheme = query.get("theme");
    if ( queryTheme && queryTheme != theme && Object.values(THEMES).includes(queryTheme)) {
      setTheme(queryTheme);
    }
  },[])
  

  // update the context
  const singleChart = REGEX_SINGLE.test(location.pathname);

  return (
    <SingleContext.Provider value={singleChart}>
      <ThemeContext.Provider value={themeValue}>
        <div className={`App ${singleChart ? "single" : ""} ${theme}`}>
          {/* remove title if single chart */}
          {!singleChart && (
            <header className="container-fluid">
              <h1 id="title">
                <Link to="/">CiCO - Il Conta i Ciclisti Ostinati</Link>
              </h1>
              <ThemeSwitcher />
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
      </ThemeContext.Provider>
    </SingleContext.Provider>
  );
}

export default App;
