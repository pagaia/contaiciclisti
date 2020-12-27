import React, { useContext } from "react";
import { SingleContext } from "utility/MyContext";
import ScrollTo from "./ScrollTo";

const Footer = (props) => {
  const singleChart = useContext(SingleContext);
  if (singleChart) {
    return (
      <footer className="footer single">
        <p>
          &copy; 2020 <a href="https://twitter.com/pagaia">pagaia</a> &nbsp;
          <a href="https://www.contaiciclisti.tk">www.contaiciclisti.tk</a>
        </p>
      </footer>
    );
  }
  return (
    <footer className="footer">
      <p>
        &copy; 2020 <a href="https://twitter.com/pagaia">pagaia</a>
      </p>
      {/* <ScrollTo/> */}
    </footer>
  );
};

export default Footer;
