import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./Fade.css";

const Fade = ({ children, showMessage, button }) => {
  const [showButton, setShowButton] = useState(true);

  return (
    <div className="container">
      {showButton && button}
      <CSSTransition
        in={showMessage}
        timeout={900}
        classNames="fade"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        {children}
      </CSSTransition>
    </div>
  );
};

export default Fade;
