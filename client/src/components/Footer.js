import React, { useContext } from "react";
import { SingleContext } from "utility/contexts/MyContext";
import ScrollTo from "./ScrollTo";

const Footer = (props) => {
  const singleChart = useContext(SingleContext);

  return (
    <footer className={`footer ${singleChart ? "single" : ""}`}>
      <p>
        &copy; 2020 <a href="https://twitter.com/pagaia">pagaia</a> &nbsp;
        {singleChart && (
          <a href="https://www.contaiciclisti.tk">www.contaiciclisti.tk</a>
        )}
        <span className="float-right">{`v${process.env.REACT_APP_VERSION}`}</span>
      </p>
    </footer>
  );
};

export default Footer;
