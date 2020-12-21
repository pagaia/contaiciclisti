import React, { useEffect } from "react";
import notfoundLarge from "../images/not-found-500.webp";
import notfoundMedium from "../images/not-found-300.webp";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = `CiCO - Il Conta i Ciclisti Ostinati - Page not found`;
  }, []);

  return (
    <div>
      <h2 className="font-italic">
        Sorry, the page you are looking for is not here
      </h2>
      <Link to="/">Come back to homepage</Link>

      <img
        src={notfoundMedium}
        alt="Page not found"
        srcSet={`${notfoundMedium} 300w, ${notfoundLarge} 768w`}
        width="100%"
      />
    </div>
  );
};

export default NotFound;
