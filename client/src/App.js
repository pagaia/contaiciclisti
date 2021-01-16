import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "components/Footer";
import { REGEX_SINGLE } from "utility/constants";
import { SingleContext } from "utility/contexts/MyContext";
import ThemeContext, { THEMES } from "utility/contexts/ThemeContext";
import "images/imageLibrary";
import { useQuery } from "utility/utilityFunctions";
import routes from "config/routing/routes";
import { fetchDevices } from "store/devicesSlide";
import { useDispatch } from "react-redux";
import Header from "components/Header";

function App() {
  let location = useLocation();
  let query = useQuery();

  const [theme, setTheme] = useState(THEMES.DARK);
  const themeValue = { theme, setTheme };

  const dispatch = useDispatch();

  useEffect(() => {
    const queryTheme = query.get("theme");
    if (
      queryTheme &&
      queryTheme !== theme &&
      Object.values(THEMES).includes(queryTheme)
    ) {
      setTheme(queryTheme);
    }
    dispatch(fetchDevices());
  }, []);

  // update the context
  const singleChart = REGEX_SINGLE.test(location.pathname);

  return (
    <SingleContext.Provider value={singleChart}>
      <ThemeContext.Provider value={themeValue}>
        <div className={`App ${singleChart ? "single" : ""} ${theme}`}>
          {/* remove title if single chart */}
          <Header />
          <main className={singleChart ? "" : "container-fluid"}>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routes.map((route, idx) => (
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
          <Footer />
        </div>
      </ThemeContext.Provider>
    </SingleContext.Provider>
  );
}

export default App;
