import React, { Fragment, useContext } from "react";
import ThemeContext from "utility/contexts/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  const renderIcon = () => {
    if (theme === "dark") {
      return (
        <Fragment>
          <span className="sr-only">Switch the theme to ligth</span>
          <FontAwesomeIcon
            icon="lightbulb"
            style={{ color: "yellow" }}
            title="Switch on the light"
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <span className="sr-only">Switch the theme to dark</span>
        <FontAwesomeIcon
          icon="lightbulb"
          style={{ color: "black" }}
          title="Switch off the light"
          />
      </Fragment>
    );
  };

  return (
    <div className="toggle-theme">
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="themeSwitcher"
          name="themeSwitcher"
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          value="switch-chart"
        />
        <label className="custom-control-label" htmlFor="themeSwitcher">
          {renderIcon()}
        </label>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
