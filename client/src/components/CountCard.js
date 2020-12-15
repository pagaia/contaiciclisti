import React from "react";
import PropTypes from "prop-types";
import { format } from "timeago.js";

const CountCard = ({ title, text, date }) => {
  return (
    <div className="card last">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text inverted">{text || "-"}</p>
        {date && <footer className="blockquote-footer">{format(date)}</footer>}
      </div>
    </div>
  );
};

CountCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
};
export default CountCard;
