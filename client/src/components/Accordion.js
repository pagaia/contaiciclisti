import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./Accordion.css";

const Accordion = ({ title, children }) => {
  const [active, toggle] = useState(true);

  return (
    <Fragment>
      <button
        className={`btn accordion ${active ? "active" : ""}`}
        onClick={() => {
          toggle(!active);
        }}
      >
        {active ? "Collapse" : "Open"}
      </button>
      <div className={`panel ${active ? "active" : "hidden"}`}>{children}</div>
    </Fragment>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
export default Accordion;
