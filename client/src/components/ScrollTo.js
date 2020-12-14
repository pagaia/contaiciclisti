import React from "react";

const ScrollTo = (id = "title") => {
  const handleClick = (event) => {
    event && event.preventDefault();
    const element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <div>
      <a href="#scroll-top" onClick={handleClick}>
        Back to Top
      </a>
    </div>
  );
};

export default ScrollTo;
